const Sequelize = require('sequelize');
const config = require('../config/database');
const {usuario} = require('../models')

const LoginController ={
    
    create: async(req,res,next) =>{
        const { user, senha} = req.body;
        console.log(req.body)
        const db = new Sequelize(config)
        try {
            
            const result = await usuario.findOne({ 
                where: {
                    CARTAO_USUARIO:user,
                    SENHA_USUARIO:senha
                },
                attributes: {exclude: ['SENHA_USUARIO']},
            })
            
            if(!result){
                res.send({'erro':true})
            }
            req.session.usuario = result
            res.send(result)
           
                
         } catch (error) {
                console.log(error)
         }
        
    }
}


module.exports = LoginController