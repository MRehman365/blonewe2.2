const { Schema, model} = require("mongoose");

const blogSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    content: {
        type: [String],
        required: true
    },
    store: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
},
{ timestamps: true },
)

module.exports = new model("blogs", blogSchema);