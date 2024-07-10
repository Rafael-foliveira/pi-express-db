var express = require('express');
const db = require('../../config/config_database');
var router = express.Router();
// var alunos = require('../../tests/mocks/alunos.json')


router.get('/',async function (_req, res, next) {
    const query = "SELECT * FROM alunos"
    try {
        const data = await db.any(query);
        res.status(200).json(data);

    } catch (error) {   
    }
});


router.get('/', function(req, res, next) {
    try {
        res.status(200).json(alunos);
        
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.get('/:matricula',async function(req, res, next){
    const {matricula} = req.params;
    const query = `
            SELECT *
            FROM alunos 
            WHERE matricula 
    `
    try {
        const data = await db.any(query);
        const aluno = alunos.content[matricula]
        res.status(200).json(aluno);
    } catch (error) {
        res.status(400).json({ msg: error.message });
        
    }
});


router.post('/', function(req, res, next){
    const novoAluno = req.body;
    const query =    
    `INSERT
    INTO  alunos (matricula, nome, email, data_nascimento)
    VALUES ($1, $2 ,$3, $4)`
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

router.delete('/:matricula',async function (req, res, next) {
    const matricula = req.params.matricula        
    const query = `
DELETE FROM alunos WHERE matricula 
`
    try {
        const data = await db.any(query);
        delete alunos.content[matricula]
        res.status(200).json(matricula)
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
    // res.redirect(303,'/alunos');
});



module.exports = router;
