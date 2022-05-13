const mysql = require("mysql2");

let pool = mysql.createPool({
    "user" : "root",
    "password" : "",
    "database" : "cimol",
    "host" : "localhost",
    "port" : 3306
})

exports.pool = pool;