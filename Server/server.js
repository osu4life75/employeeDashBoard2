const express = require('express');
const app = express();
const cors = require('cors');
const allEmployees = require('./database/employees')
const companyInfo = require('./database/companyInfo')

// Enable CORS
app.use(cors());

app.get('/test', (req, res) => {
    res.send('Hello from Server!');
});  
app.get('/getAllEmployees', (req, res) => {
    console.log(allEmployees)
    res.send(allEmployees);
});  
app.get('/getCompanyInfo', (req, res) => {
    console.log(companyInfo)
    res.send(companyInfo);
});  
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
