document.addEventListener('DOMContentLoaded', function () {
  
    var pageUrls = sessionStorage.getItem("pageUrls");
    if(pageUrls != null){
      console.log("pageUrls",pageUrls);
      var pageUrlsArrayList = JSON.parse(pageUrls);
      var currentPage = "admin/create-reports.html";
      var isPageInArray = pageUrlsArrayList.includes(currentPage);
      console.log("isPageInArray",isPageInArray);
      if(!isPageInArray || pageUrls==null){
        window.location.replace("../login.html");
      }
    }else{
      window.location.replace("../login.html");
    }
    
});

function addParameter(){
  console.log("yeah");
  const paramName = $('#parameternamediv').find('input').val().trim();	
  const paramScales = $('#scalerangediv').find('select').val().trim();	
  const maleRange = $('#malerangediv').find('input').val().trim();	
  const femaleRange = $('#femalerangediv').find('input').val().trim();	
  console.log(paramName);
  if (paramName === '' || maleRange === '' || femaleRange === '') {
    Swal.fire({
      icon: 'error',
      title: 'Please fill all the Parameters!',
      // text: response.statusCode,
      confirmButtonText: 'OK'
    }).then(function(result) {
      return;
    });
    return;
  }

  // Create a new row in the table
  const tableBody = document.getElementById('parameterTableBody');
  const newRow = tableBody.insertRow();

  // Insert cells into the new row
  const paramNameCell = newRow.insertCell(0);
  const paramScalesCell = newRow.insertCell(1);
  const maleRangeCell = newRow.insertCell(2);
  const femaleRangeCell = newRow.insertCell(3);
  const removeButtonCell = newRow.insertCell(4);

  // Populate cells with the form field values
  paramNameCell.textContent = paramName;
  paramScalesCell.textContent = paramScales;
  maleRangeCell.textContent = maleRange;
  femaleRangeCell.textContent = femaleRange;

  // Clear the form fields after adding the row
  document.getElementById('parametername').value = '';
  document.getElementById('malerange').value = '';
  document.getElementById('femalerange').value = '';

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.className = 'btn btn-danger';
  removeButton.onclick = function() {
    // Get the index of the row to delete
    const rowIndex = newRow.rowIndex;
    // Delete the row from the table
    tableBody.deleteRow(rowIndex);
  };
  removeButtonCell.appendChild(removeButton);
}

function submitreport(){
  console.log("report",$('#reportnamediv').find('input').val());
  console.log("report",$('#reportdescriptiondiv').find('input').val());
  console.log("report",$('#reportpreperationdiv').find('input').val());
  const reportName = $('#reportnamediv').find('input').val();	
  const reportDescription = $('#reportdescriptiondiv').find('input').val();	
  const reportPreparation = $('#reportpreperationdiv').find('input').val();	

  if (reportName === '' || reportDescription === '' || reportPreparation === '') {
    Swal.fire({
      icon: 'error',
      title: 'Please fill Report Creation Process!',
      // text: response.statusCode,
      confirmButtonText: 'OK'
    }).then(function(result) {
      return;
    });
    return;
  }
  console.log("Form data===>>>",reportName,reportDescription,reportPreparation);
  // Validate table data
  var parameterRows = document.querySelectorAll("#parameterTableBody tr");
  var parameterData = [];
  var isValidTableData = false;
  parameterRows.forEach(function(row) {
    var cells = row.cells;
    var parameterName = cells[0].textContent.trim();
    var parameterScales = cells[1].textContent.trim();
    var maleRange = cells[2].textContent.trim();
    var femaleRange = cells[3].textContent.trim();
    
    if (parameterName !== '' || parameterScales !== '' || maleRange !== '' || femaleRange !== '') {
      isValidTableData = true; // At least one row is filled out
      parameterData.push({
        parameterName: parameterName,
        parameterScales: parameterScales,
        maleRange: maleRange,
        femaleRange: femaleRange
      });
    }
  });

  if (!isValidTableData) {
    Swal.fire({
      icon: 'error',
      title: 'Please fill Parameter Process!',
      // text: response.statusCode,
      confirmButtonText: 'OK'
    }).then(function(result) {
      return;
    });
    return;
  }
  console.log("Parameter data====>>>",parameterData);
  // Construct data object containing form and table data
  var logedin = sessionStorage.getItem('logedin');
  var formData = {
    reportName: reportName,
    reportDescription: reportDescription,
    reportPreparation: reportPreparation,
    parameterData: parameterData,
    logedin:logedin
  };

  // Pass formData to your JavaScript function
  yourFunctionName(formData);

}



// Example function to handle form data
function yourFunctionName(formData) {
  // Your code to handle form data
  console.log(formData);
  var token = sessionStorage.getItem('token');
  var globalUrl = sessionStorage.getItem('globalUrl');
  console.log(globalUrl);
  console.log(token);
  $.ajax({
    type: 'POST',
    url: globalUrl+'/report/create-reports', // Change this to your registration endpoint URL
    data: JSON.stringify(formData),
    contentType: 'application/json',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
     
    },
    // authorization: 'Bearer ' + token,

    success: function(response) {
        if(response.statusCode=='00'){
          Swal.fire({
            icon: 'success',
            title: 'Report Creation Successful!',
            text: 'Your Report was successful added.',
            confirmButtonText: 'OK'
          }).then(function(result) {
            // Reload the page and clear the form fields
            location.reload();
          });

        }else{
          Swal.fire({
            icon: 'error',
            title: 'Report Creation Error!',
            text: response.status,
            confirmButtonText: 'OK'
          }).then(function(result) {
            // Reload the page and clear the form fields
            location.reload();
          });
        }
        
    },
    error: function(xhr, status, error) {
        Swal.fire({
          icon: 'error',
          title: 'Report Creation Error!',
          text: 'An error occurred during registration.',
          confirmButtonText: 'OK'
        });
    }
  });

}
  