const express = require('express');
const app = express();
app.use(require('cors')());
const port = 3001;
app.use(express.json());
const fs = require("fs");

const seatChart = require("./seatChart.json"); // Intial booking status when all seats are vacant

//Using MySQl for storing data of all seats and passengers 
let mysql = require('mysql2');

//Establishing the connection of MySql database
let connection = mysql.createConnection({
host:'localhost',
user:'root',
password:'Harshit@123',
database:'TicketBookingDB'});

// Request for making all seats vacant
app.get('/bookTickets', (req, res) => {
    console.log("reached at endpoint")
		console.log("params", req.params);
		console.log("query", req.query);
		console.log("body", req.body);
		
		
	res.set( {
		"Content-Type": "", 
	"Access-Control-Allow-Origin": "*", 
	"Access-Control-Allow-Headers": "*", 
	"Access-Control-Allow-methods": "*"});
			
	connection.connect(function(err){
	if(err){
		return console.error('error: '+err.message);
	}
	
	//Query that makes all seats vacant
	for(let i = 0; i < 80; i++){
        let nsql='INSERT INTO SeatChart(SeatRow, SeatNo) VALUES(?,?);';
        var values = [seatChart[i].seatRow, seatChart[i].seatNo];
        connection.query(nsql, values, function(err, results, fields){
            if(err){
                console.log(err.message);
            }
        });
    }
        

});	
	  
	data={msg:"Data is successfully added"};
	res.send(JSON.stringify(data));
});


//Request to check the seat availability and alloting nearby seats to passengers as per our requirements		
app.post('/getBookingDetails', (req, res) => {

		console.log("Loading my deatils");
		
		var arrange = ""; //Storing seats allocated to passenger
		
		res.set({
		'Content-Type': 'application/json', 
		"Access-Control-Allow-Credentials" : true,
		"Access-Control-Allow-Origin":"*", 
		"Access-Control-Allow-Headers":"*", 
		"Access-Control-Allow-methods":"*"});
	
	
	connection.connect(function(err) {

		if(err){
			return console.error('error: '+err.message);
		}
		
		var NoOfSeats = req.body.TotalSeats;
		
		//Query for getting updated status of seats
		var nsql='select * from SeatChart;';
		
		connection.query(nsql, function(err, results, fields){
			if (err) throw err;
			//console.log(results);

			for(let i = 0; i < 80; i++){
				if(!results[i].IsBooked){
					
					arrange += results[i].SeatNo + ", ";
					
					//Query for making seat booked
					var nsql = 'UPDATE SeatChart SET IsBooked=? WHERE SeatID=?;';
					var values = [true, results[i].SeatID];
						connection.query(nsql, values, function(err, results, fields){
							if(err){
								console.log(err.message);
							}
						});
					
						console.log("booking updated successfully");
					
					NoOfSeats--; //Tracking no. of seats booked till now
				}

				//Sendig data back to client when given seats are booked
				if(NoOfSeats == 0 && arrange.length != 0) {
					console.log("Seats number: ", arrange.substring(0, arrange.length - 2));
					res.send({"SeatingArrangement": arrange.substring(0, arrange.length - 2), "SeatsLeft": NoOfSeats}); 
					break;
				}
			}

			//Sending data when seats are on waiting list
			if(arrange.length == 0)
				res.send({"SeatingArrangement": arrange, "SeatsLeft": NoOfSeats}); 

			//Query for updating seats status after booking
			var nsql = 'select * from SeatChart;';
			
			connection.query(nsql, function(err, results, fields){
				if (err) throw err;
				console.log(results);

				//Storing seats data in JSON that will use in displaying updated arrangements
				fs.writeFile("data.json", JSON.stringify(results), (error) => {
					// throwing the error
					// in case of a writing problem
					if (error) {
					// logging the error
					console.error(error);
				
					throw error;
					}
				
					console.log("data.json written correctly");
					
				});
				
			});
		});
	
	});
	
});

//Request for updating the given seat status in our database
app.put('/updateBooking', (req, res) => {
		console.log("Updating my booking");
	res.set({
		'Content-Type': 'application/json', 
		"Access-Control-Allow-Origin":"*", 
		"Access-Control-Allow-Headers":"*", 
		"Access-Control-Allow-methods":"*"});
	
	connection.connect(function(err){
	if(err){
		return console.error('error: '+err.message);
	}
	
	console.log('id for updating the data: ',req.body)
	let nsql='UPDATE SeatChart SET IsBooked=? WHERE SeatID=?;';
	var values=[req.body.booking, req.body.seatId];
	connection.query(nsql, values, function(err, results, fields){
		if(err){
			console.log(err.message);
		}
	});

	console.log("booking updated successfully");
});

});


//Hosting request
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
