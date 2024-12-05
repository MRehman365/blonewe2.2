const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    sellerId: {
      type: Schema.ObjectId,
      // required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      required: true,
    },

    shopName: {
      type: String,
      required: true,
    },

    description: {
      type: [String],
      default: [],
    },
    additionalDescription: [
      {
        heading: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],

    images: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("blog", blogSchema);
