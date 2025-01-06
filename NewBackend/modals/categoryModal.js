const { Schema, model } = require("mongoose");

const categoryModel = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
})

module.exports = model("category", categoryModel);