const express = require('express');
const { authMiddleware } = require('../../middleware/auth.middleware');
const { getUsers } = require('../../services/user.service');

const router = express.Router();

router.get('/', [authMiddleware], (req, res, next) => {
  getUsers(req, res, next);
});

module.exports = router;
