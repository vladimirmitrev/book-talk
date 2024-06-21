const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
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

//   router.get('/:volcanoId/details', async (req, res) => {
//     const volcanoId = req.params.volcanoId;
//     const userId = req.user?._id;
//     try {
//       const volcano = await volcanoService.getOneDetailed(volcanoId).lean();
//       // const votes = volcano.votes.map(user => user.email).join(', ');
//       const isOwner = volcano.owner && volcano.owner._id == userId;
//       const isVoted = volcano.voteList.some(user => user._id == userId);
//       const votesCount = Number(volcano.voteList.length);
//       const owner = volcano.owner;

//       res.render('volcanoes/details', { ...volcano, isOwner, isVoted, votesCount, owner });
//     } catch (err) {
//       console.log(err.message);
//       res.redirect('/');
//     }
// });

// router.get('/:volcanoId/vote', isAuth, async (req, res) => {
//   try {
//     await volcanoService.vote(req.params.volcanoId, req.user._id);

//     res.redirect(`/volcanoes/${req.params.volcanoId}/details`);

//   } catch (err) {
//     // console.log(err);
//     res.redirect('/');
//   }
// });

// router.get('/:volcanoId/delete', isPostOwner, async (req, res) => {
//   await volcanoService.delete(req.params.volcanoId);

//   res.redirect('/volcanoes/catalog');
// });

// router.get('/:volcanoId/edit', isPostOwner, async (req, res) => {

//   res.render(`volcanoes/edit`, { ...req.volcano });
// });

// router.post('/:volcanoId/edit', isPostOwner, async (req, res) => {
//   const volcanoData = req.body;
//   const volcanoId = req.params.volcanoId;

//   try {
//     await volcanoService.edit(volcanoId, volcanoData);

//     res.redirect(`/volcanoes/${volcanoId}/details`);
//   } catch (err) {
    
//     res.render(`volcanoes/edit`, {...volcanoData, error: getErrorMessage(err)});
//   }
// });


module.exports = router;