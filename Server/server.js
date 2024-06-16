import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { config } from "dotenv";

config();

// Middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DATABASE_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the database connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to MySQL database");
    connection.release();
  } catch (error) {
    console.error("Error connecting to MySQL database:", error);
  }
})();
// Database Routes
app.get("/getGenders", async (req, res) => {
  const result = await pool.query("select * from gender");
  const rows = result[0];
  res.json({ genders: rows });
});

app.get("/getStates", async (req, res) => {
  const result = await pool.query("select * from states");
  const rows = result[0];
  res.json({ states: rows });
});

app.get("/getCountries", async (req, res) => {
  const result = await pool.query("select * from countries");
  const rows = result[0];
  res.json({ countries: rows });
});

// Define route to fetch all employees
app.get("/getAllEmployees", async (req, res) => {
  try {
    // Execute SQL query to get all employees
    const result = await pool.query("SELECT * FROM employee");
    const employees = result[0]; // Extract rows from the result
    res.json({ employees }); // Send JSON response with employees data
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
});

app.get("/getCompanyInfo", async (req, res) => {
  const result = await pool.query("select * from business");
  const rows = result[0];
  res.json({ companyInfo: rows });
});

app.post("/addEmployee", async (req, res) => {
  // Create a new variable for the employee object
  // const employeeObject = req.body;
  let UUID = generateRandomAlphaNumeric();

  const mySqlTableEmployee = {
    FirstName: req.body.firstName,
    LastName: req.body.lastName,
    GenderID: req.body.newEmployeeGender,
    Email: req.body.newEmployeeEmail,
    City: req.body.newEmployeeCity,
    Country: req.body.newEmployeeCountry,
    DOB: req.body.newEmployeeDOB,
    Address: req.body.newEmployeeAddress,
    State: req.body.newEmployeeState,
    Zipcode: req.body.newEmployeeZip,
    Phone_Number: req.body.newEmployeePhone,
    UUID: UUID,
  };

  // Perform any data manipulations here if needed

  // Write query to insert a new row in the table
  let databaseTableName = "employee";

  try {
    // Execute the query and wait for the result
    const result = await pool.query(
      `INSERT INTO ${databaseTableName} SET ?`,
      mySqlTableEmployee
    ); //change emplyeeobject with new name of server object.

    // Send a success response to the client
    res.json({ success: true, message: "Data inserted successfully" });
  } catch (err) {
    // Handle errors and send an error response to the client
    console.error("Error inserting data: ", err);
    res.status(500).json({ success: false, message: "Error inserting data" });
  }
});

app.post("/getSpecificEmployee", async (req, res) => {
  const result = await pool.query("select * from employee where UUID = ?", [
    req.body.UUID,
  ]);
  const rows = result[0];
  res.json({ employeeObj: rows[0] });
});

app.post("/updateEmployee", async (req, res) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Missing updateEmployeeObj in request body",
        });
    }

    const {
      firstName,
      lastName,
      gender,
      address,
      city,
      state,
      zip_code,
      email,
      dob,
      phone_number,
      country,
      UUID,
    } = req.body; // Correct destructuring syntax

    // Update the employee record with the data from updateEmployeeObj
    let result = await pool.query(`
      UPDATE employee 
      SET 
        FirstName = '${firstName}', 
        LastName = '${lastName}', 
        GenderID = '${gender}', 
        Address = '${address}', 
        City = '${city}', 
        State = '${state}', 
        Zipcode = '${zip_code}', 
        Email = '${email}', 
        DOB = '${dob}', 
        Phone_Number = '${phone_number}',
        Country = '${country}'
      WHERE UUID = '${UUID}'
    `); // Use proper string interpolation for SQL query placeholders

    console.log("result", result);
    // Check if the query was successful (affectedRows > 0)
    if (result[0].affectedRows > 0) {
      // Send a success response to the client
      res.json({ success: true, message: "Employee updated successfully" });
    } else {
      // Send an error response if no rows were affected
      res.json({
        success: false,
        message: "Employee not found or not updated",
      });
    }
  } catch (error) {
    // Handle any database or query errors
    console.error("Error in /updateEmployee:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const generateRandomAlphaNumeric = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

app.post("/deleteButton", async (req, res) => {
  console.log("req.body in /deleteButton", req.body);
  try {
    //create UUID for new entries
    let result = await pool.query(`Delete from employee WHERE UUID = ?`, [
      req.body.employeeID,
    ]);
    result = result[0];
    // Check if the query was successful (affectedRows > 0)
    if (result.affectedRows > 0) {
      // Send a success response to the client
      res.json({ success: true, message: "Employee Deleted successfully" });
      return; // res.redirect('/index.html');
    } else {
      // Send an error response if no rows were affected
      res.json({ success: false, message: "Employee not deleted" });
    }
  } catch (error) {
    // Handle any database or query errors
    console.error("Error in /deleteButton:", error);
    res.json({ success: false, message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
