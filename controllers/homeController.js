const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const userService = require('../services/userService');


router.get('/', async (req, res) => {

  res.render('home');
});

router.get('/profile', isAuth, async (req, res) => {

  const userId = req.user._id;

  const user = await userService.getInfo(userId).lean();

  res.render('profile', {user});
});

module.exports = router;
