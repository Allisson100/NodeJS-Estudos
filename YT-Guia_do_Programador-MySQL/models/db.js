const Sequelize = require('sequelize');

    // Conexão com o banco de dados MySQL
    const sequelize = new Sequelize('postapp', 'root', 'Alison20', {
        host: "localhost",
        dialect: 'mysql',
        query:{raw:true}
    });

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}