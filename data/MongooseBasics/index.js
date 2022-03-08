const mongoose = require('mongoose');

const { Schema } = mongoose;

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect('mongodb://localhost:27017/movieApp');
}

const movieSchema = new Schema({
	title: String,
	director: String,
	category: [String],
	releaseDate: Date
});

const Movie = mongoose.model('Movie', movieSchema);

let IronMan = new Movie({
	title: 'Iron Man',
	director: 'Jon Favreau',
	category: ['Action', 'Adventure', 'Sci-Fi'],
	releaseDate: 2008
});

// node -> .load index.js -> object
