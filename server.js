const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Product = require('./models/productModel.js');


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    console.log("Running");
    res.send("Hello");
})

//get data
app.get('/product', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//get
app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//data to db
//post
app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }
    catch (error) {
        console.log(error.message);
        res.status(500);
    }
});



//update the product
//get

app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        //we cannot find any data
        if (!product) {
            return res.status(404).json({ message: `cannot find anything with id` })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

app.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` })
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


app.listen(5500, () => {
    console.log("Running on 5500");
});

mongoose.connect('mongodb+srv://sandeepkumar4402:9mLDxDCn8HICDwga@backenddb.bcc4qpn.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
    .then(() => console.log('Connected TO DB!'))
    .catch(() => {
        console.log("COnnection failed");
    });