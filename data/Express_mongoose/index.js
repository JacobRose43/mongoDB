const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/product');

class AppError extends Error {
	constructor(message, status) {
		super();
		this.message = message;
		this.status = status;
	}
}

// ^ fix it

function wrapAsync(fn) {
	return function (req, res, next) {
		fn(req, res, next).catch((e) => next(e));
	};
}

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

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get(
	'/products',
	wrapAsync(async (req, res) => {
		const { category } = req.query;
		if (category) {
			const products = await Product.find({ category });
			res.render('products/index', { products, category });
		} else {
			const products = await Product.find({});
			res.render('products/index', { products, category: 'all' });
		}
	})
);

app.get('/products/new', (req, res) => {
	res.render('products/new');
});

app.get(
	'/products/:id',
	wrapAsync(async (req, res, next) => {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (!product) {
			return next(new AppError('Product not found', 404));
		}
		res.render('products/show', { product });
	})
);

app.get(
	'/products/:id/edit',
	wrapAsync(async (req, res) => {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (!product) {
			return next(new AppError('Product not found', 404));
		}
		res.render('products/edit', { product });
	})
);

app.post(
	'/products',
	wrapAsync(async (req, res, next) => {
		const newProduct = new Product(req.body);
		await newProduct.save();
		res.redirect(`/products/${newProduct.id}`); // USE .redirect FOR METHODS LIKE: POST, DELETE, UPDATE ETC.
	})
);

app.put(
	'/products/:id',
	wrapAsync(async (req, res) => {
		const { id } = req.params;
		const product = await Product.findByIdAndUpdate(id);
		res.redirect(`/products/${product._id}`);
	})
);

app.delete(
	'/products/:id',
	wrapAsync(async (req, res) => {
		const { id } = req.params;
		const deleteProduct = await Product.findByIdAndDelete(id);
		res.redirect('/products');
	})
);

app.use((req, res) => {
	res.status(404).send('NOT FOUND');
});

app.use((err, req, res, next) => {
	const { status = 500, message = 'Something went wrong!' } = err;
	res.status(status).send(message);
});

app.listen(port, () => {
	console.log('CONNECTION OPEN!');
	console.log(port);
});
