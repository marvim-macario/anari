var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();
router.use(cookieParser('anari'));
var loginController = require('../controllers/loginController')
var cadastroController = require("../controllers/cadastroController")


/* GET home page. */



router.get('/' ,(req, res)=>{
    res.render('index')
})



router.get('/cadastro/produto',(req,res)=>{
    res.render('cad_produto')
})

router.get('/saida/produt',(req,res)=>{
    res.render('saida_produt')
})

router.get('/entrada/produt',(req,res)=>{
    res.render('entrada_produt')
})

router.get('/cadastrar/fornecedor',(req,res)=>{
    if (! req.cookies.login) {
        res.render('index');
    return } 
    fornecedor = {NOME: "", CNPJ: "", ENDERECO: "", ESTADO: ""}
    res.render('cad_fornecedor', fornecedor)
})

router.get('/cadastrar/fornecedor/:codigo',(req,res)=>{
    if (! req.cookies.login) {
        res.render('index');
    return } 
    codigo = parseInt(req.params.codigo) 
    if (codigo == 1){
    fornecedor = {NOME: "pedro", CNPJ: "1234", ENDERECO: "x", ESTADO: "y"}
    } else if (codigo == 2){
        fornecedor = {NOME: "maria", CNPJ: "5678", ENDERECO: "z", ESTADO: "w"}
    } else { res.render('erro')}  
    res.render('cad_fornecedor', fornecedor)
})

router.get('/cadastrar/usuario',(req,res)=>{
    res.render('cad_usuario')
})
router.get('/sair/sala',(req,res)=>{
    res.render('index')
})
router.get('/home',(req,res)=>{
    if (! req.cookies.login) {
        res.render('index');
    return }
    res.render('home', {admin: req.cookies.admin, nome: req.cookies.nome})
})
router.post('/logout', (req,res) => {
    res.clearCookie('login')
    res.render('index', {mensagem: "tchau"})
} )

router.post('/home',loginController.create)
router.post('/cadastro/produto',cadastroController.create)
router.post('/cadastro/produto/pesquisa',cadastroController.pesquisaPropoduto)
router.post('/cadastrar/fornecedor',cadastroController.createFornecedor)
router.post('/cadastrar/usuario',cadastroController.createUsuario)


module.exports = router;
