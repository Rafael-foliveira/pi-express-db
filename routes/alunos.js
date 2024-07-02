var express = require('express');
var router = express.Router();
var alunos = require('../tests/mocks/alunos.json')

router.get('/', function(req, res, next) {
    const data = {
        title: 'Alunos',
        alunos: alunos
    };
        res.render('list',data)
});

module.exports = router;