import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const AdminLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:3001/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminId,
        password,
      }),
    });

    const data = await response.json();

    if (data.admin) {
      localStorage.setItem("token", data.admin);
      alert("✅ Login successful");
      navigate("/dashboard", {
        state: {
          adminId,
        },
      });
    } else {
      alert("❌ Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container">
      <NavBar />
      <div className="row mt-5">
        <div className="col d-flex justify-content-center mt-5">
          <div style={{ width: "350px" }}>
            <h3 className="text-center mb-4">🔐 Admin Login</h3>
            <form onSubmit={loginUser} className="form-group">
              <input
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                type="text"
                placeholder="Enter Admin ID"
                className="form-control mb-3"
                required
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Password"
                className="form-control mb-4"
                required
              />
              <input
                type="submit"
                value="Login"
                className="btn btn-success w-100"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
