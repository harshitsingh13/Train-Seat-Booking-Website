import React from "react";

//Importing updated seats status
const seatsData = require("./data.json");

//Importing initial booking arrangements
const initialSeats = require("./Initial bootking chart.json");

//Arrays to store each row data of seats
const row1 = []
const row2 = []
const row3 = []
const row4 = []
const row5 = []
const row6 = []
const row7 = []
const row8 = []
const row9 = []
const row10 = []
const row11 = []
const row12 = []

var seatIdx = 1;

export default function ShowBookings() {

    for(let i = 1; i <= 80; i++){
		
		let color = ""; //Storing seat color - Green OR Red
		
        seatsData.filter(function(o) { return o.SeatNo == initialSeats[i-1].seatNo })[0].IsBooked == true ? color = "#ec1212" : color = "#12ec12"; // Changing seat color to green for vaccant seats and red to booked seats

		//Storing each row seats data Row(1 to 7 seats)
        if(i<=7 && row1.length < 7)
            row1.push(<div key = {i} className = {"seat" + seatIdx} style = {{backgroundColor: color}}></div>);	
        
        else if(i > 7 && i <= 14 && row2.length < 7)
            row2.push(<div key = {i} className = {"seat" + seatIdx} style = {{backgroundColor: color}}></div>);
        
        else if(i > 14 && i <= 21 && row3.length < 7)
            row3.push(<div key = {i} className = {"seat" + seatIdx} style = {{backgroundColor: color}}></div>);
        
        else if(i > 21 && i <= 28 && row4.length < 7)
            row4.push(<div key = {i} className = {"seat" + seatIdx} style = {{backgroundColor: color}}></div>);
        
        else if(i > 28 && i <= 35 && row5.length < 7)
            row5.push(<div key = {i} className = {"seat" + seatIdx} style = {{backgroundColor: color}}></div>);

        else if(i > 35 && i <= 42 && row6.length < 7)
            row6.push(<div key = {i} className = {"seat" + seatIdx} style = {{backgroundColor: color}}></div>);

        else if(i > 42 && i <= 49 && row7.length < 7)
            row7.push(<div key = {i} className = {"seat" + seatIdx} style = {{backgroundColor: color}}></div>);

        else if(i > 49 && i <= 56 && row8.length < 7)
            row8.push(<div key = {i} className = {"seat" + seatIdx} style = {{backgroundColor: color}}></div>);

        else if(i > 56 && i <= 63 && row9.length < 7)
            row9.push(<div key = {i} className = {"seat" + seatIdx} style = {{backgroundColor: color}}></div>);

        else if(i > 63 && i <= 70 && row10.length < 7)
            row10.push(<div key = {i} className = {"seat" + seatIdx} style = {{backgroundColor: color}}></div>);

        else if(i > 70 && i <= 77 && row11.length < 7)
            row11.push(<div key = {i} className = {"seat" + seatIdx} style = {{backgroundColor: color}}></div>);

        else if(i > 77 && i <= 80 && row12.length < 3)
            row12.push(<div key = {i} className = {"seat" + seatIdx} style = {{backgroundColor: color}}></div>);	
            
        if(seatIdx == 7)
            seatIdx = 0;
        
        seatIdx++;
    }

    return (
		<>
        {}
        <div className = "main">
			<div className="title">Current Coach Status</div>
			<div className = "flex-container">
				<div className = "flex-container">
					<div className = "available"> </div>
					<div className = "seat-info">Available Seat</div>
				</div>

				<div className = "flex-container">
					<div className = "booked"> </div>
					<div className = "seat-info">Booked Seat</div>
				</div>

				<div className = "flex-container-row">
					<div className="exit-gate-1"></div>
					
					<div className = "flex-container">
                        {row1}
						<div className="seat-alignment">A (1 to 7)</div>
					</div>

					<div className = "flex-container">
						{row2}
						<div className="seat-alignment">B (1 to 7)</div>
					</div>

					<div className = "flex-container">
						{row3}
						<div className="seat-alignment">C (1 to 7)</div>
					</div>

					<div className = "flex-container">
						{row4}
						<div className = "seat-alignment">D (1 to 7)</div>
					</div>

					<div className = "flex-container">
						{row5}
						<div className = "seat-alignment">E (1 to 7)</div>
					</div>

					<div className = "flex-container">
						{row6}
						<div className = "seat-alignment">F (1 to 7)</div>
					</div>

					<div className = "flex-container">
						{row7}
						<div className = "seat-alignment">G (1 to 7)</div>
					</div>

					<div className = "flex-container">
						{row8}
						<div className = "seat-alignment">H (1 to 7)</div>
					</div>

					<div className = "flex-container">
						{row9}
						<div className = "seat-alignment">I (1 to 7)</div>
					</div>

					<div className = "flex-container">
						{row10}
						<div className = "seat-alignment">J (1 to 7)</div>
					</div>

					<div className = "flex-container">
						{row11}
						<div className = "seat-alignment">K (1 to 7)</div>
					</div>

					<div className = "flex-container">
						{row12}
						<div className = "seat-alignment-last">L (1 to 3)</div>
					</div>

					<div className = "exit-gate-2"></div>

				</div>
			</div>
			
		</div>
	
	
		</>
	)

}