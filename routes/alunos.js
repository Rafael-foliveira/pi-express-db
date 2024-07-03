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

router.get('/new', function(req, res, next){
    res.render('form', { title: 'Novo Aluno', buttonText: 'Adcionar'});

})

router.get('/:matricula', function(req, res, next){

    const {matricula} = req.params;
    const aluno = alunos.content[matricula]
    res.render('card', {title: 'Detalhe do Aluno',aluno})

});


module.exports = router;