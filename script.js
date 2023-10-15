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
        totalEmployees(data);
        maleToFemaleRatio(data);
        percLiveInUS(data);

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

function totalEmployees(allEmployees) {
  const totalNumberOFEmployees = allEmployees.length;
  let totalEmployees=document.getElementById('totalEmployees');
  totalEmployees.innerText = `${allEmployees.length}`;
  console.log('total employees',totalNumberOFEmployees);
}

function maleToFemaleRatio(allEmployees) {
 //loop through allEmployees it's an array
 // for loop for ever iteration you will find a gender
 //need two variables male and female count
 
  let femaleCount = 0;
  let maleCount = 0;
  for (let i = 0; i < allEmployees.length; i++) {
    const element = allEmployees[i];
    console.log('element', element);
    if (element.gender === 'male') {
      maleCount = maleCount + 1;
    }else{
      femaleCount = femaleCount + 1;
    }
  }
  console.log('totalFemandMale',femaleCount, maleCount);
  let ratio = document.getElementById('maleToFemaleRatio');
  ratio.innerText = maleCount + " /" + femaleCount;
  
}
function percLiveInUS(allEmployees) {
 //total employess 23 how many live in US?
 //divide total US employess by allEmployees * by 100
  
  let usResident = 0;
  for (let i = 0; i < allEmployees.length; i++) {
    const element = allEmployees[i];
    if(element.location.country === 'United States'){
      usResident = usResident +1;
    
    }
  
  } 
  console.log('us residents', usResident);
  let percentage = ((usResident/allEmployees.length) * 100).toFixed(2); 
  console.log('percentage', percentage);
 // let percentageElement = document.getElementById('percLiveInUS');
 // percentageElement.innerText = percentage + '%'; 
  document.getElementById('percLiveInUS').innerText = percentage + '%';
}

