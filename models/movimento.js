module.exports = (sequelize, DataTypes) =>{
    const movimento = sequelize.define('movimento',{
        COD_MOVIMENTO:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        DATA_MOVIMENTO:DataTypes.DATE,
        COD_PRODUTO:DataTypes.STRING,
        COD_FORNECEDOR:DataTypes.STRING,
        CARTAO_USUARIO:DataTypes.STRING,
        ENTRADA_PRODUTO:DataTypes.STRING,
        SAIDA_PRODUTO:DataTypes.STRING,
        QUANTIDADE_PRODUTO:DataTypes.INTEGER
    },{
        tableName: 'movimento',
        timesTamps: false
    })
    return movimento;
};