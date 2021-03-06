const mysql = require("mysql2");

// CONEXÃO COM O BANCO DE DADOS CON
// CONFIGURAÇÕES EM NODEMON.JSON
let pool = mysql.createPool({
    "user" : process.env.MYSQL_USER,
    "password" : process.env.MYSQL_PWD,
    "database" : process.env.MYSQL_DB,
    "host" : process.env.MYSQL_HOST,
    "port" : process.env.MYSQL_PORT
})

exports.pool = pool;