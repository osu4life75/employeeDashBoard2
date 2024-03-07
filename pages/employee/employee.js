var employeeID;
var updateEmployeeGender;
var updateEmployeeState;
var updateEmployeeCountry;

function getEmployeeData(uuid) {
  console.log("UUID in getEOMData", uuid);

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
      console.log("data returned in getSpecificEmployee", data.employeeObj);
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
      console.log("response in getGenders", response);
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(function (data) {
      console.log("genders", data.genders);
      updateEmployeeGender = data.genders;
      let genderSelect = document.getElementById("genders");
      for (let i = 0; i < updateEmployeeGender.length; i++) {
        var option = new Option(
          updateEmployeeGender[i].gender,
          updateEmployeeGender[i].id
        );
        genderSelect.add(option);
      }
      getEmployeeData(employeeID);
    })
    .catch(function (error) {
      console.log(error);
      alert("failed to load genders");
    });
}

function setEmployeeDataOnElements(employee) {
  console.log("employee in setEmployeeDataOnElements", employee);
  //get elements
  document.getElementById("picture").src = `${employee.Picture}`;
  document.getElementById("firstName").value = `${employee.FirstName}`;
  document.getElementById("lastName").value = `${employee.LastName}`;
  document.getElementById("email").value = `${employee.Email}`;
  document.getElementById("address").value = `${employee.address}`;
  document.getElementById("city").value = `${employee.City}`;
  document.getElementById("state").value = employee.state;
  document.getElementById("zip").value = `${employee.zip_code}`;
  document.getElementById("country").value = employee.Country;
  document.getElementById("dob").value = `${formatDate(new Date(employee.DOB))}`;
  document.getElementById("phone").value = `${employee.phone_number}`;
  document.getElementById("genders").value = employee.GenderID;

  // Need to get selected gender obj {label:"Male", value:1}
  // attempt utils file with live server
}

window.onload = function () {
  console.log("employee.js Window is finshied loading!");
  getStates();
  getGenders();

  //get id from query params and pass to getEOMData()
  const urlParams = new URLSearchParams(window.location.search);
  employeeID = urlParams.get("id");
  
  getEmployeeData(employeeID);
  

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
        console.log(
          "🚀 ~ .then ~ updateEmployeeCountry:",
          updateEmployeeCountry
        );
       
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


  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is fully loaded. Initializing...");

  });

  getCountries();

  function getStates() {
    fetch("http://localhost:3000/getStates")
      .then(function (response) {
        console.log("response in getStates", response);
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
    console.log("🚀 ~ formatDate ~ formatDate:", formatDate)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  

  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is fully loaded. Initializing...");
  
    // Add event listener for form submission
    document.getElementById("myButton").addEventListener("click", submitForm);
    console.log('button clicked', submitForm);
  });

  // This is where the magic happens
  function submitForm(employee) {
    console.log("Gn2");
     let updatedEmployeeObj = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      gender: document.getElementById("genders").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zip_code: document.getElementById("zip").value,
      email: document.getElementById("email").value,
      dob: document.getElementById("dob").value,
      phone_number: document.getElementById("phone").value,
      UUID: employeeID,
    };
     console.log("🚀 ~ submitForm ~ updatedEmployeeObj:", updatedEmployeeObj)

   // Convert written gender to numerical key
  const genderMap = {
    'Male': 1,
    'Female': 2,
    'Other': 3
  };
updatedEmployeeObj.gender = genderMap[updatedEmployeeObj.gender];

// Send the request to the server
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
  } else {
    alert(data.message);
  }
})
.catch(function (error) {
  console.log(error);
  alert("something went wrong");
});

    
 
  
  function getGenderString(genderID) {
    console.log("gender id", genderID);
    console.log("updateEmployee", updateEmployeeGender);
    let genderString;
    for (let i = 0; i < updateEmployeeGender.length; i++) {
      console.log(updateEmployeeGender[i]);
      if (updateEmployeeGender[i].id === genderID) {
        genderString = updateEmployeeGender[i].gender;
        break;
      }
    }
    return genderString;
  }

  function getStateID(stateid) {
    console.log("updateEmployeeState", updateEmployeeState);
    let stateName;
    for (let i = 0; i < updateEmployeeState.length; i++) {
      console.log(updateEmployeeState[i]);
      if (updateEmployeeState[i].id === stateid) {
        stateName = updateEmployeeState[i].states;
        break;
      }
    }
    return stateName;
  }

  function getCountryID(countryid) {
    let countryName;
    for (let i = 0; i < updateEmployeeCountry.length; i++) {
      console.log(updateEmployeeCountry[i]);
      if (updateEmployeeCountry[i].id === countryid) {
        countryName = updateEmployeeCountry[i].label;
        break;
      }
    }
    return countryName;
  }

 

  function deleteEmployee() {
    console.log("G2N", employeeID);
    fetch("http://localhost:3000/deleteButton", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ employeeID: employeeID }),
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
        } else {
          alert(data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("something went wrong");
      });
  }

};
  
