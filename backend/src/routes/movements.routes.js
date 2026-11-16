const express = require('express');
const movementsController = require('../controllers/movements.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', movementsController.listMovements);
router.post('/entry', movementsController.createEntry);
router.post('/exit', movementsController.createExit);

module.exports = router;
