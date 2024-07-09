var express = require('express');
var router = express.Router();
var alunos = require('../../tests/mocks/alunos.json')

router.get('/', function(req, res, next) {
    try {
        res.status(200).json(alunos);
        
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.get('/:matricula', function(req, res, next){
    const {matricula} = req.params;
    try {
        const aluno = alunos.content[matricula]
        res.status(200).json(aluno);
    } catch (error) {
        res.status(400).json({ msg: error.message });
        
    }
});


router.post('/', function(req, res, next){
    const novoAluno = req.body;
    
    res.redirect("/alunos");
    try {
        const matricula = novoAluno.matricula;
        res.status(201).json(aluno.content[matricula])
        alunos.content[matricula]= {
            ...novoAluno,
            matricula: Number(matricula),
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.put('/:matricula', function (req, res, next) {
    const novoAluno = req.body;
    res.redirect("/alunos");
    try {
        const matricula = req.params.matricula
        res.status(200).json(matricula)
        alunos.content[matricula]= {
            ...novoAluno,
            matricula: Number(matricula),
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.delete('/:matricula', function (req, res, next) {
    const matricula = req.params.matricula        
    try {
        delete alunos.content[matricula]
        res.status(200).json(matricula)
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
    // res.redirect(303,'/alunos');
});



module.exports = router;
