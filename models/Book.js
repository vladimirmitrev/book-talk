const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required!'],
        minLength: [2, 'Book title should be at least 2 characters']
    },
    author: {
        type: String,
        required: [true, 'Author is required!'],
        minLength: [5, 'Author should be at least 5 characters']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        min: [3, 'Genre should be at least 3 characters']
    },
    stars: {
        type: Number,
        required: [true, 'Stars is required!'],
        min: [1, 'Stars should be a number between 1 and 5'],
        max: [5, 'Stars should be a number between 1 and 5']
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: [/^https?:\/\//, 'Image must be a valid URL!'],
    },
    bookReview: {
        type: String,
        required: [true, 'Book Review is required!'],
        minLength: [10, 'Book Review should be at least 10 characters'],
    },
    wishingList : [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
}, 
{ timestamps: true}
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
