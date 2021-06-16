const Sequelize = require('sequelize');
const config = require('../config/database');
const fs = require('fs')
const path = require('path');
const { QueryTypes } = require('sequelize');
const {produto} = require('../models')

const cadastroController = {
    create: async (req, res ) => {
        const {
            VESTUARIO,
            TECIDO,
            TAMANHO,
            GENERO,
            CATEGORIA,
            COD_FORNECEDOR,
            QUANTIDADE
        } = req.body
        const db = new Sequelize(config)


        try {

            const result = await db.query(`INSERT INTO PRODUTO
            (CATEGORIA_PRODUTO, TIPO_PRODUTO, TAMANHO_PRODUTO,GENERO_PRODUTO,DEPARTAMENTO_PRODUTO, COD_FORNECEDOR, QUANTIDADE_PRODUTO)
            VALUES('${VESTUARIO}','${TECIDO}','${TAMANHO}','${GENERO}','${CATEGORIA}',${COD_FORNECEDOR},${QUANTIDADE})`)
            
            if(result) res.render('cad_produto',{mensagem:'produto cadastrado com sucesso'});
            console.log(result)
        } catch (error) {

            console.log(error)
        }
    },
    createFornecedor: async(req,res)=>{

        const { nome,cnpj,endereco,estado } = req.body;
        const db = new Sequelize(config);


        try {

            const result = db.query(`INSERT INTO FORNECEDOR(NOME_FORNECEDOR, CNPJ_FORNECEDOR, ENDERECO_FORNECEDOR, UDF_FORNECEDOR)VALUES('${nome}',${cnpj} ,'${endereco}','${estado}')`)
            res.render('cad_fornecedor')

        } catch (error) {

            console.log(error)
        }

    },
    createUsuario: async (req,res) =>{
        const db = new Sequelize(config);
        const  {nome, numero, cargo, senha,nivel} = req.body;

        try {
            const result = db.query(`INSERT INTO USUARIO
            ( 
               NOME_USUARIO, CARTAO_USUARIO, CARGO_USUARIO, SENHA_USUARIO, NIVEL_USUARIO 
            )
        VALUES
            ('${nome}','${numero}','${cargo}', '${senha}','${nivel}')`
        )
            
            res.render('cad_usuario')
        } catch (error) {
            console.log(error)
        }
    },
    pesquisaPropoduto: async (req, res) => {
        console.log(req.body)
        var where = {};
        if(req.body.CATEGORIA_PRODUTO) where.CATEGORIA_PRODUTO = req.body.CATEGORIA_PRODUTO;
        if(req.body.TIPO_PRODUTO) where.TIPO_PRODUTO = req.body.TIPO_PRODUTO;
        if(req.body.TAMANHO_PRODUTO) where.TAMANHO_PRODUTO = req.body.TAMANHO_PRODUTO;
        if(req.body.GENERO_PRODUTO) where.GENERO_PRODUTO = req.body.GENERO_PRODUTO;
        if(req.body.COD_FORNECEDOR) where.COD_FORNECEDOR = req.body.COD_FORNECEDOR;
        console.log(where)
        const pesquisa = await produto.findAll({

            where,
        
            
        })
        
        res.json(pesquisa)
    }
}
module.exports = cadastroController