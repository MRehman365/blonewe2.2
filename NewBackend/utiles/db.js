const mongoose = require("mongoose");

const db = async () => {
    try {
        await mongoose.connect("mongodb+srv://muhammad_rehman:rehmanislam1@cluster0.4onln.mongodb.net/BloneWe");
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed");
    }
}

module.exports = db;