const mongoose = require("mongoose");

const db = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/bloneWe");
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed");
    }
}

module.exports = db;