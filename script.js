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

