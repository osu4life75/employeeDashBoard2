window.onload = function () {
    console.log('Window has finished loading.');
    getAllEmployees()
    getCompanyInfo()
    
};


function getAllEmployees() {
    fetch("http://localhost:3000/getAllEmployees")
    .then(function(response){
        if(response.ok){
            return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function(data){
        console.log(data);
        // get random number for employee of the month
        let randomEmployeeIndex = Math.floor(Math.random() * (data.length));
        console.log("randomEmployeeIndex",randomEmployeeIndex);
       let randomeEmployee2 = data[randomEmployeeIndex];
        getEmployeeofTheMonth(randomeEmployee2);

      })
      .catch(function(error){
        console.log(error);
      })
    
    
};
function getCompanyInfo() {
    fetch("http://localhost:3000/getCompanyInfo")
    .then(function(response){
        if(response.ok){
            return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function(data){
        console.log(data);
        const name = data.name;
        console.log(name)
        let companyNameElement = document.querySelector('#companyname')
        companyNameElement.innerText = name;
        let businessCategory = document.getElementById("businessCategory")
        businessCategory.innerText = data.businessCategory;
        let businessAdress = document.getElementById("businessAdress")
        businessAdress.innerText = `${data.address} ${data.city} ${data.state}, ${data.country}`;
        






      })
      .catch(function(error){
        console.log(error);
      })
    
    
};
function test(){
  fetch("http://localhost:3000/test") 
  .then(function(response){
    if(response.ok){
        return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(function(data){
    console.log(data);
  })
  .catch(function(error){
    console.log(error);
  })

};

function getEmployeeofTheMonth(randomEmployee) {
  console.log('EOM', randomEmployee);
  let employeeName = document.getElementById('employeeName');
  employeeName.innerText = `${randomEmployee.name.first} ${randomEmployee.name.last}`;
  let employeeAge = document.getElementById('employeeAge')
  employeeAge.innerText = `${randomEmployee.dob.age}`;
  let employeeGender = document.getElementById('employeeGender')
  employeeGender.innerText = `${randomEmployee.gender.charAt(0).toUpperCase()}${randomEmployee.gender.slice(1)}`;
  let employeeEmail = document.getElementById('employeeEmail')
  employeeEmail.innerText = `${randomEmployee.email}`;
  let employeeCity = document.getElementById('employeeCity')
  employeeCity.innerText = `${randomEmployee.location.city}`;
  let employeeCountry = document.getElementById('employeeCountry')
  employeeCountry.innerText = `${randomEmployee.location.country}`;
  let eomPictures = document.getElementById("eomPicture");
  eomPictures.src = `${randomEmployee.picture.large}`;

 
}

