var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();
var loginController = require('../controllers/loginController')
var cadastroController = require("../controllers/cadastroController")
var auth = require('../middleware/auth');
var app = express();



/* GET home page. */



router.get('/' ,(req, res)=>{
res.render('index')
})
router.post('/login',loginController.create)

router.use(function (req, res, next) {
    console.log(req.session)
    if(req.session.usuario){
        return next();
     }else{
         res.send("voce precisa logar!")
     }
  });

router.get('/cadastro/produto',(req,res)=>{
    res.render('cad_produto')
})

router.get('/saida/produt',(req,res)=>{
    res.render('saida_produt')
})

router.get('/entrada/produt',(req,res)=>{
    res.render('entrada_produt')
})

router.get('/cadastrar/fornecedor/',(req,res)=>{
    res.render('cad_fornecedor')
})

router.get('/cadastrar/usuario',(req,res)=>{
    res.render('cad_usuario')
})
router.get('/sair/sala',(req,res)=>{
    res.render('index')
})
router.get('/home',(req,res)=>{
 
        res.render('home');
   
})
router.post('/logout', (req,res) => {
    req.session.usuario = null
    res.render('index')
} )


router.post ('/produtos/saida',cadastroController.saida)
router.post('/cadastro/produto',cadastroController.create)
router.post('/cadastro/produto/pesquisa',cadastroController.pesquisaPropoduto)
router.post('/produto/saida',cadastroController.saida);
router.post('/cadastrar/fornecedor',cadastroController.createFornecedor);
router.post('/fornecedor/pesquisa',cadastroController.pesquisaFornecedor)
router.post('/cadastrar/usuario',cadastroController.createUsuario)
router.post('/usuario/pesquisa',cadastroController.pesquisaUsuario);
router.post('/usuario/alterar',cadastroController.updateUsuario);




module.exports = router;
