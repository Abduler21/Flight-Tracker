$(document).ready(function () {
  const getFlights = (from, to, date, passenger, classType) => {
    let flightOffer = {
      cabin: classType,
      departure_date: date,
      destination: to,
      origin: from,
      type: passenger,
    };

    console.log(
      `The options to user chose is ===== ${JSON.stringify(flightOffer)}`
    );

    $.post("/api/flights/lookup", flightOffer, function () {
      console.log("Called route to duffel API");
    })
      .then((data) => {
        console.log("The data from duffel is", data);
        const flights = $("#flight-list");
        for (let i = 0; i < data.data.offers.offers.length; i++) {
          let li = $("<li>"); // this li will hold each flight info

          let flightDuration = $("<p>"); // step 1. make variable for html
          flightDuration.text(
            // step 2. make text of html variable the data you want from API
            data.data.offers.offers[i].slices[0].duration.split("T")[1]
          );

          let CarrierName = $("<p>"); // hold name of carrier(ex: turkish airlines)
          CarrierName.text(data.data.offers.offers[i].owner.name);

          // step 3. put all the data inside the li
          li.append(flightDuration);
          li.append(CarrierName);

          // step 4. push the li into the flight-list ol in html
          flights.append(li);
        }

        return data;
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  };

  const searchBtn = $("#search-btn");

  $("#search-btn").on("click", (event) => {
    event.preventDefault();
    const fromInput = $("#from-select").find(":selected").text();
    const toInput = $("#to").find(":selected").text();
    const dateInput = $("#Date").val();
    const passengerInput = $("#passenger")
      .find(":selected")
      .text()
      .toLowerCase();
    const classInput = $("#class-type").find(":selected").text();

    // let newDate = moment(dateInput, "MM-DD-YYYY");
    // newDate.toISOString();
    // console.log(newDate);

    // console.log(
    //   `The data the user iss sending is: ${fromInput} To: ${toInput} date: ${dateInput} passenger: ${passengerInput} ticketType: ${classInput}`
    // );

    // get flights from API
    const offers = getFlights(
      fromInput,
      toInput,
      dateInput,
      passengerInput,
      classInput
    );
  });
});
