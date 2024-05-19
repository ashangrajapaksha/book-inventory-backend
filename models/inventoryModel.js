const mongoose = require("mongoose");

const bookInventrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  ISBN: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const BookInventryModel = mongoose.model("bookInventory", bookInventrySchema);

module.exports = BookInventryModel;
