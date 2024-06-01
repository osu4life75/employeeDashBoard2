var employeeID;
var updateEmployeeGender;
var updateEmployeeState;
var updateEmployeeCountry;
var GenderID;



function getEmployeeData(uuid) {
 fetch("http://localhost:3000/getSpecificEmployee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ UUID: uuid }),
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(function (data) {
      setEmployeeDataOnElements(data.employeeObj);
      
    })
      
    .catch(function (error) {
      console.log(error);
      alert("something went wrong in getSpecificEmployee");
    });
   
}


function getGenders() {
  fetch("http://localhost:3000/getGenders")
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(function (data) {
      console.log("🚀 ~ data:", data)
      updateEmployeeGender = data.genders;
      let genderSelect = document.getElementById("genders");
      for (let i = 0; i < updateEmployeeGender.length; i++) {
        var option = new Option(
          updateEmployeeGender[i].gender,
          updateEmployeeGender[i].id
        );
        genderSelect.add(option);
      }
    })
    .then(function (){
      //get id from query params and pass to getEOMData()
      const urlParams = new URLSearchParams(window.location.search);
      employeeID = urlParams.get("id");
      
      getEmployeeData(employeeID);
    })
    .catch(function (error) {
      console.log(error);
      alert("failed to load genders");
    })
    
}

function setEmployeeDataOnElements(employee) {
  document.getElementById("genders").value = employee.GenderID;
  document.getElementById("picture").src = `${employee.Picture}`;
  document.getElementById("firstName").value = `${employee.FirstName}`;
  document.getElementById("lastName").value = `${employee.LastName}`;
  document.getElementById("email").value = `${employee.Email}`;
  document.getElementById("address").value = `${employee.Address}`;
  document.getElementById("city").value = `${employee.City}`;
  document.getElementById("state").value = employee.State;
  document.getElementById("zip").value = `${employee.Zipcode}`;
  document.getElementById("country").value = employee.Country;
  document.getElementById("dob").value = `${formatDate(new Date(employee.DOB))}`;
  document.getElementById("phone").value = `${employee.Phone_Number}`;
  



  // Need to get selected gender obj {label:"Male", value:1}
  // attempt utils file with live server
}

window.onload = function () {
  console.log("employee.js Window is finshied loading!");
  getStates();
  getGenders();
  getCountries();
 
 
};

  
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
            
            updateEmployeeCountry[i].country, updateEmployeeCountry[i].id
            
          );
          countrySelect.add(option);
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("Failed to load countries");
      });
  }


  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is fully loaded. Initializing...");

  });



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

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  

 
  function submitForm() {
    let updatedEmployeeObj = {
        FirstName: document.getElementById("firstName").value,
        LastName: document.getElementById("lastName").value,
        GenderID: document.getElementById("genders").value,
        Address: document.getElementById("address").value,
        City: document.getElementById("city").value,
        State: document.getElementById("state").value,
        Zipcode: document.getElementById("zip").value,
        Email: document.getElementById("email").value,
        DOB: document.getElementById("dob").value,
        Phone_Number: document.getElementById("phone").value,
        Country: document.getElementById("country").value,
        UUID: employeeID, // Assuming employeeID is defined elsewhere
    };
    console.log("🚀 ~ submitForm ~ updatedEmployeeObj:", updatedEmployeeObj)
    

    fetch("http://localhost:3000/updateEmployee", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployeeObj),
    })
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Network response was not ok.");
    })
    .then(function (data) {
        if (data.success) {
            alert(data.message);
            //get id from query params and pass to getEOMData()
            getEmployeeData(employeeID);
        } else {
            alert(data.message);
        }
    })
    .catch(function (error) {
        console.log(error);
        alert("Something went wrong");
    });
}

function deleteEmployee() {
  console.log('employeeID in deleteEmployee()', typeof employeeID)
  fetch("http://localhost:3000/deleteButton", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({employeeID : employeeID}),
  })
  .then(function (response) {      
      if (response.ok) {
          return response.json();
      }
      throw new Error("Network response was not ok.");
  })
  .then(function (data) {
      if (data.success) {
          alert(data.message);
          window.location.href = 'file:///Users/georgelynch/Documents/GitHub/employeeDashBoard2/index.html'
      } else {
          alert(data.message);
      }
  })
  .catch(function (error) {
      console.log(error);
      alert("Something went wrong");
  });
 
}






    
 
  
 

 

 
  
