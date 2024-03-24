// main.js
// import getAge from './util/util.js';
// Your main code
var genders;
var updateEmployeeState;
var updateEmployeeCountry;

var modal = document.getElementById('addEmployeeModal');
var openModalButton = document.getElementById('modalButton');
var closedModalButton = document.getElementById('closeModalButton');

openModalButton.onclick = function(){
 modal.style.display = 'block';
}

closedModalButton.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if(event.target==modal){
     modal.style.display= 'none';
  }
}

let newEmployeeForm = document.getElementById('employeeForm');
newEmployeeForm.addEventListener('submit',function(event){
  event.preventDefault();
  let firstName = document.getElementById('employeeFirstName').value; 
  let lastName = document.getElementById('employeeLastName').value; 
  let newEmployeeGender = document.getElementById('genders').value;  
  let newEmployeeEmail = document.getElementById('employeeEmailInput').value; 
  let newEmployeeCity = document.getElementById('employeeCityInput').value; 
  let newEmployeeCountry = document.getElementById('country').value; 
  let newEmployeeDOB = document.getElementById('employeeDOBInput').value; 
  let newEmployeeAddress = document.getElementById('employeeAddressInput').value; 
  let newEmployeeState = document.getElementById('state').value; 
  let newEmployeeZip = document.getElementById('employeeZipInput').value; 
  let newEmployeePhone = document.getElementById('employeePhoneInput').value; 
  
    const employeeObject =  {
      firstName: firstName,
      lastName: lastName,
      newEmployeeGender: newEmployeeGender,
      newEmployeeEmail: newEmployeeEmail,
      newEmployeeCity: newEmployeeCity,
      newEmployeeCountry: newEmployeeCountry,
      newEmployeeDOB: newEmployeeDOB,
      newEmployeeAddress: newEmployeeAddress,
      newEmployeeState: newEmployeeState,
      newEmployeeZip: newEmployeeZip,
      newEmployeePhone: newEmployeePhone,
  }

 

  fetch('http://localhost:3000/addEmployee',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
    body: JSON.stringify(employeeObject), // Convert the data object to JSON string (capitlize JSON in this case)
  })
    .then(function(response){
      if(response.ok){
          return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(data){
      if (data.success) {
        alert(data.message);
        window.location.reload();
      }
      else{
        alert(data.message);
      }

    })
    .catch(function(error){
      console.log(error);
      alert('Server Error Try Again');
    })
  
    newEmployeeForm.reset();
  
})


window.onload = function () {
  console.log('Window has finished loading.');
  getGenders().then(function() {
      getAllEmployees();
      getCompanyInfo();
      getStates();
      getCountries();

     
  });
};
 

function getGenders() {
  return fetch('http://localhost:3000/getGenders')
      .then(function(response){
          if(response.ok){
              return response.json();
          }
          throw new Error('Network response was not ok.');
      })
      .then(function(data){
          genders = data.genders;
          let genderSelect = document.getElementById('genders');
          for (let i = 0; i < genders.length; i++) {
              var option = new Option(genders[i].gender, genders[i].id);
              genderSelect.add(option);
          }
      })
      .catch(function(error){
          console.log(error);
          alert('failed to load genders');
      });
}

function getStates() {
  fetch("http://localhost:3000/getStates")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(function (data) {
      updateEmployeeState = data.states;
      
      for (let i = 0; i < updateEmployeeState.length; i++) {
        let stateName = updateEmployeeState[i].state_name;
        updateEmployeeState[i].state_name =
          stateName.charAt(0).toUpperCase() +
          stateName.substring(1).toLowerCase();
      }

       let stateSelect = document.getElementById("state");
      for (let i = 0; i < updateEmployeeState.length; i++) {
        var option = new Option(
          updateEmployeeState[i].state_name,
          updateEmployeeState[i].id
        );
        stateSelect.add(option);
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Failed to load states");
    });
}

function getStateID(stateid) {
  let stateName;
  for (let i = 0; i < updateEmployeeState.length; i++) {
    if (updateEmployeeState[i].id === stateid) {
      stateName = updateEmployeeState[i].states;
      break;
    }
  }
  return stateName;
}

function getCountries() {
  fetch("http://localhost:3000/getCountries")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(function (data) {
      updateEmployeeCountry = data.countries;
      let countrySelect = document.getElementById("country");
      for (let i = 0; i < updateEmployeeCountry.length; i++) {
        let option = new Option(
          updateEmployeeCountry[i].label,
          updateEmployeeCountry[i].id
        );
        countrySelect.add(option);
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Failed to load countries");
    });
}

function getCountryID(countryid) {
  let countryName;
  for (let i = 0; i < updateEmployeeCountry.length; i++) {
    if (updateEmployeeCountry[i].id === countryid) {
      countryName = updateEmployeeCountry[i].label;
      break;
    }
  }
  return countryName;
}



function getAllEmployees() {
    fetch('http://localhost:3000/getAllEmployees')
    .then(function(response){
        if(response.ok){
            return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function(data){
         employee = data.employees;
        // set up options for employees dropdown
        // let employeeTable = document.getElementById('employeesDropDown');
        for (let i = 0; i < employee.length; i++) {
          var option = new Option(employee[i].employee, employee[i].id);
          // genderSelect.add(option);
      }


        // get random number for employee of the month
       let randomEmployeeIndex = Math.floor(Math.random() * (employee.length));
       let randomeEmployee2 = employee[randomEmployeeIndex];
        getEmployeeofTheMonth(randomeEmployee2);
        totalEmployees(employee);
        maleToFemaleRatio(employee);
        percLiveInUS(employee);
        setEOMHref(randomeEmployee2)

      })
      .catch(function(error){
        console.log(error);
      })
    
    
};
function getCompanyInfo() {
    fetch('http://localhost:3000/getCompanyInfo')
    .then(function(response){
        if(response.ok){
            return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function(data){
        let companyInfoArray = data.companyInfo;
        const name = companyInfoArray[0].name;
        let companyNameElement = document.querySelector('#companyname')
        companyNameElement.innerText = name;
        let businessCategory = document.getElementById("businessCategory")
        businessCategory.innerText = companyInfoArray[0].businessCategory;
        let businessAdress = document.getElementById("businessAdress")
        businessAdress.innerText = `${companyInfoArray[0].address} ${companyInfoArray[0].city} ${companyInfoArray[0].state}, ${companyInfoArray[0].country}`;
        })
      .catch(function(error){
        console.log(error);
      })
    
    
};

function getAge(dob){
  let dateOfBirth = new Date(dob);
  let currentDate = new Date();
  let age = currentDate.getFullYear() - dateOfBirth.getFullYear();

  // Check if the birthday has occurred this year
  if (
    currentDate.getMonth() < dateOfBirth.getMonth() ||
    (currentDate.getMonth() === dateOfBirth.getMonth() &&
      currentDate.getDate() < dateOfBirth.getDate())
  ) {
    // Subtract 1 from age if the birthday hasn't occurred yet this year
    return age - 1;
  }

  return age;

 }

 function getGenderString(genderID) {
  let genderString;
  for (let i = 0; i < genders.length; i++) {
    if (genders[i].id===genderID) {
      genderString = genders[i].gender;
      break
     }
  }
  return genderString;
 }
// use the above code as a template for setEmployeeDataOnElements to handle the genders.
function getEmployeeofTheMonth(randomEmployee) {
  let employeeName = document.getElementById('employeeName');
  employeeName.innerText = `${randomEmployee.FirstName} ${randomEmployee.LastName}`;
  let employeeAge = document.getElementById('employeeAge')
  let age = getAge(randomEmployee.DOB)
  employeeAge.innerText = `${age}`;
  let employeeGender = document.getElementById('employeeGender')
  employeeGender.innerText = getGenderString(randomEmployee.GenderID);
  let employeeEmail = document.getElementById('employeeEmail')
  employeeEmail.innerText = `${randomEmployee.Email}`;
  let employeeCity = document.getElementById('employeeCity')
  employeeCity.innerText = `${randomEmployee.City}`;
  let employeeCountry = document.getElementById('employeeCountry')
  employeeCountry.innerText = `${randomEmployee.Country}`;
  let eomPictures = document.getElementById("eomPicture");
  eomPictures.src = `${randomEmployee.Picture}`;

}

function totalEmployees(employee) {
  const totalNumberOFEmployees = employee.length;
  let totalEmployees=document.getElementById('totalEmployees');
  totalEmployees.innerText = `${employee.length}`;
}



function maleToFemaleRatio(employee) {
  // Loop through allEmployees; it's an array
  // For each iteration, you will find a gender
  // Need three variables: male, female, and other count
  let femaleCount = 0;
  let maleCount = 0;
  let otherCount = 0;

  for (let i = 0; i < employee.length; i++) {
    const element = employee[i];

    // Check the gender and update counts accordingly
    if (element.GenderID === 1) {
      maleCount = maleCount + 1;
    } else if (element.GenderID === 2) {
      femaleCount = femaleCount + 1;
    } else {
      // Assuming 'Other' if not Male or Female
      otherCount = otherCount + 1;
    }
  }

  let ratio = document.getElementById('maleToFemaleRatio');
  ratio.innerText = `${maleCount} / ${femaleCount} / ${otherCount}`;
}

function percLiveInUS(allEmployees) {
 //total employess 23 how many live in US?
 //divide total US employess by allEmployees * by 100
  
  let usResident = 0;
  for (let i = 0; i < employee.length; i++) {
    const element = employee[i];
    if(element.Country === 'USA'){
      usResident = usResident +1;
    
    }
  
  } 
  let percentage = ((usResident/employee.length) * 100).toFixed(0); 
 // let percentageElement = document.getElementById('percLiveInUS');
 // percentageElement.innerText = percentage + '%'; 
  document.getElementById('percLiveInUS').innerText = percentage + '%';
}


function setEOMHref(eom) {
  document.getElementById('eomAnchor').href= `./pages/employee/employee.html?id=${eom.UUID}`;

}

function employeeDropdownRedirect() {
  const selectedValue = document.getElementById('employeesDropDown').value;
  const url = `./pages/employee/employee.html?id=${selectedValue}`
  // Navigate to the new URL
  window.location.href = url;
  
}


