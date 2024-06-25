var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = {
    title: 'CR7',
    name: 'Rafael'
  }
  res.render('index', data);
});

module.exports = router;
