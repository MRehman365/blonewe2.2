const { Schema, model } = require("mongoose");

const checkoutModel = new Schema({
    userid: {
        type: Schema.ObjectId,
        required: true,
    },
    payment_status: {
        type: String,
        required: true,
      },
      shippingInfo: {
        type: Object,
        required: true,
      },
      delivery_status: {
        type: String,
        default: "pending",
      },
    price: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
},
{ timestamps: true },
)

module.exports = model("checkout", checkoutModel);