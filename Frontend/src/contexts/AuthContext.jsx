import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";

export const AuthContext = createContext();

const client = axios.create({
  baseURL: `${server}:8000/api/v1/users`,
});

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // ======================REGISTER===============
  const handleRegister = async (name, username, password) => {
    try {
      const res = await client.post("/register", { name, username, password });
      return res.data.message;
    } catch (err) {
      throw err.response?.data?.message || "Registration failed";
    }
  };

  //================LOGIN====================
  const handleLogin = async (username, password) => {
    try {
      const res = await client.post("/login", { username, password });
      localStorage.setItem("token", res.data.token);
      setUserData({ username });
      navigate("/home");
    } catch (err) {
      throw err.response?.data?.message || "Login failed";
    }
  };

  // ================GET HISTORY------------------
  const getHistoryOfUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await client.get("/get_all_activity", { params: { token } });
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // =================ADD TO HISTORY======================
  const addToUserHistory = async (meetingCode) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await client.post("/add_to_activity", {
        token,
        meeting_code: meetingCode,
      });
    } catch (err) {
      console.error("Failed to add to history", err);
    }
  };

  // ===========LOGOUT============
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        handleRegister,
        handleLogin,
        handleLogout,
        getHistoryOfUser,
        addToUserHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
