// Initialize Firebase
var config = {
    apiKey: "AIzaSyDVReb8iE9T1N07Sov62Z2sPZ3rtZ8SXso",
    authDomain: "train-time-hoi.firebaseapp.com",
    databaseURL: "https://train-time-hoi.firebaseio.com",
    projectId: "train-time-hoi",
    storageBucket: "",
    messagingSenderId: "233617152267",
    appId: "1:233617152267:web:a886f898c7146716"
};
firebase.initializeApp(config);

//Create a variable to reference the database
var database = firebase.database();

//Variables
var trainname = "";
var destination = "";
var firsttime = "";
var frequency = "";

// Submit Button Click
$("#addtrains").on("click", function (event) {
    event.preventDefault();

    // Code in the logic for storing and retrieving the most recent trains.
    trainname = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();
    firsttime = $("#firsttrain-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#firsttrain-input").val("");
    $("#frequency-input").val("");

    database.ref().push({
        trainname: trainname,
        destination: destination,
        firsttime: firsttime,
        frequency: frequency
    });


});


database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    trainname = childSnapshot.val().trainname;
    destination = childSnapshot.val().destination
    firsttime = childSnapshot.val().firsttime;
    frequency = childSnapshot.val().frequency;


    var firsttimeMoment = moment(firsttime, "HH:mm");
   
    var currenttime = moment();


    var minuteArrival = currenttime.diff(firsttimeMoment, 'minutes');
    var minuteLast = minuteArrival % frequency;
    var awayTrain = frequency - minuteLast;


    var nextArrival = currenttime.add(awayTrain, 'minutes');
    var arrivaltime = nextArrival.format("HH:mm");
    


    $("#AddTrain").append("<tr><td>" + trainname + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
