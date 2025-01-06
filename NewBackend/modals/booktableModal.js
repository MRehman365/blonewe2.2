const { Schema, model } = require("mongoose");

const bookTableSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    table: {
        type: Array,
        required: true,
    },
    bookingDate: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model("booktable", bookTableSchema);
