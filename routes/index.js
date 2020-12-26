var express = require('express');
var router = express.Router();
const widgets = require('../shares/datasets/indexWidgets');
const menu = require('../shares/datasets/indexLeftSideBarMenu');
/* GET home page. */

router.get('/', function (req, res, next) {
  console.log(menu)
  res.render('index', {
    title: 'УКВ. Где? Что? Когда?', widgets: widgets,
    selfSpotMap: {
      name: 'Карта аквтивных СелфСпотов',
    },
    menu: menu
  });
});

module.exports = router;
