import httpStatus from "http-status";
import User from "../models/usermodel.js";
import Meeting from "../models/meetingModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

// =======LOGIN
const login = async (req, res) => {
  const { username, password } = req.body;
  console.log("Login request:", username, password);

  try {
    const user = await User.findOne({ username });
    console.log("Found user:", user);

    if (!user) return res.status(404).json({ message: "User Not Found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log("Password correct:", isPasswordCorrect);

    if (isPasswordCorrect) {
      const token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      await user.save();
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Invalid Username or password" });
    }
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({ message: `Something went wrong ${e}` });
  }
};

// ========REGISTER==========
const register = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, password: hashedPassword });
    await newUser.save();

    return res
      .status(httpStatus.CREATED)
      .json({ message: "User registered successfully" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Something went wrong: ${e.message}` });
  }
};

// ----------------HISTORY=============
const getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ token });
    if (!user)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Invalid token" });

    const meetings = await Meeting.find({ user_id: user.username });
    res.json(meetings);
  } catch (e) {
    res.status(500).json({ message: `Something went wrong: ${e.message}` });
  }
};

// ==========ADD TO HISTORY=================

const addToHistory = async (req, res) => {
  try {
    const { token, meeting_code } = req.body;
    if (!token || !meeting_code)
      return res.status(400).json({ message: "Token or meeting code missing" });

    const user = await User.findOne({ token });
    if (!user) return res.status(404).json({ message: "Invalid token" });

    // Prevent duplicate in user's history
    if (!user.history.includes(meeting_code)) {
      user.history.push(meeting_code);
      await user.save();
    }

    // Save to Meeting collection if needed
    const existingMeeting = await Meeting.findOne({
      user_id: user.username,
      meetingCode: meeting_code,
    });
    if (!existingMeeting) {
      const newMeeting = new Meeting({
        user_id: user.username,
        meetingCode: meeting_code,
      });
      await newMeeting.save();
    }

    res
      .status(201)
      .json({ message: "Added code to history (if not duplicate)" });
  } catch (e) {
    res.status(500).json({ message: `Something went wrong: ${e.message}` });
  }
};

export { login, register, getUserHistory, addToHistory };
