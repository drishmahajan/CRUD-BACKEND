const express = require('express');
const { body } = require('express-validator');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const ctrl = require('../controllers/task.controller');
const { handleValidation } = require('../utils/Validator');

const router = express.Router();

router.use(auth);

router.post('/',
  body('title').notEmpty(),
  handleValidation,
  ctrl.createTask
);

router.get('/', ctrl.getTasks);
router.get('/:id', ctrl.getTask);

router.put('/:id',
  ctrl.updateTask
);

router.delete('/:id',
  // only admin can delete any; users can delete their own — controller enforces ownership
  ctrl.deleteTask
);

module.exports = router;
