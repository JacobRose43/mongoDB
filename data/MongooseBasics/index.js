const mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose
	.connect('mongodb://localhost:27017/movieApp')
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.log('We have a problem!');
		console.log(error);
	});

const movieSchema = new Schema({
	title: String,
	director: String,
	category: [String],
	releaseDate: Date
});

const Movie = mongoose.model('Movie', movieSchema);

const IronMan = new Movie({
	title: 'Iron Man',
	director: 'Jon Favreau',
	category: ['Action', 'Adventure', 'Sci-Fi'],
	releaseDate: new Date(2008, 04, 30)
});

const Avengers = new Movie({
	title: 'The Avengers',
	director: 'Joss Whedon',
	category: ['Action', 'Adventure', 'Sci-Fi'],
	releaseDate: new Date(2012, 05, 11)
});

// another option of inserting data, but less used

// Movie.insertMany([
// 	{
// 		title: 'Captain America: The First Avenger',
// 		director: 'Joe Johnston',
// 		category: ['Action', 'Adventure', 'Sci-Fi'],
// 		releaseDate: new Date(2011, 08, 05)
// 	},
// 	{
// 		title: 'Captain Marvel',
// 		director: 'Anna Boden & Ryan Fleck',
// 		category: ['Action', 'Adventure', 'Sci-Fi'],
// 		releaseDate: new Date(2019, 03, 08)
// 	},
// 	{
// 		title: 'Cruella',
// 		director: 'Craig Gillespie',
// 		category: ['Comedy', 'Adventure', 'Crime'],
// 		releaseDate: new Date(2021, 05, 28)
// 	},
// 	{
// 		title: 'Nobody',
// 		director: 'Ilya Naishuller',
// 		category: ['Action', 'Crime', 'Drama'],
// 		releaseDate: new Date(2021, 03, 26)
// 	}
// ])
// 	.then((data) => {
// 		console.log('Accepted!');
// 		console.log(data);
// 	})
// 	.catch((error) => {
// 		console.log('Denied');
// 		console.log(error);
// 	});

// Avengers.save()
// 	.then(() => {
// 		console.log('save done');
// 	})
// 	.catch((error) => {
// 		console.log('we have a problem!');
// 		console.log(error);
// 	});

// node -> .load index.js -> object
