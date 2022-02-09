$(document).ready(function () {
  const searchBtn = $("#search-btn");

  $("#search-btn").on("click", (event) => {
    event.preventDefault();
    const fromInput = $("#from-select").find(":selected").text();
    const toInput = $("#to").find(":selected").text();
    const dateInput = $("#Date").val();
    const passengerInput = $("#passenger").find(":selected").text();
    const classInput = $("#class-type").find(":selected").text();

    console.log(
      `The data the user is sending is: ${fromInput} To: ${toInput} date: ${dateInput} passenger: ${passengerInput} ticketType: ${classInput}`
    );
  });
});
