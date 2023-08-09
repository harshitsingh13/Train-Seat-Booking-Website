import React, {useState} from "react";

export default function BookTicket() {

	const [Seats, setSeats] = useState(0) // useState to store total seats
	
	async function fetchBookings() {
		
		try {

			//fetching data from database
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({TotalSeats: Seats})
			};

			//Sending request to server for allocating the seats and update the respective seat status
			const response = await fetch('http://localhost:3001/getBookingDetails', requestOptions);
			
			//Grabbing data from server for displaying the booking status
			const data = await response.json();
			
			//Sending alert to user after booking completion
			if(data.SeatingArrangement)
				alert("Congratulations! Your booking is completed successfully.\n"+"Seats Number: " + data.SeatingArrangement + "\nSeats booked: " + (Seats - data.SeatsLeft) + "\nWaitlisted seats: " + data.SeatsLeft);
			else
				alert("Oops we have done with our bookings. Better luck next time.") //Sending alert to user when all seats are booked

			//Navigating user to show bookings page
			window.location.href = '/ShowBookings'
			return data;
		}
		//Catch block for handling error that occurs at backend in fetch's promise
		catch(err){
			alert("We're facing some technical issue while showing you booking. Meanwhile your booking is completed successfully");
			window.location.href = '/ShowBookings'
		}
	}

	//Function that validates user response and make the request for respective booking
	function validateForm() {
		
		//Alert to user when s/he enters any wrong input
		if (!(parseInt(Seats) > 0 && parseInt(Seats) < 8)) {
			alert("Please enter valid seat numbers (1 to 7)");
		}
		else {
			try{
				fetchBookings(); //Calling aysnc function for making bookings
			}
			//Catch block for handling error that occurs at backend in fetch's promise
			catch(err){
				alert("It seems we're facing some techninal issue. Meanwhile your booking is completed successfully.")
			}
		}
	}
	
    return (
		<>
        <div className = "flex-container">
			<div className = "page-background"></div>
			<div className = "book-ticket-background">
				<div className="book-ticket">
					<p><h1 className = "welcome-heading">Welcome!</h1><h3>Want to book ticket? Click below.</h3></p>
					
					<form name = "myForm">
					<h4 className = "input-label">Enter number of seats</h4>
					<input className = "Seats-Input" type = "text" placeholder = "No. of Seats" onChange={(e) => setSeats(e.target.value)}/><br></br>
					<button className = "book-btn" type = "submit" onClick={() => {validateForm()}}>Book Ticket</button>
					</form>

				</div>
			</div>
		
		</div>	
		
		</>

	)
}