$(document).ready(function () {
  //Global variables
  let departDate = "";
  let cabinClass = "";

  // function to search and display flights from api
  const getFlights = (from, to, date, passenger, classType) => {
    // the current date
    // this will be used to compare with the date the user wants to book a flight
    let calender = new Date();
    let day = calender.getDate();
    let month = calender.getMonth() + 1;
    let year = calender.getFullYear();

    let currentDate = `${year}-${month}-${day}`;

    console.log(
      `The current date is: ${currentDate} and the date the user chose is: ${date}`
    );
    let flightOffer = {
      cabin: classType,
      departure_date: date,
      destination: to,
      origin: from,
      type: passenger,
    };

    // if any of the inputs are empty then dont search for a flight
    if (
      from === "" ||
      to === "" ||
      date === "" ||
      passenger === "" ||
      classType === ""
    ) {
      alert(
        "Please make sure to fill in all the information to search for flights!"
      );
    } else if (from === to) {
      alert("Please make sure your From and To are not the same!");
    } else {
      // Calling the lookup route to get flights from api
      $.post("/api/flights/lookup", flightOffer, function () {
        console.log("Called route to duffel API");
      })
        .then((data) => {
          console.log("The data from duffel is", data);
          const flights = $("#flight-list");
          for (let i = 0; i < data.data.offers.offers.length; i++) {
            let li = $("<li>"); // this li will hold each flight info
            li.attr("id", data.data.offers.offers[i].id);

            // FLIGHT DURATION
            let flightDuration = $("<p>"); // step 1. make variable for html
            flightDuration.text(
              // step 2. make text of html variable the data you want from API
              data.data.offers.offers[i].slices[0].duration.split("T")[1]
            );
            flightDuration.attr("id", "flight-duration");

            // ORIGIN NAME
            let originName = $("<p>");
            originName.text(
              data.data.offers.offers[i].slices[0].origin.city_name
            );
            originName.attr("id", "origin-name");

            // DESTINATION NAME
            let destinationName = $("<p>");
            destinationName.text(
              data.data.offers.offers[i].slices[0].destination.city_name
            );
            destinationName.attr("id", "destination-name");

            // CARRIER NAME
            let CarrierName = $("<p>"); // hold name of carrier(ex: turkish airlines)
            CarrierName.text(data.data.offers.offers[i].owner.name);
            CarrierName.attr("id", "carrier-name");

            // COST
            let cost = $("<p>");
            cost.text("$" + data.data.offers.offers[i].total_amount);
            cost.attr("id", "cost-amount");

            // BOOK FLIGHT BUTTON
            let bookButton = $("<button>");
            bookButton.text("Book Flight");
            bookButton.addClass("btn btn-success");
            bookButton.attr("id", "book-btn");

            // step 3. put all the data inside the li
            li.append(flightDuration);
            li.append(CarrierName);
            li.append(originName);
            li.append(destinationName);
            li.append(cost);
            li.append(bookButton);

            // step 4. push the li into the flight-list ol in html
            flights.append(li);
          }
          return data;
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
        });
    }
  };

  $("#search-btn").on("click", (event) => {
    event.preventDefault();
    const fromInput = $("#from-select").find(":selected").text();
    const toInput = $("#to").find(":selected").text();
    departDate = $("#Date").val();
    const passengerInput = $("#passenger")
      .find(":selected")
      .text()
      .toLowerCase();
    cabinClass = $("#class-type").find(":selected").text();

    // get flights from API
    getFlights(fromInput, toInput, departDate, passengerInput, cabinClass);
  });

  // FUNCTION TO SAVE A FLIGHT
  $(document).on("click", "#book-btn", function () {
    console.log("Button pressed!");
    const price = $(this).siblings("#cost-amount").text();
    const duration = $(this).siblings("#flight-duration").text();
    const origin = $(this).siblings("#origin-name").text();
    const destination = $(this).siblings("#destination-name").text();
    const carrier = $(this).siblings("#carrier-name").text();
    const passengerId = $(this).parent().attr("id");

    const flightInfo = {
      totalAmount: price.split("$")[1],
      passenger_id: passengerId,
      cabin_class: cabinClass,
      origin_city: origin,
      operating_carrier: carrier,
      destination_city: destination,
      duration: duration,
    };
    // calling route to save flight
    $.post("/api/flights/", flightInfo, function () {
      console.log("Saved flight into database!");
    })
      .then(() => {
        console.log("Saving into MYSQL is successful!!!!!");
        alert("Your flight ticket has been booked!");
      })
      .catch((err) => {
        console.log("There is an error saving flight", err);
      });
  });
});
