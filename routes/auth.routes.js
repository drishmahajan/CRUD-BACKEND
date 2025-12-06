const express = require('express');
const { body } = require('express-validator');
const { handleValidation } = require('../utils/Validator');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register',
  body('name').notEmpty().withMessage('name required'),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  handleValidation,
  authCtrl.register
);

router.post('/login',
  body('email').isEmail(),
  body('password').notEmpty(),
  handleValidation,
  authCtrl.login
);

router.post('/refresh', authCtrl.refresh);
router.post('/logout', authCtrl.logout);

module.exports = router;
