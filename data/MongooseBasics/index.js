const mongoose = require('mongoose');

const { Schema } = mongoose;

// async function main() {
// 	try {
// 		return await mongoose.connect('mongodb://localhost:27017/movieApp');
// 	} catch (error) {
// 		console.log('CAUGHT AN ERROR!');
// 		console.log(`error is: ${error}`);
// 	}
// }

mongoose.connect('mongodb://localhost:27017/movieApp');

const movieSchema = new Schema({
	title: String,
	director: String,
	category: [String],
	releaseDate: Date
});

const Movie = mongoose.model('Movie', movieSchema);

// const IronMan = new Movie({
// 	title: 'Iron Man',
// 	director: 'Jon Favreau',
// 	category: ['Action', 'Adventure', 'Sci-Fi'],
// 	releaseDate: new Date(2008, 04, 30)
// });

// const Avengers = new Movie({
// 	title: 'The Avengers',
// 	director: 'Joss Whedon',
// 	category: ['Action', 'Adventure', 'Sci-Fi'],
// 	releaseDate: new Date(2012, 05, 11)
// });

// Avengers.save()
// 	.then(() => {
// 		console.log('save done');
// 	})
// 	.catch((error) => {
// 		console.log('we have a problem!');
// 		console.log(error);
// 	});

// node -> .load index.js -> object
