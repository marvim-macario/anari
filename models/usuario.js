module.exports = (sequelize, DataTypes) =>{
    const user = sequelize.define('usuario',{
        CARTAO_USUARIO:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        NOME_USUARIO:DataTypes.STRING, 
        CARGO_USUARIO:DataTypes.STRING,
        SENHA_USUARIO:DataTypes.INTEGER,
        NIVEL_USUARIO:DataTypes.INTEGER,
    },{
        tableName: 'usuario',
        timesTamps: false
    })
    return user;
};