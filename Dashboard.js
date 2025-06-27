import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import AddFlightBtn from "./components/AddFlightBtn";
import FlightDetails from "./components/FlightDetails";

const Dashboard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const adminId = state?.adminId || "Admin";

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/adminlogin");
    }
  };

  return (
    <Container>
      <NavBar />
      <h4 className="text-center text-danger mt-3">
        Welcome to {adminId}'s Dashboard!
      </h4>

      <Row className="mt-4 mb-3">
        <Col className="d-flex align-items-center gap-2">
          <AddFlightBtn />
          <button onClick={handleLogout} className="btn btn-danger">
            Log Out
          </button>
        </Col>
      </Row>

      <Row>
        <Col>
          <FlightDetails />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
