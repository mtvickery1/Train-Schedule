// Initialize Firebase
var config = {
apiKey: "AIzaSyDHw3WDv5uFKKCIOqWhm-mt-xBfn0acjiM",
authDomain: "myawesomeproject-92ea5.firebaseapp.com",
databaseURL: "https://myawesomeproject-92ea5.firebaseio.com",
projectId: "myawesomeproject-92ea5",
storageBucket: "myawesomeproject-92ea5.appspot.com",
messagingSenderId: "1043509830476"
};
firebase.initializeApp(config);

var database = firebase.database();


var trainName;
var destination;
var firstTrain;
var frequency;
var newTableRow;
var nextArrival;
var minutesAway;


// 2. Button for adding Trains
$("#add-train").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    trainName = $("#train-input").val().trim();
    trainDestination = $("#destination-input").val().trim();
    firstTrain = $("#first-train-time-input").val().trim();
    frequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstTrain);
    // console.log(newTrain.frequency);
  
    // Clears all of the text-boxes
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
  });

  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  
  var firstTimeConverted = moment(childSnapshot.val().firstTrain, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % childSnapshot.val().frequency;
  console.log(tRemainder);
  
  var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // full list of items to the well
    newTableRow = $("#trains").append("<tr>");
    newTableRow.append("<td>" + childSnapshot.val().name + "</td>");
    newTableRow.append("<td>" + childSnapshot.val().destination + "</td>");
    newTableRow.append("<td>" + childSnapshot.val().frequency + "</td>");
    newTableRow.append("<td>" + (moment(nextTrain).format("hh:mm")) + "</td>");
    newTableRow.append("<td>" + tMinutesTillTrain + "</td>");
  });



      // // Store everything into a variable.
    // var trainName = childSnapshot.val().name;
    // var trainDestination = childSnapshot.val().destination;
    // var firstTrain = childSnapshot.val().firstTrain;
    // var frequency = childSnapshot.val().frequency;
  
    // // Employee Info
    // console.log(trainName);
    // console.log(trainDestination);
    // console.log(firstTrain);
    // console.log(frequency);
  
    // // Create the new row
    // var newRow = $("<tr>").append(
    //   $("<td>").text(trainName),
    //   $("<td>").text(trainDestination),
    //   $("<td>").text(frequency),
    //   $("<td>").text(nextTrain),
    //   $("<td>").text(tMinutesTillTrain)
    // );

    // // Append the new row to the table
    // $("#trains > tbody").append(newRow);