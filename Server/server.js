import express from 'express';
//import multer from 'multer';
import cors from 'cors';
import mysql from 'mysql2/promise';
import {config} from 'dotenv';
config();


//Middleware 
const app = express(); 
// Enable CORS
app.use(cors());

// Middleware to parse JSON in the request body
app.use(express.json());
// Middleware to parse URL-encoded data in the request body
app.use(express.urlencoded({ extended: true }));

//Database//
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

// Database Routes
 app.get('/getAllEmployees', async (req, res) => {
        const result = await pool.query("select * from employee");
        const rows = result[0];
        console.log('employeeRows',rows);
        res.json({employees: rows})
        
     
});
 
app.get('/getCompanyInfo', async (req, res) => {
  const result= await pool.query('select * from companyinfo');
  const rows = result[0];
    console.log('companyInfo Rows',rows);
    res.json({companyInfo: rows});
}); 

app.post('/addEmployee', async (req, res) => {
  console.log('req', req.body);

  // Create a new variable for the employee object
  let employeeObject = req.body;

  const mySqlTableEmployee = {
    FirstName: req.body.firstName,
    LastName: req.body.lastName,
    Gender: req.body.newEmployeeGender,
    Email: req.body.newEmployeeEmail,
    City: req.body.newEmployeeCity,
    Country: req.body.newEmployeeCountry,
    DOB: req.body.newEmployeeDOB
  };

  // Perform any data manipulations here if needed

  // Write query to insert a new row in the table
  let databaseTableName = 'employee';

  try {
    // Execute the query and wait for the result
    const result = await pool.query(`INSERT INTO ${databaseTableName} SET ?`, mySqlTableEmployee); //change emplyeeobject with new name of server object. 

    // Send a success response to the client
    res.json({ success: true, message: 'Data inserted successfully' });
  } catch (err) {
    // Handle errors and send an error response to the client
    console.error('Error inserting data: ', err);
    res.status(500).json({ success: false, message: 'Error inserting data' });
  }
});

app.post('/getSpecificEmployee', async (req, res) => {
  const result = await pool.query('select * from employee where ID = ?', [req.body.ID]);
  const rows = result[0];
  console.log('rows', rows)
  res.json({employeeObj: rows[0]})
})


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

