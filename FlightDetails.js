import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ShowPassengers from "./ShowPassengers";
import UpdateFlightBtn from "./UpdateFlightBtn";

const FlightDetails = () => {
  const [flights, setFlights] = useState([]);

  // Fetch all flights only once when the component mounts
  useEffect(() => {
    fetch("http://localhost:3001/getallflights")
      .then((res) => res.json())
      .then((data) => setFlights(data))
      .catch((err) => console.error("❌ Error fetching flights:", err));
  }, []);

  // Delete flight by ID with confirmation
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this flight?");
    if (!confirm) return;

    try {
      const response = await fetch("http://localhost:3001/deleteflight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert("✅ Flight deleted successfully!");
        // Refresh flight list
        setFlights(flights.filter((flight) => flight._id !== id));
      } else {
        alert("❌ Failed to delete flight.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="container mt-4">
      {flights.map((flight) => (
        <div
          key={flight._id}
          className="row bg-light shadow rounded view-flight-box p-3 mb-4"
        >
          {/* Flight Route Info */}
          <div className="col-md-4">
            <h5>
              <b>{flight.sourceLocation}</b> ➡️ <b>{flight.destLocation}</b>
            </h5>
            <p className="mb-1">🗓 Departure: {flight.startDate}</p>
            <p className="mb-1">⏰ Time: {flight.startTime}</p>
          </div>

          {/* Flight Numbers and Availability */}
          <div className="col-md-2">
            <p>✈️ Flight No: <b>{flight.flightNo}</b></p>
            <p className="text-danger">
              🪑 Seats Available: {flight.seats - flight.noOfPassengers}
            </p>
            <p>⏱ Duration: {flight.totalTime} hrs</p>
          </div>

          {/* Pricing Info */}
          <div className="col-md-3">
            <p>💺 Economy: <b>${flight.economyPrice}</b></p>
            <p>🧳 Business: <b>${flight.businessPrice}</b></p>
            <p>👑 First Class: <b>${flight.firstClassPrice}</b></p>
          </div>

          {/* Actions */}
          <div className="col-md-3 d-flex flex-column gap-2 align-items-center justify-content-center">
            <Button
              onClick={() => handleDelete(flight._id)}
              className="btn btn-danger w-100"
            >
              Delete
            </Button>

            <UpdateFlightBtn
              id={flight._id}
              source={flight.sourceLocation}
              dest={flight.destLocation}
              flightNo={flight.flightNo}
              date={flight.startDate}
              time={flight.startTime}
              totalTime={flight.totalTime}
              seats={flight.seats}
            />

            <ShowPassengers id={flight.flightNo} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightDetails;
