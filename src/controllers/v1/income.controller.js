const express = require('express');
// const { authMiddleware } = require('../../middleware/auth.middleware');
const { addIncome } = require('../../services/income.service');

const router = express.Router();

router.post('/', [], (req, res, next) => {
  addIncome(req, res, next);
});

module.exports = router;
