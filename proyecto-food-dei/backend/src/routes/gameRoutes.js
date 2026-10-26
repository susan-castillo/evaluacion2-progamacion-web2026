const express = require('express');
const router = express.Router();
const {guess, reset} = require('../controllers/gameController')

router.post('/guess', guess);
router.post('/reset', reset);

module.exports = router;