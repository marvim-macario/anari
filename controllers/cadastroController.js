const Sequelize = require('sequelize');
const config = require('../config/database');
const moment = require('moment');

const {
    produto
} = require('../models');
const {
    fornecedor
} = require('../models');
const {
    usuario
} = require('../models');

const {
    movimento
} = require('../models');

const cadastroController = {
    create: async (req, res) => {
        console.log(req.body)
        const {
            CATEGORIA_PRODUTO,
            TIPO_PRODUTO,
            TAMANHO_PRODUTO,
            GENERO,
            QUANTIDADE,
            DEPARTAMENTO_PRODUTO,
            COD_FORNECEDOR

        } = req.body
        const db = new Sequelize(config)

        const [prod] = await produto.findAll({

            where: {
                CATEGORIA_PRODUTO: CATEGORIA_PRODUTO,
                TIPO_PRODUTO: TIPO_PRODUTO,
                TAMANHO_PRODUTO: TAMANHO_PRODUTO,
                GENERO_PRODUTO: GENERO,
                COD_FORNECEDOR: COD_FORNECEDOR,
                DEPARTAMENTO_PRODUTO: DEPARTAMENTO_PRODUTO
            }
        })

        if (prod) {
            res.send({
                "msg": "Produto já existente na base de cadastro!"
            })
        } else {
            try {
                const ress = await produto.create({
                    CATEGORIA_PRODUTO: CATEGORIA_PRODUTO,
                    TIPO_PRODUTO: TIPO_PRODUTO,
                    TAMANHO_PRODUTO: TAMANHO_PRODUTO,
                    GENERO_PRODUTO: GENERO,
                    DEPARTAMENTO_PRODUTO: DEPARTAMENTO_PRODUTO,
                    COD_FORNECEDOR: COD_FORNECEDOR,
                    QUANTIDADE_PRODUTO: QUANTIDADE
                })


                res.send({
                    'msg': 'produto cadastrado com sucesso'
                })
            } catch (error) {
                console.log(error);
            }
        }


    },
    updateCadastro: async (req, res) => {
     
        const {
            COD_PRODUTO,
            QUANTIDADE
        } = req.body;

        try {
            const up = await produto.findOne({
                where: {
                    COD_PRODUTO: COD_PRODUTO
                }
            })
            up.QUANTIDADE = up.QUANTIDADE + QUANTIDADE;
            up.save();
            res.send({
                'msg': 'produto alterado com sucesso !'
            })

        } catch (error) {
            console.log(error);
            res.send({
                'erro': 'erro interno no servidor'
            })
        }



    },
    createFornecedor: async (req, res) => {
        const {
            NOME_FORNECEDOR,
            CNPJ_FORNECEDOR,
            ENDERECO_FORNECEDOR,
            UDF_FORNECEDOR
        } = req.body;
    
        try {

            const result = await fornecedor.create({

                NOME_FORNECEDOR: NOME_FORNECEDOR,
                CNPJ_FORNECEDOR: CNPJ_FORNECEDOR,
                ENDERECO_FORNECEDOR: ENDERECO_FORNECEDOR,
                UDF_FORNECEDOR: UDF_FORNECEDOR
            })
            res.send({
                'msg': "fornecedor cadastrado com sucesso"
            });

        } catch (error) {

            console.log(error)
        }

    },
    createUsuario: async (req, res) => {
        console.log(req.body);
        const db = new Sequelize(config);
        const {
            nome,
            numero,
            cargo,
            senha,
            nivel
        } = req.body;

        try {
            const result = db.query(`INSERT INTO USUARIO
            ( 
               NOME_USUARIO, CARTAO_USUARIO, CARGO_USUARIO, SENHA_USUARIO, NIVEL_USUARIO 
            )
        VALUES
            ('${nome}','${numero}','${cargo}', '${senha}','${nivel}')`)

            res.send({"msg":"usuario cadastrado com sucesso "});

        } catch (error) {
            res.send({"msg":"erro interno servidor"})
            console.log(error)
        }
    },
    pesquisaPropoduto: async (req, res) => {
        console.log(req.body)
        var where = {};
        if (req.body.CATEGORIA_PRODUTO) where.CATEGORIA_PRODUTO = req.body.CATEGORIA_PRODUTO;
        if (req.body.TIPO_PRODUTO) where.TIPO_PRODUTO = req.body.TIPO_PRODUTO;
        if (req.body.TAMANHO_PRODUTO) where.TAMANHO_PRODUTO = req.body.TAMANHO_PRODUTO;
        if (req.body.GENERO_PRODUTO) where.GENERO_PRODUTO = req.body.GENERO_PRODUTO;
        if (req.body.COD_FORNECEDOR) where.COD_FORNECEDOR = req.body.COD_FORNECEDOR;
        if (req.body.COD_PRODUTO) where.COD_PRODUTO = req.body.COD_PRODUTO;

        const pesquisa = await produto.findAll({

            where,
        })

        res.json(pesquisa)
    },
    pesquisaSaida: async (req, res) => {
       
        let where = {};
        if(req.body.movimento) where.DATA_MOVIMENTO = req.body.movimento;
        if(req.body.cod_produto) where.COD_PRODUTO = req.body.cod_produto;

        const result = await movimento.findAll({where})

        res.send(result);
    },

    pesquisaFornecedor: async (req, res) => {
        var where = new Object();
        if (req.body.NOME_FORNECEDOR) where.NOME_FORNECEDOR = req.body.NOME_FORNECEDOR;
        if (req.body.CNPJ_FORNECEDOR) where.CNPJ_FORNECEDOR = req.body.CNPJ_FORNECEDOR;
        if (req.body.ENDERECO_FORNECEDOR) where.ENDERECO_FORNECEDOR = req.body.ENDERECO_FORNECEDOR;
        if (req.body.UDF_FORNECEDOR) where.UDF_FORNECEDOR = req.body.UDF_FORNECEDOR
    
        const pesquisa = await fornecedor.findAll({

            where,
        })

        res.json(pesquisa)
    },
    pesquisaUsuario: async (req, res) => {
        var where = new Object();
        if (req.body.NOME) where.NOME_USUARIO = req.body.NOME;
        if (req.body.NUMERO_CARTAO) where.CARTAO_USUARIO = req.body.NUMERO_CARTAO;
        if (req.body.SENHA) where.SENHA_USUARIO = req.body.SENHA;
        if (req.body.ATRIBUICAO) where.NIVEL_USUARIO = req.body.ATRIBUICAO;

        const pesquisa = await usuario.findAll({

            where,
        })

        res.json(pesquisa)
    },
    updateUsuario: async (req, res) => {
        const {
            NOME,
            NUMERO_CARTAO,
            CARGO,
            SENHA,
            ATRIBUICAO
        } = req.body;

        try {
            const user = await usuario.findOne({
                where: {

                    CARTAO_USUARIO: NUMERO_CARTAO
                }
            })

            if (user) {
                user.NOME_USUARIO = NOME;
                user.SENHA_USUARIO = SENHA;
                user.NIVEL_USUARIO = ATRIBUICAO;
                user.CARGO_USUARIO = CARGO;

                user.save();

                res.send({
                    'msg': 'alterado cadastro de usuario'
                })

            } else {
                res.send({
                    'msg': 'erro interno no servidor.'
                })

            }
        } catch (error) {
            console.log(error)
        }
    },

    saida: async (req, res) => {
        const {
            COD_PRODUTO,
            QUANTIDADE_PRODUTO,
            CARTAO_USUARIO
        } = req.body;
        const baixa = await produto.findOne({
            where: {
                COD_PRODUTO: COD_PRODUTO
            }
        })

        baixa.QUANTIDADE_PRODUTO = baixa.QUANTIDADE_PRODUTO - QUANTIDADE_PRODUTO;
        baixa.save();

        const hora = moment().format('LLL');

        try {
            const movi = await movimento.create({
                DATA_MOVIMENTO: hora,
                COD_PRODUTO: COD_PRODUTO,
                CARTAO_USUARIO: CARTAO_USUARIO,
                QUANTIDADE_PRODUTO: QUANTIDADE_PRODUTO,
            })
            res.status(201).send({
                'ok': true
            })
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = cadastroController