// Steps to complete:
/*
1. Create Firebase link
2. Create initial train data in database
3. Create button for adding new trains - then update the html + update the database
4. Create a way to retrieve trains from the trainlist.
5. Create a way to calculate the time way. Using difference between start and current time.Then take the difference and modulus by frequency. (This step can be completed in either 3 or 4)

*/
// 1. Link to Firebase
var trainDataInfo = new Firebase("https://rcb-traintime.firebaseio.com/");

// 2. Populate Firebase Database with initial data (in this case, I did this via Firebase GUI)

// 3. Button for adding trains
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();

	// Creates local "temporary" object for holding train data
	var newTrain = {
		name:  trainName,
		destination: destination,
		firstTrain: firstTrainUnix,
		frequency: frequency
	}

	// Uploads train data to the database
	trainDataInfo.push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination); 
	console.log(firstTrainUnix);
	console.log(newTrain.frequency)

	// Alert
	alert("Train was add successfully");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	// Determine when the next train arrives.
	return false;
});


// 4. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
trainDataInfo.on("child_added", function(child, prevChildKey){

	console.log(child.val());

	// Store everything into a variable.
	var traName = child.val().name;
	var traDestination = child.val().destination;
	var traFrequency = child.val().frequency;
	var traFirstTrain = child.val().firstTrain;

	// Calculate the minutes until arrival using hardcore math
	// To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time and find the modulus between the difference and the frequency  
	var differenceTimes = moment().diff(moment.unix(traFirstTrain), "minutes");
	var tRemainder = moment().diff(moment.unix(traFirstTrain), "minutes") % traFrequency ;
	var tMinutes = traFrequency - tRemainder;

	// To calculate the arrival time, add the tMinutes to the currrent time
	var traArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
	console.log(tMinutes);
	console.log(traArrival);

	console.log(moment().format("hh:mm A"));
	console.log(traArrival);
	console.log(moment().format("X"));

	// Add each train's data into the table 
	$("#trainTable > tbody").append("<tr><td>" + tarName + "</td><td>" + traDestination + "</td><td>" + traFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});




