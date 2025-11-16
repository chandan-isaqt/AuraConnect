import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";
import { red } from "@mui/material/colors";

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory, setUserData } = useContext(AuthContext);

  // ==================Join a video call
  const handleJoinVideoCall = async () => {
    const trimmedCode = meetingCode.trim();
    if (!trimmedCode) {
      alert("Please enter a meeting code");
      return;
    }

    try {
      if (addToUserHistory) {
        await addToUserHistory(trimmedCode);
      }
      // ------------ meeting
      navigate(`/${trimmedCode}`);
    } catch (err) {
      console.error("Error joining meeting:", err);
      alert("Failed to join meeting. Please try again.");
    }
  };

  // Logout-----
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/auth");
  };

  return (
    <>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo.png" alt="Logo" className="logo_main" />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => navigate("/history")}>
            <RestoreIcon />
          </IconButton>

          <Button onClick={handleLogout} style={{ color: "red" }}>
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>
              “AuraConnect brings people together with seamless video calls,
              connecting minds, sparking creativity, and shaping the future.”
            </h2>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                value={meetingCode}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
              />
              <Button
                onClick={handleJoinVideoCall}
                variant="contained"
                className="btnJoin"
                sx={{ height: "40px", minWidth: "80px", marginTop: "20px" }}
              >
                Join
              </Button>
            </div>
          </div>
        </div>

        <div className="rightPanel">
          <img src="/logo3.png" alt="Logo" />
        </div>
      </div>
      <footer className="footer">
        © 2025 | <strong>AuraConnect</strong> | Developed by{" "}
        <strong>Chandan</strong>
      </footer>
    </>
  );
}

export default withAuth(HomeComponent);
