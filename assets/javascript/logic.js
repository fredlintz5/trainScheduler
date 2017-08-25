 // Initialize Firebase
var config = {
	apiKey: "AIzaSyCBl_hBofvq77oK68enYJmObFAzTMEnOMU",
	authDomain: "train-scheduler-b831c.firebaseapp.com",
	databaseURL: "https://train-scheduler-b831c.firebaseio.com",
	projectId: "train-scheduler-b831c",
	storageBucket: "train-scheduler-b831c.appspot.com",
	messagingSenderId: "66954623287"
	};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
var localArray = [];

// At the initial load and on subsequent data value changes, 
// get a snapshot of the current data.
// This callback keeps the page updated when a value changes in firebase.
database.ref().on("value", function(snapshot) {
	
	if (snapshot.child('databaseArray').exists()) {

		localArray = snapshot.val().databaseArray;
		loadTrains();

	} else {

		localArray = [];
	}
})



$('#submit').click(function(event) {

	if ($('#name').val() === ""|| $('#dest').val() === ""|| $('#time').val() === ""|| $('#freq').val()=== "") {
		event.preventDefault();
		alert("Please fill out all form fields");

	} else {
		event.preventDefault();

		var tName = $('#name').val();
		var tDest = $('#dest').val();
		var tTime = $('#time').val();
		var tFreq = $('#freq').val();
		var tRemain = "arrivalTime - currentTime"
		
		var trainObject = {
		  	name: tName,
		  	dest: tDest,
		  	time: tTime,
		  	freq: tFreq,
		  	remain: tRemain
		  };

		localArray.push(trainObject);

		$('#name').val('');
		$('#dest').val('');
		$('#time').val('');
		$('#freq').val('');

		database.ref().set({
		  databaseArray:localArray
		})

		$('tbody').empty();
		loadTrains();
	}
});


$('tbody').on("click", "button", function() {

    var indexNumber = $(this).data('index');
	
	localArray.splice(indexNumber, 1);

	database.ref().set({
  		databaseArray:localArray
	})

 	$('tbody').empty();

	loadTrains();	
});


function loadTrains() {

	for (var i = 0; i < localArray.length; i++) {

		var newData = $('<tr>');

		newData.attr('data-index', [i]);
		newData.append("<td>"+localArray[i].name);
		newData.append("<td>"+localArray[i].dest);
		newData.append("<td>"+localArray[i].time);
		newData.append("<td>"+localArray[i].freq);
		newData.append("<td>"+localArray[i].remain);
		newData.append("<button data-index='" + [i] + "'class='btn btn-danger'>X");

		$('tbody').append(newData);
	}
}








