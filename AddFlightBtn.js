import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";

function AddFlightBtn() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [flightNo, setFlightNo] = useState("");
  const [sourceLocation, setSourceLocation] = useState("");
  const [destLocation, setDestLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [totalTime, setTotalTime] = useState("");
  const [seats, setSeats] = useState("");

  const handleAddFlight = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!flightNo || !sourceLocation || !destLocation || !seats || !totalTime) {
      alert("❌ All fields are required!");
      return;
    }

    if (flightNo.length !== 4) {
      alert("❌ Flight number must be 4 digits.");
      return;
    }

    if (sourceLocation === destLocation) {
      alert("❌ Source and destination cannot be the same.");
      return;
    }

    if (new Date() > startDate) {
      alert("❌ Please select a future date.");
      return;
    }

    // API call to backend
    try {
      const response = await fetch("http://localhost:3001/addflight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flightNo,
          sourceLocation,
          destLocation,
          startDate,
          startTime,
          totalTime,
          seats,
        }),
      });

      if (response.ok) {
        alert("✅ Flight added successfully!");
        setShow(false);
      } else {
        alert("❌ Failed to add flight.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error. Please try again later.");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        ✈️ Add Flight
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>🛫 Add Flight Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddFlight}>
            <label className="form-label">Flight Number</label>
            <input
              value={flightNo}
              onChange={(e) => setFlightNo(e.target.value)}
              type="number"
              placeholder="e.g. 1234"
              className="form-control"
              min="1"
            />
            <br />

            <label className="form-label">Source Location</label>
            <select
              value={sourceLocation}
              onChange={(e) => setSourceLocation(e.target.value)}
              className="form-select"
            >
              <option value="">Select source location</option>
              <option value="Lahore, Pakistan">Lahore, Pakistan</option>
              <option value="London, United Kingdom">London, UK</option>
              <option value="Toronto, Canada">Toronto, Canada</option>
              <option value="Tokyo, Japan">Tokyo, Japan</option>
              <option value="Delhi, India">Delhi, India</option>
              <option value="Istanbul, Turkey">Istanbul, Turkey</option>
              <option value="Islamabad, Pakistan">Islamabad, Pakistan</option>
            </select>
            <br />

            <label className="form-label">Destination Location</label>
            <select
              value={destLocation}
              onChange={(e) => setDestLocation(e.target.value)}
              className="form-select"
            >
              <option value="">Select destination location</option>
              <option value="London, United Kingdom">London, UK</option>
              <option value="Lahore, Pakistan">Lahore, Pakistan</option>
              <option value="Toronto, Canada">Toronto, Canada</option>
              <option value="Tokyo, Japan">Tokyo, Japan</option>
              <option value="Delhi, India">Delhi, India</option>
              <option value="Istanbul, Turkey">Istanbul, Turkey</option>
              <option value="Islamabad, Pakistan">Islamabad, Pakistan</option>
            </select>
            <br />

            <label className="form-label">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="form-control"
              dateFormat="yyyy-MM-dd"
            />
            <br />

            <label className="form-label">Start Time</label>
            <TimePicker
              onChange={setStartTime}
              value={startTime}
              className="form-control"
            />
            <br />

            <label className="form-label">Total Seats</label>
            <input
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              type="number"
              placeholder="e.g. 120"
              className="form-control"
              min="1"
            />
            <br />

            <label className="form-label">Total Flight Duration (hrs)</label>
            <input
              value={totalTime}
              onChange={(e) => setTotalTime(e.target.value)}
              type="number"
              placeholder="e.g. 5"
              className="form-control"
              min="1"
            />
            <br />

            <input
              type="submit"
              value="✅ Add Flight"
              className="btn btn-success w-100"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ❌ Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddFlightBtn;
