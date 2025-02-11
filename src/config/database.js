const mysql=require('mysql2');

const dotenv=require("dotenv");

dotenv.config();
const connection=mysql.createConnection
({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if(err) {
        console.error('Error connectingto databse: ', err);
        return;
    } 
    console.log('Conected to MySQL database');

});
module.exports =connection;