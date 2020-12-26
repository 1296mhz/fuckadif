const express = require('express');
const router = express.Router();
const widgets = require('../shares/datasets/indexWidgets');
const menu = require('../shares/datasets/indexLeftSideBarMenu');
const multer  = require("multer");
/* GET users listing. */
router.use(multer({dest:"adifs-upload"}).single("file"));

router.get('/', function(req, res, next) {
  res.render('upload', {
      title: "Загрузка adif",
      filename: 'Выберите файл для загрузки',
      widgets: widgets,
      menu: menu
  });
});

router.post("/", function (req, res, next) {
   
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.redirect(`/dashboard/${filedata.filename}/${filedata.originalname}`)
});

module.exports = router;