var express = require('express');
var router = express.Router();
var alunos = require('../../tests/mocks/alunos.json')

router.get('/', function(req, res, next) {
    const data = {
        title: 'Alunos',
        alunos: alunos
    };
        res.json(data)
});


router.get('/:matricula', function(req, res, next){
    const {matricula} = req.params;
    const aluno = alunos.content[matricula]
    res.json({aluno})

});


router.post('/', function(req, res, next){
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
