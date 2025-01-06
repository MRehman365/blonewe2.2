const mongoose = require("mongoose");

const db = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/BloneWe");
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed");
    }
}

module.exports = db;