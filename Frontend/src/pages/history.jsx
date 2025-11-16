import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";

import { IconButton } from "@mui/material";
export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);

  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch {}
    };

    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "30px",
          backgroundColor: "#fff",
          padding: "10px 20px",
          borderRadius: "10px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        {/* Home Button */}
        <IconButton onClick={() => routeTo("/home")}>
          <HomeIcon />
        </IconButton>

        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
          History
        </Typography>

        <div style={{ width: "40px" }}></div>
      </div>

      {meetings.length > 0 ? (
        <div style={{ display: "grid", gap: "15px" }}>
          {meetings.map((meeting, index) => (
            <Card
              key={meeting._id || index}
              variant="outlined"
              style={{ borderRadius: "10px" }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Code: {meeting.meetingCode}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Date: {formatDate(meeting.date)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ marginTop: "50px" }}
        >
          No meetings found.
        </Typography>
      )}
    </div>
  );
}
