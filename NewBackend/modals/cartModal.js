const { Schema, model} = require("mongoose");

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    menuId: {
        type: Schema.Types.ObjectId,
        ref: "menu",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
})


module.exports = model("cart", cartSchema);