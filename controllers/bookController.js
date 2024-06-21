const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { isPostOwner } = require('../middlewares/bookMiddlewares');
// const { isPostOwner } = require('../middlewares/bookMiddlewares');
const bookService = require('../services/bookService');
const { getErrorMessage } = require('../utils/errorUtils');


router.get('/catalog', async (req, res) => {
    const books = await bookService.getAll().lean();

    res.render('books/catalog', { books });
});

router.get('/create', isAuth, (req, res) => {
    res.render('books/create');
  });
  
router.post('/create', isAuth, async (req, res) => {
    const bookData = req.body;
    const userId = req.user._id;
  
    try {
      await bookService.create(userId, bookData);
      
      res.redirect('/books/catalog');
  
    } catch (err){
       res.render('books/create', {...bookData, error: getErrorMessage(err)})
    }
  });

  router.get('/:bookId/details', async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user?._id;
    try {
      const book = await bookService.getOneDetailed(bookId).lean();
      // const votes = books.votes.map(user => user.email).join(', ');
      const isOwner = book.owner && book.owner._id == userId;
      const isWanted = book.wishingList.some(user => user._id == userId);
      // const votesCount = Number(book.wishingList.length);
      // const owner = book.owner;

      res.render('books/details', { ...book, isOwner, isWanted });
    } catch (err) {
      console.log(err.message);
      res.redirect('/');
    }
});

router.get('/:bookId/read', isAuth, async (req, res) => {
  try {
    const book = await bookService.getOne(req.params.bookId).lean();

    //owner can't add book to wishlist
    if (book.owner == req.user?._id) {
      return res.redirect(`/books/${req.params.bookId}/details`);
    } 
    
    await bookService.read(req.params.bookId, req.user._id);

    res.redirect(`/books/${req.params.bookId}/details`);

  } catch (err) {
    // console.log(err);
    res.redirect('/');
  }
});

router.get('/:bookId/delete', isPostOwner, async (req, res) => {
  await bookService.delete(req.params.bookId);

  res.redirect('/books/catalog');
});

router.get('/:bookId/edit', isPostOwner, async (req, res) => {

  res.render(`books/edit`, { ...req.book });
});

router.post('/:bookId/edit', isPostOwner, async (req, res) => {
  const bookData = req.body;
  const bookId = req.params.bookId;

  try {
    await bookService.edit(bookId, bookData);

    res.redirect(`/books/${bookId}/details`);
  } catch (err) {
    
    res.render(`books/edit`, {...bookData, error: getErrorMessage(err)});
  }
});


module.exports = router;