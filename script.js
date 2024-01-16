// main.js
// import getAge from './util/util.js';
// Your main code
var genders;
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
  let newEmployeeCountry = document.getElementById('employeeCountryInput').value; 
  let newEmployeeDOB = document.getElementById('employeeDOBInput').value; 
  let newEmployeeAddress = document.getElementById('employeeAddressInput').value; 
  let newEmployeeState = document.getElementById('employeeStateInput').value; 
  let newEmployeeZip = document.getElementById('employeeZipInput').value; 
  let newEmployeePhone = document.getElementById('employeePhoneInput').value; 
  console.log('employeeGender' , newEmployeeGender);
  
  
  // copy above line to add all v;lues of the form
  // once complete we will place info in object
  
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
      console.log('data',data);
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
  
  


  
  // this is where we will handle form data
  newEmployeeForm.reset();
  
})


window.onload = function () {
    console.log('Window has finished loading.');
    getGenders()
    getAllEmployees()
    getCompanyInfo()
    
    
};

function getGenders(){
  fetch('http://localhost:3000/getGenders')
  .then(function(response){
    if(response.ok){
        return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(function(data){
    console.log('genders',data.genders);
    genders = data.genders;
    let genderSelect = document.getElementById('genders');
    for (let i = 0; i < genders.length; i++) {
      var option = new Option(genders[i].gender, genders[i].id);
      genderSelect.add(option);
      
    }
` ` })
  .catch(function(error){
    console.log(error);
    alert('failed to load genders');
  })
  
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
        
        let employeesArray = data.employees;
        // set up options for employees dropdown
        let employeesSelect = document.getElementById('employeesDropDown');
        for (var i=0; i<employeesArray.length; i++){
          let option = new Option (`${employeesArray[i].FirstName} ${employeesArray[i].LastName}`, employeesArray[i].UUID);
          employeesSelect.add(option);
        }


        // get random number for employee of the month
       let randomEmployeeIndex = Math.floor(Math.random() * (employeesArray.length));
       let randomeEmployee2 = employeesArray[randomEmployeeIndex];
        getEmployeeofTheMonth(randomeEmployee2);
        totalEmployees(employeesArray);
        maleToFemaleRatio(employeesArray);
        percLiveInUS(employeesArray);
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
  console.log('genderArray',genders)
  let genderString;
  for (let i = 0; i < genders.length; i++) {
    console.log(genders[i]); 
    if (genders[i].id===genderID) {
      genderString = genders[i].gender;
      break
     }
  }
  return genderString;
 }
// use the above code as a template for setEmployeeDataOnElements to handle the genders.
function getEmployeeofTheMonth(randomEmployee) {
  console.log('rando',randomEmployee);
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

function totalEmployees(employeesArray) {
  const totalNumberOFEmployees = employeesArray.length;
  let totalEmployees=document.getElementById('totalEmployees');
  totalEmployees.innerText = `${employeesArray.length}`;
}

function maleToFemaleRatio(employeesArray) {
  // Loop through allEmployees; it's an array
  // For each iteration, you will find a gender
  // Need three variables: male, female, and other count
  console.log('maleToFemale', employeesArray[0]);
  let femaleCount = 0;
  let maleCount = 0;
  let otherCount = 0;

  for (let i = 0; i < employeesArray.length; i++) {
    const element = employeesArray[i];
    console.log('element', element);

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

  console.log('totalMaleFemaleOther', maleCount, femaleCount, otherCount);
  let ratio = document.getElementById('maleToFemaleRatio');
  ratio.innerText = `${maleCount} / ${femaleCount} / ${otherCount}`;
}

function percLiveInUS(allEmployees) {
 //total employess 23 how many live in US?
 //divide total US employess by allEmployees * by 100
  
  let usResident = 0;
  for (let i = 0; i < allEmployees.length; i++) {
    const element = allEmployees[i];
    if(element.Country === 'USA'){
      usResident = usResident +1;
    
    }
  
  } 
  let percentage = ((usResident/allEmployees.length) * 100).toFixed(0); 
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

