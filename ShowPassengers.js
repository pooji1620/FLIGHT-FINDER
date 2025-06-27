import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

function ShowPassengers(props) {
  const [show, setShow] = useState(false);
  const [passengers, setPassengers] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch("http://localhost:3001/getallpassengers")
      .then((res) => res.json())
      .then((data) => setPassengers(data))
      .catch((err) => console.error("Error fetching passengers", err));
  }, []); // Fetch once

  const handleCancel = async (id, flightNo) => {
    const confirm = window.confirm("Are you sure you want to cancel this passenger's flight?");
    if (!confirm) return;

    try {
      await fetch("http://localhost:3001/cancelflight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, flightNo }),
      });

      alert("✅ Passenger flight cancelled.");
      // Optionally update the list
      setPassengers(passengers.filter(p => p._id !== id));
    } catch (error) {
      console.error("Cancellation error", error);
      alert("❌ Failed to cancel. Try again.");
    }
  };

  const filteredPassengers = passengers.filter(
    (passenger) => passenger.flightNo === props.id
  );

  return (
    <>
      <Button variant="success" className="mt-1 w-75" onClick={handleShow}>
        🧍‍♂️ Passengers
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>👥 Passengers on Flight #{props.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filteredPassengers.length === 0 ? (
            <p>No passengers booked for this flight.</p>
          ) : (
            filteredPassengers.map((passenger) => (
              <div key={passenger._id} className="border-bottom mb-3 pb-2">
                <p><b>Name:</b> {passenger.name}</p>
                <p><b>Age:</b> {passenger.age}</p>
                <p><b>Country:</b> {passenger.country}</p>
                <p><b>Occupation:</b> {passenger.occupation}</p>
                <p><b>Seat No:</b> {passenger.seatNo} ({passenger.seatType})</p>
                <p><b>National ID:</b> {passenger.nationalID}</p>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleCancel(passenger._id, passenger.flightNo)}
                >
                  Cancel Flight
                </Button>
              </div>
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShowPassengers;
