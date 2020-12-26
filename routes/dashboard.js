const express = require('express');
const router = express.Router();

const parser = require('../appParser/parserAdif');

/* GET Dashboard page. */
router.get('/:id/:originalname', function(req, res, next) {
  parser(req.params.id, req.params.originalname, res);
});

module.exports = router;
