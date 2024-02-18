var employeeID;
var updateEmployeeGender;
var updateEmployeeState;
window.onload = function(){
  console.log('employee.js Window is finshied loading!');
  getGenders();
  getStates();

//get id from query params and pass to getEOMData() 
  const urlParams = new URLSearchParams(window.location.search);
  employeeID = urlParams.get('id');
    
  // getEmployeeData(employeeID)
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
    
}; 

function getStates() {
  console.log('updateEmployeeState', updateEmployeeState);
  fetch('http://localhost:3000/getStates')
    .then(function(response) {
      console.log('response in getStates', response);
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(data) {
      console.log('states', data.states);
      updateEmployeeState = data.states;
      let stateSelect = document.getElementById('state');
      // stateSelect.innerHTML = ""; // Clear existing options
      for (let i = 0; i < updateEmployeeState.length; i++) {
        var option = new Option(updateEmployeeState[i].state_name, updateEmployeeState[i].id);
        stateSelect.add(option);
      }
      

    })
    .catch(function(error) {
      console.log(error);
      alert('Failed to load states');
    });
}


function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


 // This is where the magic happens
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
  console.log("🚀 ~ submitForm ~ updatedEmployeeObj.state:", updatedEmployeeObj.state)
  console.log("🚀 ~ submitForm ~ updatedEmployeeObj.state:", updatedEmployeeObj.state)
  console.log("🚀 ~ submitForm ~ updatedEmployeeObj.state:", updatedEmployeeObj.state)
  

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

function getGenderString(genderID) {
  console.log('gender id',genderID)
  console.log('updateEmployee',updateEmployeeGender)
  let genderString;
  for (let i = 0; i < updateEmployeeGender.length; i++) {
    console.log(updateEmployeeGender[i]); 
    if (updateEmployeeGender[i].id===genderID) {
      genderString = updateEmployeeGender[i].gender;
      break
     }
  }
  return genderString;
 }




function setEmployeeDataOnElements(employee, states){
  console.log('employee in setEmployeeDataOnElements', employee, states)
  //get elements 
  document.getElementById('picture').src = `${employee.Picture}`;
  document.getElementById('firstName').value = `${employee.FirstName}`;
  document.getElementById('lastName').value = `${employee.LastName}`;
  document.getElementById('email').value = `${employee.Email}`;
  document.getElementById('address').value = `${employee.address}`;
  document.getElementById('city').value = `${employee.City}`;
  // document.getElementById('state').value = `${employee.state ? employee.state.toLowerCase() : ''}`;
  document.getElementById('state').value = states.state_name;
  document.getElementById('zip').value = `${employee.zip_code}`;
  document.getElementById('country').value = `${employee.Country.toLowerCase()}`;//fix countries in db to have full name
  document.getElementById('dob').value = `${formatDate(new Date(employee.DOB))}`;
  document.getElementById('phone').value = `${employee.phone_number}`;
  // var newOption = document.createElement('option');
  // newOption.text = getGenderString(employee.GenderID);
  // newOption.value = employee.GenderID;
  document.getElementById('genders').value = employee.GenderID;

  // Need to get selected gender obj {label:"Male", value:1}
  // attempt utils file with live server
  
}



function getGenders(){
  console.log('updateEmployeeGender', updateEmployeeGender),
  fetch('http://localhost:3000/getGenders')
  .then(function(response){
    console.log('response in getGenders', response);
    if(response.ok){
        return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(function(data){
    console.log('genders',data.genders);
    updateEmployeeGender = data.genders;
    let genderSelect = document.getElementById('genders');
    for (let i = 0; i < updateEmployeeGender.length; i++) {
      var option = new Option(updateEmployeeGender[i].gender, updateEmployeeGender[i].id);
      genderSelect.add(option);
      
    }
    getEmployeeData(employeeID)
  })
  .catch(function(error){
    console.log(error);
    alert('failed to load genders');
  })
  
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

}