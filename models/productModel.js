const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
