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
		min: 0
	},
	onStock: {
		type: Boolean,
		default: true,
		required: true
	},
	categories: [String]
});

const Product = mongoose.model('Product', productSchema);

const bike = new Product({
	name: 'Mountain Bike',
	price: 599,
	categories: ['Fast', 'Has wheels', 'Like Uber'],
	qty: {
		onPage: {
			type: Number,
			default: 0
		},
		inStore: {
			type: Number,
			default: 0
		}
	}
});

bike.save()
	.then((data) => {
		console.log('Done!');
		console.log(data);
	})
	.catch((error) => {
		console.log('We have a problem!');
		console.log(error.errors.name.properties.message);
	});
