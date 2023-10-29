import express from 'express';
//import multer from 'multer';
import cors from 'cors';
import mysql from 'mysql2/promise';
import {config} from 'dotenv'
config()

//Middleware 
const app = express(); 
// Enable CORS
app.use(cors());


//Database//
const pool = mysql.createPool({
    host:'127.0.0.1',
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})
/*const result= await pool.query('select * from employee');
console.log('result',result);
const rows = result[0];
console.log('rows',rows)
const connection = await pool.getConnection();
//console.log('connection',connection)
app.get('/test', (req, res) => {
    res.send('Hello from Server!');
}); */

 app.get('/getAllEmployees', async (req, res) => {
        const result = await pool.query("select * from employee");
        const rows = result[0];
        console.log('rows',rows);
        res.json({employees: rows})
        
     
});
 
// app.get('/getCompanyInfo', (req, res) => {
//     console.log(companyInfo)
//     res.send(companyInfo);
// });  
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
