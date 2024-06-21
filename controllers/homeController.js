const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {

  res.render('home');
});


module.exports = router;
