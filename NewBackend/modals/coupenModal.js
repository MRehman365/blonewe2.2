const { Schema, model } = require("mongoose");

const coupenModel = new Schema({
    code: {
        type: String,
        required: true,
    },
    limit: {
        type: String,
        required: true,
    },
    discount: {
        type: String,
        required: true,
    },
},
{ timestamps: true },
)

module.exports = model("coupen", coupenModel);