// models/Otp.js
// import mongoose from "mongoose";
const { Schema, model } = require("mongoose");

const otpSchema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3000 }, // OTP expires in 5 minutes
});

module.exports = model("Otp", otpSchema);
