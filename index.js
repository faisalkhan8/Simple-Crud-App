const express = require('express');
const mongoose = require('mongoose');
const Product = require('./Models/product.model.js'); // Corrected path
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req, res) => {
  res.send("Latest Response from Node API");
});

mongoose.connect(
  'mongodb+srv://faisalkhanmcj8294:ajRxdsKFzvFoqLuE@cluster0.6yl5b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => {
    console.log('Connected to the Database');
  })
  .catch((error) => {
    console.error('Connection Failed:', error.message);
  });

app.post('/api/Product', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.error('Error creating product:', error.message); // Added logging for clarity
    res.status(500).json({ "message": error.message });
  }
});
app.get('/api/Products', async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json(products); // Return the fetched products
    } catch (error) {
      console.error('Error fetching products:', error.message); // Added error logging
      res.status(500).json({ "message": error.message });
    }
  });

  app.get('/api/Product/:id', async (req, res) => {
    try {
        const {id}=req.params;

      const product = await Product.findById(id);
      res.status(200).json(product); // Return the fetched products
    } catch (error) {
      console.error('Error fetching products:', error.message); // Added error logging
      res.status(500).json({ "message": error.message });
    }
  });

  app.put('/api/Product/:id', async (req, res) => { // Correct async placement
    try {
      const { id } = req.params;
      
      // Find and update the product
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      
      if (!product) {
        return res.status(404).json({ message: "Product Not Found" });
      }
      
      // Send the updated product
      res.status(200).json(product);
    } catch (error) {
      console.error('Error updating product:', error.message); // Improved error logging
      res.status(500).json({ message: error.message });
    }
  });
  
  app.delete('/api/Product/:id', async (req, res) => { // Correct async placement
    try {
      const { id } = req.params;
      
      // Find and update the product
      const product = await Product.findByIdAndDelete(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product Not Found" });
      }
      
      // Send the updated product
      res.status(200).json({message:"Product Has been Deleted"});
    } catch (error) {
      console.error('Error updating product:', error.message); // Improved error logging
      res.status(500).json({ message: error.message });
    }
  });


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
