module.exports = (sequelize, DataTypes) =>{
    const forne = sequelize.define('fornecedor',{
        COD_FORNECEDOR:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        
        NOME_FORNECEDOR:DataTypes.STRING,
        CNPJ_FORNECEDOR:DataTypes.INTEGER,
        ENDERECO_FORNECEDOR:DataTypes.STRING,
        UDF_FORNECEDOR:DataTypes.STRING(2)
    },{
        tableName: 'fornecedor',
        timesTamps: false
    })
    return forne
};