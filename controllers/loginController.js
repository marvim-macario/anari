const Sequelize = require('sequelize');
const config = require('../config/database');
const fs = require('fs')
const path = require('path');
const { QueryTypes } = require('sequelize');
const { text } = require('express');


const LoginController ={
    
    create: async(req,res) =>{
        const { usuario, senha} = req.body;
     
        const db = new Sequelize(config)
        try {
            
            const [result] = await db.query(
                `SELECT NOME_USUARIO, CARTAO_USUARIO, SENHA_USUARIO, NIVEL_USUARIO FROM USUARIO where CARTAO_USUARIO = :usuario and SENHA_USUARIO = :senha`, { replacements: {usuario:usuario , senha:senha}, type: QueryTypes.SELECT })

              if(result)
              
              {
                res.cookie('login', result.CARTAO_USUARIO, {httpOnly: true, signed: false, maxAge: 1000 * 60 * 15})  
                res.cookie('admin', result.NIVEL_USUARIO == 1, {httpOnly: true, signed: false, maxAge: 1000 * 60 * 15})  
                res.cookie('nome', result.NOME_USUARIO, {httpOnly: true, signed: false, maxAge: 1000 * 60 * 15})  

                 return res.render('home', {admin: result.NIVEL_USUARIO == 1, nome: result.NOME_USUARIO})
              }
            
              res.render('index',{
                  mensagem:"Usuário ou senha incorretos." 
            
              })
                
         
            
                
         } catch (error) {
                console.log(error)
         }
}
}


module.exports = LoginController