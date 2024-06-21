const Book = require('../models/Book');
const User = require('../models/User');

exports.create = async (userId, bookData) => {
    const createdBook = await Book.create({
        owner: userId,
        ...bookData,
    });

    await User.findByIdAndUpdate(userId, { $push: { createdPosts: createdBook._id } });
    
    return createdBook;
}

exports.getAll = () => Book.find();

exports.getOne = (bookId) => Book.findById(bookId);

exports.getOneDetailed = (bookId) => this.getOne(bookId).populate('owner').populate('wishingList');

exports.read = async (bookId, userId) => {
    await Book.findByIdAndUpdate(bookId, { $push: { wishingList: userId } });
    await User.findByIdAndUpdate(userId, { $push: { votedPosts: bookId } });
  
};

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData,{ runValidators: true});
