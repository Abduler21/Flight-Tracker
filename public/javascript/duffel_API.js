function setPassengers (input) {
  let passengers = []; //[{type: "adult"}, {type: "adult"}, {type: "adult"}]

  // Code that builds passenger array based on input vvvv
  // Split form input "3 Adult" ["3", "Adult"]
  // Loop on how many is in the first item IE: "3"
  // Add to passengers each time it loops with type "adult"

  return passengers; // return changed passenger array
}

async function searchFlight(event) {
    event.preventDefault();
    const passengers = setPassengers($("#passenger").find(":selected").text());
    const origin= $("#from-select").find(":selected").text();
    const destination = $("#to").find(":selected").text();
    const departure_date = $("#Date").val();
    const cabin = $("#class-type").find(":selected").text();

    console.log(
      `The data the user is sending is: ${origin} To: ${destination} date: ${departure_date} passenger: ${passengers} ticketType: ${cabin}`
    );

    //API CALL
    const response = await fetch("/api/flights/lookup", {
      method: "post",
      body: JSON.stringify({
        departure_date,
        cabin,
        destination,
        origin,
        passengers,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log(`done ${response}`);
    } else {
      alert(response.statusText);
    }
};


document
  .querySelector("#search-btn")
  .addEventListener("click", searchFlight);
