
var express = require('express');
const { localApi } = require('../config/config_axios')
var router = express.Router();
// var alunos = require('../tests/mocks/alunos.json')

router.get('/', async function(req, res, next) {    
    try {
        const resposta = await localApi.get('/api/v1/alunos');
        let alunos = resposta.data
        const viewData = {title: 'Alunos',alunos}
        res.status(200).render('list',viewData);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

router.get('/new', function(req, res, next){
    const parametro = "create";
    res.render('form', {metodo: "POST",parametro, title: 'Novo Aluno', buttonText: 'Salvar'});

})

router.get('/:matricula',async function(req, res, next){
    const matricula = req.params.matricula

    try {
        let resposta = await localApi.get('/api/v1/alunos/' + matricula);
        console.log(resposta);
        let aluno = resposta.data
        let viewData = {aluno, title: "Detalhes do aluno"}

        res.status(200).render('card',viewData);
    } catch (error) {
        res.json({ msg: error.message });
        
    }
    

});

router.get('/edit/:matricula', async function(req,res,next){
    let matricula = req.params.matricula
    let apiurlpatch = '/api/v1/alunos/' + matricula
    let viewData = {
        method: "PUT",
        parametro: matricula,
        title: "Editar Aluno",
        buttonText:"Adicionar"
    }
    try {
        const resposta = await localApi.get(apiurlpatch)
        let aluno = resposta.data
        viewData.aluno = aluno
        res.status(200).render('form',viewData)
    } catch (error) {
        res.status(400).json({msg: error.messagem})
    }
})

router.post('/create', function(req, res, next){
    const novoAluno = req.body;
    
    const matricula = novoAluno.matricula;
    alunos.content[matricula]= {
        ...novoAluno,
        matricula: Number(matricula)

    }
    res.redirect("/alunos");
});

router.put('/:matricula',async function (req, res, next) {
    let matricula = req.params.matricula
    let apiUrlPath = '/api/v1/alunos/' + matricula

    const data = req.body
    
    try {
        const response = await localApi.put(apiUrlPath, data);
        res.redirect('/alunos/' + matricula)
    } catch (error) {
        console.error(error.message)
    }

});
router.delete('/:matricula', function (req, res, next) {
    const matricula = req.params.matricula

    delete alunos.content[matricula]
    res.redirect(303,'/alunos');
});



module.exports = router;
