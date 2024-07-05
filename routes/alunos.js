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
router.post('/', function (req, res, next) {
    const {body, method} = req
    res.send({body,method});
});
router.post('/create', function(req, res, next){
    const novoAluno = req.body;
    const matricula = novoAluno.matricula;
    
    alunos.content[matricula]= {
        ...novoAluno,
        matricula: Number(matricula)

    }
    res.redirect("/alunos");
});

router.get('/:matricula', function(req, res, next){

    const {matricula} = req.params;
    const aluno = alunos.content[matricula]
    res.render('card', {title: 'Detalhe do Aluno',aluno})

});

router.get('/edit/:matricula', function(req, res, next){
    const {matricula} = req.params;
    const aluno = alunos.content[matricula]
    res.render('form', { title: 'Editar Aluno', buttonText:'Salvar Alterações', aluno});

})
router.put('/', function (req, res, next) {
    const {body, method} = req
    res.send({body,method,msg:'altera usuario'});
});
router.delete('/', function (req, res, next) {
    const {body, method} = req
    res.send({body,method ,msg:'remover aluno'});
});



module.exports = router;
