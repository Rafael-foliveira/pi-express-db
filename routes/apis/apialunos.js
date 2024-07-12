var express = require('express');
const db = require('../../config/config_database');
var router = express.Router();
router.get('/', async function(req, res, next) {
    const query = "SELECT * FROM alunos"
    try {
        const data = await db.any(query)
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
router.get('/:matricula',async function(req, res, next){
    const {matricula} = req.params;
const query = `
        SELECT *
        FROM alunos
        WHERE matricula =$1
        `
    try {
        const data = await db.one(query,matricula)
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
router.post('/',async function(req, res, next){
    // const novoAluno = req.body;
    const matricula = req.body.matricula
    const nome = req.body.nome
    const email = req.body.email
    const data_nascimento = req.body.data_nascimento
    const query = `
        INSERT
        INTO alunos (matricula, nome, email, data_nascimento)
        VALUES ($1,$2,$3,$4)
        `
    // const matricula = novoAluno.matricula
    // res.redirect("/alunos");
    const values = [matricula,nome,email,data_nascimento]
    try {
        const data = await db.any(query,values)
        // const matricula = Number(req.params.matricula )
        res.status(201).json(data)
        // alunos.content[matricula]= {
        //     ...novoAluno,
        //     matricula: Number(matricula),
        // }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
router.put('/:matricula',async function (req, res, next) {
    const novoAluno = req.body;
    const query = `
        UPDATE alunos
        SET nome=$2, email=$3, data_nascimento=$4
        WHERE matricula=$1
`;
    const nome = req.body.nome
    const matricula = req.body.matricula
    const email = req.body.email
    const data_nascimento = req.body.data_nascimento
    const values = [matricula, nome, email, data_nascimento];
    try {
        const data = await db.any(query, values)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});
router.delete('/:matricula',async function (req, res, next) {
    const matricula = req.params.matricula
    const query = `
        DELETE FROM alunos
        WHERE matricula  = $1
        `
    try {
        const data = await db.any(query,matricula)
        // delete alunos.content[matricula]
        res.status(200).json(matricula)
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
    // res.redirect(303,'/alunos');
});
module.exports = router;