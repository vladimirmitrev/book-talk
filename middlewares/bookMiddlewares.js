const bookService = require('../services/bookService');

async function isPostOwner(req, res, next) {
    const book = await bookService.getOne(req.params.bookId).lean();
  
    if (book.owner != req.user?._id) {
      return res.redirect(`/books/${req.params.bookId}/details`);
    } 

    req.book = book;
  
    next();
  }
  
  exports.isPostOwner = isPostOwner;