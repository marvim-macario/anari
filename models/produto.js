module.exports = (sequelize, DataTypes) =>{
    const prod = sequelize.define('produto',{
        COD_PRODUTO:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        CATEGORIA_PRODUTO:DataTypes.STRING, 
        TIPO_PRODUTO:DataTypes.STRING, 
        TAMANHO_PRODUTO:DataTypes.STRING,
        GENERO_PRODUTO:DataTypes.STRING,
        DEPARTAMENTO_PRODUTO:DataTypes.STRING, 
        COD_FORNECEDOR:DataTypes.INTEGER, 
        QUANTIDADE_PRODUTO:DataTypes.INTEGER
    },{
        tableName: 'produto',
        timesTamps: false
    })
    return prod
};