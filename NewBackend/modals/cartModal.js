const { Schema, model} = require("mongoose");

const cartSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true,
    },
   productId: {
    type: Schema.ObjectId,
    required: true,
    ref: "Products", 
},
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
})


module.exports = model("cart", cartSchema);