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

// exports.getOne = (volcanoId) => Volcano.findById(volcanoId);

// exports.getOneDetailed = (volcanoId) => this.getOne(volcanoId).populate('owner').populate('voteList');

// exports.vote = async (volcanoId, userId) => {
//     await Volcano.findByIdAndUpdate(volcanoId, { $push: { voteList: userId } });
//     await User.findByIdAndUpdate(userId, { $push: { votedPosts: volcanoId } });
  
// };

// exports.delete = (volcanoId) => Volcano.findByIdAndDelete(volcanoId);

// exports.edit = (volcanoId, volcanoData) => Volcano.findByIdAndUpdate(volcanoId, volcanoData,{ runValidators: true});
