const express = require('express');
// const { authMiddleware } = require('../../middleware/auth.middleware');
const { addIncome, editIncome } = require('../../services/income.service');

const router = express.Router();

router.post('/', [], (req, res, next) => {
  addIncome(req, res, next);
});

router.put('/:incomeId', [], (req, res, next) => {
  editIncome(req, res, next);
});

module.exports = router;
