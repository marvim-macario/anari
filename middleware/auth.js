const Sequelize = require('sequelize');
const config = require('../config/database');
const { QueryTypes } = require('sequelize');

module.exports = async (req, res, next) =>{

    const { usuario, senha} = req.body;
     
        const db = new Sequelize(config)

        try {
                
                const [result] = await db.query(
                    `SELECT NOME_USUARIO, CARTAO_USUARIO, SENHA_USUARIO, NIVEL_USUARIO FROM USUARIO where CARTAO_USUARIO = :usuario and SENHA_USUARIO = :senha`, { replacements: {usuario:usuario , senha:senha}, type: QueryTypes.SELECT })

                if(result){

                    next();
                }


                res.render('index',{
                    mensagem:"Usuário ou senha incorretos." 
                
                })
                    
        
            } catch (error) {
                console.log(error)
            }

}