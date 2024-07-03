const Product = require('../models/productModel');

const uploadProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.send({ message: "Uploaded successfully" });
    } catch (err) {
        console.error("Error uploading product:", err);
        res.status(500).send({ message: "Server error" });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).send({ message: "Server error" });
    }
};


const updateProduct = async (req, res) => {
    try {
      const { name, price, description, imageUrl } = req.body;
      const product = await Product.findByIdAndUpdate(req.params.id, { name, price, description, imageUrl },
         { new: true });
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete product
  const deleteProductById = async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
module.exports = { uploadProduct, getProducts ,updateProduct,deleteProductById};
