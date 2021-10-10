const fs = require('fs');
const mysql = require('mysql2/promise');
let data =  fs.readFileSync('../lista.json');
let productos = JSON.parse(data);
(async ()=> {
    
    // create the connection
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'productos'});
    // query database
    const [rows, fields] = await connection.execute('SELECT * FROM `productos`');
    console.log(rows);
    //const [rows, fields] = await connection.execute('SELECT * FROM `table` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);

    //for(let i = 0; i < productos.length; i++ ){
     // await connection.execute('INSERT INTO `productos` (`id`, `nombre`, `precio`, `imagen`) VALUES (NULL, ?, ?, NULL)',[productos[i].nombre,productos[i].precio])
    //}
   
  })

()