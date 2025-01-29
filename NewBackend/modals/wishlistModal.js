const {Schema, model} = require('mongoose')

const wishlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Products'
    },
})

module.exports = model("Wishlist", wishlistSchema)