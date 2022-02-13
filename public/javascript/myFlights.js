$(document).ready(function () {
  // step 3. make function that calls route to get flights
  const getMyTickets = () => {
    //   step 4. use ajax to call the route
    $.get("/api/flights/", function () {
      console.log("Route to get my-tickets called");
    })
      .then((data) => {
        console.log("Our tickets are : ", data);
        console.log(data.data.flightData.length);
        // step 5 display the data to html
        const myFlightDiv = $("#myFlight-list");
        // if the data is a list of info then you need a for loop to loop
        // through each data
        for (let i = 0; i < data.data.flightData.length; i++) {
          let li = $("<li>");
          li.attr("id", data.data.flightData[i].passenger_id);

          // DURATION //
          let duration = $("<p>");
          duration.text(data.data.flightData[i].duration);
          duration.attr("id", "flight-duration");

          let cabin_class = $("<p>");
          cabin_class.text(data.data.flightData[i].cabin_class);
          cabin_class.attr("id", "cabin_class");

          let destination_city = $("<p>");
          destination_city.text(data.data.flightData[i].destination_city);
          destination_city.attr("id", "destination_city");

          let operating_carrier = $("<p>");
          operating_carrier.text(data.data.flightData[i].operating_carrier);
          operating_carrier.attr("id", "operating_carrier");

          let origin_city = $("<p>");
          origin_city.text(data.data.flightData[i].origin_city);
          origin_city.attr("id", "origin_city");

          let total_amount = $("<p>");
          total_amount.text(data.data.flightData[i].total_amount);
          total_amount.attr("id", "total_amount");

          // STEP 6. APPEND ALL THE HTML THAT HAS THE DATA FROM API INTO THE li
          li.append(duration);
          li.append(cabin_class);
          li.append(destination_city);
          li.append(operating_carrier);
          li.append(origin_city);
          li.append(total_amount);

          // step 7. push all the li into the div(ul) to display in html page
          myFlightDiv.append(li);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // call function to get flights
  getMyTickets();
});
