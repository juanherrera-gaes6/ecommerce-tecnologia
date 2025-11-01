const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'ecommerce'
});

connection.connect((err) => {
    if (err) {
        console.log('Error en conexion a la base de datos');
        return;
    }
    console.log('conexion exitosa');
});

module.exports =  connection;