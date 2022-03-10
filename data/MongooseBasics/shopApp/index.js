const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose
	.connect('mongodb://localhost:27017/shopApp')
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.log('We have a problem!');
		console.log(error);
	});

const productSchema = new Schema({
	name: {
		type: String,
		lowercase: true, //always convert to lowercase
		required: true
	},
	price: {
		type: Number,
		min: [0, 'Price should be above 0.00$.']
	},
	onStock: {
		type: Boolean,
		default: true,
		required: true
	},
	categories: [String],
	qty: {
		onPage: {
			type: Number,
			default: 0
		},
		inStore: {
			type: Number,
			default: 0
		}
	},
	size: {
		type: String,
		enum: ['S', 'M', 'L', 'XL', 'XXL']
	},
	onSale: {
		type: Boolean,
		default: false
	}
});

// STATIC METHODS

productSchema.statics.fireSale = function () {
	return this.updateMany({}, { onSale: true, price: 1 });
};

// INSTANCE METHODS

productSchema.methods.addCategory = function (newCategory) {
	this.categories.push(newCategory);
	return this.save;
};

productSchema.methods.toggleOnStock = function () {
	this.onStock = !this.onStock;
	return this.save(); // return coz .save() is asynchronously
};

productSchema.methods.greet = function () {
	console.log('Greeting!');
	console.log(`We have on stock - ${this.name}!`);
};

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
	const foundProduct = await Product.findOne({ name: 'mountain bike' });
	console.log(foundProduct);
	await foundProduct.toggleOnStock(); // await coz .save() from toggleOnStock() is asynchronously
	console.log(foundProduct);
	await foundProduct.addCategory('Outdoors');
	console.log(foundProduct);
};

Product.fireSale().then((result) => console.log(result));

const bike = new Product({
	name: 'Mountain Bike',
	price: 599,
	categories: ['Fast', 'Has wheels', 'Like Uber'],
	qty: { onPage: 9, inStore: 3 },
	size: 'M',
	onSale: false
});

// TWO OPTIONS
// Product.insertMany(bike);
// bike.save()

// Product.findOneAndUpdate({ name: 'mountain bike' }, { $set: { price: 2 } }, { new: true, runValidators: true })
// 	.then((data) => {
// 		console.log('Done!');
// 		console.log(data);
// 	})
// 	.catch((error) => {
// 		console.log('We have a problem!');
// 		console.log(error.message); // our custom message!!!
// 	});
