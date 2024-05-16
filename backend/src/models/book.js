const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number },
  },
  { timestamps: true }
);

const BookModel = mongoose.model('Book', BookSchema);

module.exports = BookModel;
