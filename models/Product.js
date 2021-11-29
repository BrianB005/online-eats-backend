const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "This product already exists"],
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [100, "Name can not be more than 100 characters"],
    },

    price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    miniDescription: {
      type: String,
      maxlength: [100, "Minidescription can't be longer than 100"],
    },
    description: {
      type: String,
      required: [true, "Please provide  product description"],
      maxlength: [1000, "Description can not be more than 1000 characters"],
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: [true, "Please provide a product category"],
      // enum: ['breakfast','lunch','dinner',''],
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
