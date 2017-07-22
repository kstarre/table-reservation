// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 4000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Star Wars Characters (DATA)
// =============================================================
let reservations = [];
let waitingList = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "/reserve.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "/tables.html"));
});
// display reservations in json
app.get("/api/tables", function(req, res) {
  res.json(reservations);
});
// display waiting list in json
app.get("/api/waitlist", function(req, res) {
  res.json(waitingList);
})

// Create new reservation
app.post("/api/tables", function(req, res) {
  var newReservation = req.body;
  if(reservations.length < 5) {
    reservations.push(newReservation);
    res.json(true);
  }
  else {
    waitingList.push(newReservation);
    res.json(false);
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
