// Global Variables and Global Functions
var genders;
var employeeID;

    //  Function gets gender object and makes options for gender selections.

function getGenders(){
    fetch('http://localhost:3000/getGenders')
    .then(function(response){
      console.log('response in getGenders of script.js', response)
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
   })
    .catch(function(error){
      console.log(error);
      alert('failed to load genders');
    })
    
  }
    // ---------------End of Gender Selection---------//

    // Function that gets age based on date of birth. 

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
       //-------------End of Age Function---------//


    // Function that gets Male, Female, or Other. Gets from gender object.
  
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

   //--------------End of Gender String Function-------//

//   Function that redirects to second page.

   function employeeDropdownRedirect() {
    const selectedValue = document.getElementById('employeesDropDown').value;
    const url = `./pages/employee/employee.html?id=${selectedValue}`
    // Navigate to the new URL
    window.location.href = url;
    
  }

  //---------End of redirect function------//

     //function will be reviewed WED//
     function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
}   

   //--------end of function tht will be reviewed WED----//

  
  
// Window Onload

window.onload = function () {
    console.log('Window has finished loading.');
    getGenders()
    getAllEmployees()
    getCompanyInfo()
    
    
};
    // Section has to be reviewed Wed//
window.onload = function(){
    console.log('employee.js Window is finshied loading!');
    // getGenders();
  
  //get id from query params and pass to getEOMData() 
    const urlParams = new URLSearchParams(window.location.search);
    employeeID = urlParams.get('id');
      
    getEmployeeData(employeeID)
    //set up options for Country
    let countrySelect = document.getElementById("country");
    const countries = [
            { label: 'United States', value: 'united states' },
            { label: 'Canada', value: 'canada' },
            { label: 'United Kingdom', value: 'united kingdom' },
            { label: 'Australia', value: 'australia' },
            { label: 'Germany', value: 'germany' },
            { label: 'France', value: 'france' },
            { label: 'China', value: 'china' },
            { label: 'India', value: 'india' },
            { label: 'Japan', value: 'japan' },
            { label: 'Russia', value: 'russia' },
            { label: 'Brazil', value: 'brazil' },
            { label: 'Mexico', value: 'mexico' },
            { label: 'Italy', value: 'italy' },
            { label: 'Spain', value: 'spain' },
            { label: 'South Africa', value: 'south africa' },
            { label: 'Argentina', value: 'argentina' },
            { label: 'Netherlands', value: 'netherlands' },
            { label: 'Sweden', value: 'sweden' },
            { label: 'Switzerland', value: 'switzerland' },
            { label: 'Norway', value: 'norway' },
            { label: 'Saudi Arabia', value: 'saudi arabia' },
            { label: 'United Arab Emirates', value: 'united arab emirates' },
            { label: 'South Korea', value: 'south korea' },
            { label: 'Singapore', value: 'singapore' },
            { label: 'New Zealand', value: 'new zealand' },
            { label: 'Turkey', value: 'turkey' },
            { label: 'Egypt', value: 'egypt' },
            { label: 'Indonesia', value: 'indonesia' },
            { label: 'Pakistan', value: 'pakistan' },
            { label: 'Nigeria', value: 'nigeria' },
            { label: 'Chile', value: 'chile' },
            { label: 'Colombia', value: 'colombia' },
            { label: 'Poland', value: 'poland' },
            { label: 'Belgium', value: 'belgium' },
            { label: 'Denmark', value: 'denmark' },
            { label: 'Finland', value: 'finland' },
            { label: 'Greece', value: 'greece' },
            { label: 'Israel', value: 'israel' },
            { label: 'Portugal', value: 'portugal' },
            { label: 'Ireland', value: 'ireland' },
            { label: 'Austria', value: 'austria' },
            { label: 'Malaysia', value: 'malaysia' },
            { label: 'Thailand', value: 'thailand' },
            { label: 'Vietnam', value: 'vietnam' },
            { label: 'Philippines', value: 'philippines' },
            { label: 'Ukraine', value: 'ukraine' },
            { label: 'Czech Republic', value: 'czech republic' },
            { label: 'Romania', value: 'romania' },
            { label: 'Hungary', value: 'hungary' },
            { label: 'Peru', value: 'peru' },
            { label: 'Venezuela', value: 'venezuela' },
            { label: 'Bangladesh', value: 'bangladesh' },
            { label: 'Qatar', value: 'qatar' },
            { label: 'Kuwait', value: 'kuwait' },
            { label: 'Croatia', value: 'croatia' },
            { label: 'Slovakia', value: 'slovakia' },
            { label: 'Iceland', value: 'iceland' },
            { label: 'Luxembourg', value: 'luxembourg' }
          ];
        for (var i = 0; i < countries.length; i++) {
            var option = new Option(countries[i].label, countries[i].value);
            countrySelect.add(option);
      }
  
    let stateSelect = document.getElementById("state")
    const states = [
        { label: 'Alabama', value: 'alabama' },
        { label: 'Alaska', value: 'alaska' },
        { label: 'Arizona', value: 'arizona' },
        { label: 'Arkansas', value: 'arkansas' },
        { label: 'California', value: 'california' },
        { label: 'Colorado', value: 'colorado' },
        { label: 'Connecticut', value: 'connecticut' },
        { label: 'Delaware', value: 'delaware' },
        { label: 'Florida', value: 'florida' },
        { label: 'Georgia', value: 'georgia' },
        { label: 'Hawaii', value: 'hawaii' },
        { label: 'Idaho', value: 'idaho' },
        { label: 'Illinois', value: 'illinois' },
        { label: 'Indiana', value: 'indiana' },
        { label: 'Iowa', value: 'iowa' },
        { label: 'Kansas', value: 'kansas' },
        { label: 'Kentucky', value: 'kentucky' },
        { label: 'Louisiana', value: 'louisiana' },
        { label: 'Maine', value: 'maine' },
        { label: 'Maryland', value: 'maryland' },
        { label: 'Massachusetts', value: 'massachusetts' },
        { label: 'Michigan', value: 'michigan' },
        { label: 'Minnesota', value: 'minnesota' },
        { label: 'Mississippi', value: 'mississippi' },
        { label: 'Missouri', value: 'missouri' },
        { label: 'Montana', value: 'montana' },
        { label: 'Nebraska', value: 'nebraska' },
        { label: 'Nevada', value: 'nevada' },
        { label: 'New Hampshire', value: 'new hampshire' },
        { label: 'New Jersey', value: 'new jersey' },
        { label: 'New Mexico', value: 'new mexico' },
        { label: 'New York', value: 'new york' },
        { label: 'North Carolina', value: 'north carolina' },
        { label: 'North Dakota', value: 'north dakota' },
        { label: 'Ohio', value: 'ohio' },
        { label: 'Oklahoma', value: 'oklahoma' },
        { label: 'Oregon', value: 'oregon' },
        { label: 'Pennsylvania', value: 'pennsylvania' },
        { label: 'Rhode Island', value: 'rhode island' },
        { label: 'South Carolina', value: 'south carolina' },
        { label: 'South Dakota', value: 'south dakota' },
        { label: 'Tennessee', value: 'tennessee' },
        { label: 'Texas', value: 'texas' },
        { label: 'Utah', value: 'utah' },
        { label: 'Vermont', value: 'vermont' },
        { label: 'Virginia', value: 'virginia' },
        { label: 'Washington', value: 'washington' },
        { label: 'West Virginia', value: 'west virginia' },
        { label: 'Wisconsin', value: 'wisconsin' },
        { label: 'Wyoming', value: 'wyoming' },
        { label: 'Northern Territory', value: 'northern territory' },
        { label: 'Community of Madrid', value: 'community of madrid' },
        { label: 'Victoria', value: 'victoria' },
        { label: 'Ontario', value: 'ontario' },
        { label: 'England', value: 'england' },
        { label: 'New South Wales', value: 'new south wales' },
        { label: 'British Columbia', value: 'british columbia' },
        { label: 'Catalonia', value: 'catalonia' },
        { label: 'Île-de-France', value: 'île-de-france' },
        { label: 'Mexico City', value: 'mexico city' },
        { label: 'Victoria', value: 'victoria' }
    ];
      
    for (var i = 0; i < states.length; i++) {
        var option = new Option(states[i].label, states[i].value);
        stateSelect.add(option);
    }
};
    // ------end of review section for WED//

// Index.html Page (landing page)

    //  Modal Setup Start
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
   // --------------- END of Modal Setup-----------//

    //Start of new employee form

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

//-------------- End of New Employee Form-------//


    // Funciton that handles adding new employee

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
  newEmployeeForm.reset();
  
})

    // ---------------End of Function for adding New Emploee-----//

    // Functions that get all employees

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
    //  ---------------End of get all Employees----//

    // Function for getting company info
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
    // -----------End of company info function------//

    // Utility functions for Employee of the Month Card
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

    // -------------End of Utilities on EOM CARD-------//

// employee.html Page (total section will be reviewed WED)

function submitForm(){
    console.log('Gn2')
    let updatedEmployeeObj = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip_code: document.getElementById('zip').value,
        email: document.getElementById('email').value,
        dob: document.getElementById('dob').value,
        phone_number: document.getElementById('phone').value,
        UUID: employeeID
   }
    
  
    console.log('updatedEmployeeObj', updatedEmployeeObj)
  
  
    fetch('http://localhost:3000/updateEmployee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployeeObj)
    })
    .then(function(response){
        if(response.ok){
            return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function(data){
       console.log('data returned in updateEmployee', data)
       //getting success message. display in popup and clear/close modal
       if(data.success){
        alert(data.message)
       }
       else{
        alert(data.message)
       }
      })
      .catch(function(error){
        console.log(error);
        alert('something went wrong')
      })
  
  
  }
  
   function getEmployeeData(uuid){
      console.log('UUID in getEOMData', uuid)
  
      fetch('http://localhost:3000/getSpecificEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({UUID: uuid}),
    })
    .then(function(response){
      console.log('response in getEmployeeData', response)
      if(response.ok){
          return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(data){
        console.log('data returned in getSpecificEmployee', data.employeeObj)
        setEmployeeDataOnElements(data.employeeObj)
      })
    .catch(function(error){
      console.log(error);
      alert('something went wrong in getSpecificEmployee')
    })
  
  }

  function setEmployeeDataOnElements(employee){
    console.log('employee in setEmployeeDataOnElements', employee)
    //get elements 
    document.getElementById('picture').src = `${employee.Picture}`;
    document.getElementById('firstName').value = `${employee.FirstName}`;
    document.getElementById('lastName').value = `${employee.LastName}`;
    document.getElementById('email').value = `${employee.Email}`;
    document.getElementById('address').value = `${employee.address}`;
    document.getElementById('city').value = `${employee.City}`;
    document.getElementById('state').value = `${employee.state ? employee.state.toLowerCase() : ''}`;
    document.getElementById('zip').value = `${employee.zip_code}`;
    document.getElementById('country').value = `${employee.Country.toLowerCase()}`;//fix countries in db to have full name
    document.getElementById('dob').value = `${formatDate(new Date(employee.DOB))}`;
    document.getElementById('phone').value = `${employee.phone_number}`;
    var newOption = document.createElement('option');
    newOption.text = getGenderString(employee.GenderID);
    newOption.value = employee.GenderID;
    console.log('new option', newOption);
   document.getElementById('genders').appendChild(newOption);
  
    // Need to get selected gender obj {label:"Male", value:1}
    // attempt utils file with live server
    
  }

  function deleteEmployee() {
    console.log('G2N', employeeID)
    fetch('http://localhost:3000/deleteButton', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({employeeID: employeeID})
  })
  .then(function(response){
      if(response.ok){
          return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(data){
     console.log('data returned in deleteButton', data)
     //getting success message. display in popup and clear/close modal
     if(data.success){
      alert(data.message)
     }
     else{
      alert(data.message)
     }
    })
    .catch(function(error){
      console.log(error);
      alert('something went wrong')
    })
 };
  
  