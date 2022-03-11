const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose
	.connect('mongodb://localhost:27017/farmStand')
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.log('We have a problem!');
		console.log(error);
	});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/products', async (req, res) => {
	const products = await Product.find({});
	res.send(products);
});

app.listen(port, () => {
	console.log('CONNECTION OPEN!');
	console.log(port);
});
