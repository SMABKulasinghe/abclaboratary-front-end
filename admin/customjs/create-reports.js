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
  const paramName = $('#reportnamediv').find('input').val().trim();	
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
  document.getElementById('reportname').value = '';
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
  