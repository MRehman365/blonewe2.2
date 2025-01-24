const { Schema, model} = require("mongoose");

const addressSchema = new Schema ({
    userid: {
        type: Schema.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postal: {
        type: Number,
        required: true
    },
},
{ timestamps: true },
)

module.exports = new model("address", addressSchema);