const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    menu: {
        type: Array,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending"
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    shippingAddress: {
        type: Object,
        required: true
    },
    shippingCharges: {
        type: Number,
        required: true
    }
},
{ timestamps: true },
)

module.exports = model("Order", orderSchema);