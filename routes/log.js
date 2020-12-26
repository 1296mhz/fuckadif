const express = require('express');
const router = express.Router();
const parser = require('../appParser/parserAdif');

/* GET log page. */
router.get('/:id', function(req, res, next) {
    parser(req.params.id)
  res.render('log', { title: 'Log', filename: req.params.id});
});

module.exports = router;
