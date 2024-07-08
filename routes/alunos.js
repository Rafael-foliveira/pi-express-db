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
    const parametro = "create";
    res.render('form', {metodo: "POST",parametro, title: 'Novo Aluno', buttonText: 'Salvar'});

})

router.get('/:matricula', function(req, res, next){
    const {matricula} = req.params;
    const aluno = alunos.content[matricula]
    res.render('card', {title: 'Detalhe do Aluno',aluno})

});

router.get('/edit/:matricula', function(req, res, next){
    const {matricula} = req.params;
    const parametro = matricula;
    const aluno = alunos.content[matricula]
    res.render('form', {metodo: "PUT", parametro, title: 'Editar Aluno', buttonText:'Salvar Alterações', aluno});

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

router.put('/:matricula', function (req, res, next) {
    // const {body, method} = req
    const novoAluno = req.body;
    const matricula = novoAluno.matricula;
    alunos.content[matricula]= {
        ...novoAluno,
        matricula: Number(matricula)

    }
    res.redirect('/alunos');
});

router.delete('/:matricula', function (req, res, next) {
    const matricula = req.params.matricula

    delete alunos.content[matricula]
    res.redirect(303,'/alunos');
});



module.exports = router;
