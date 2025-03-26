const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    price: Number,
    stock: Number,
  });
  const Product = mongoose.model('product', productSchema);
  module.exports = Product;