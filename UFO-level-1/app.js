var tableData = data;

// function displaying UFO encounters:

function tableDisplay(Sightings) {
  var tbody = d3.select("tbody");
  Sightings.forEach((ufoRecord) => {
    var row = tbody.append("tr");
    Object.entries(ufoRecord).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.html(value);
    });
  });
};

// Should clear table to spill new data:

function deleteTbody() {
  d3.select("tbody")
    .selectAll("tr").remove()
    .selectAll("td").remove();
};

// Default display of our total UFO sightings:

console.log(tableData);
tableDisplay(tableData);

// Activating the 'Filter Table' button

var button = d3.select("#filter-btn");

// Filtering the database and displaying results:

button.on("click", function(event) {
  d3.event.preventDefault();
  deleteTbody();
  var dateInput = d3.select("#datetime").property("value");
  
  if (dateInput.trim() === "" ) {

    // We should show the whole database if the date field has no particular date:
    var filteredData = tableData;
  } else {

    // In case a particular date is intered, the code should display only that specific dataset:
    var filteredData = tableData.filter(Sighting => 
      Sighting.datetime === dateInput.trim());
  };

  // This shows a cheeky message if no records are found (I know, I know...)
  if (filteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
        .attr("colspan", 7)
        .html("<h4>No such info mate! But make no mistake, the truth is out there 😰</h4>");
  };

  // The console will also show only the specific sightings related to the query
  console.log(filteredData);
  tableDisplay(filteredData);
});