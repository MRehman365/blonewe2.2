const {Schema, model} = require("mongoose");

const tableModal = new Schema({
    tableNumber: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Available"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = model("table", tableModal);