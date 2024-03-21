document.addEventListener('DOMContentLoaded', function () {
  
  var pageUrls = sessionStorage.getItem("pageUrls");
  if(pageUrls != null){
    console.log("pageUrls",pageUrls);
    var pageUrlsArrayList = JSON.parse(pageUrls);
    var currentPage = "reports.html";
    var isPageInArray = pageUrlsArrayList.includes(currentPage);
    console.log("isPageInArray",isPageInArray);
    if(!isPageInArray || pageUrls==null){
      window.location.replace("login.html");
    }
  }else{
    window.location.replace("login.html");
  }
  
});

$(document).ready(function() {
	
	viewappoinments();
	
});
function viewappoinments() {
  // Your code to handle form data

  var token = sessionStorage.getItem('token');
  var globalUrl = sessionStorage.getItem('globalUrl');
  var userdata = sessionStorage.getItem('userdata');

  console.log(globalUrl);
  console.log(token);
  $.ajax({
    type: 'GET',
    url: globalUrl+'/appoinment/get-appoinment-details-for-patient/'+userdata, // Change this to your registration endpoint URL
    
    contentType: 'application/json',
    dataType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
     
    },
    // authorization: 'Bearer ' + token,

    success: function(response) {
        
        console.log("Get success");
        console.log(response);
        let row = "";
				let table = "";
				$("#reportTables td").remove();
        var n = 1;
        for(var i in response.table){

          var name="Pending";
          var tag = "";
          if(response.table[i].status == 16){
            name="Pending Results"
            tag = `<label class="badge-lg badge-danger">${name} </label>`
          }else if(response.table[i].status == 15){
            name="Active"
            tag = `<button class="btn btn-primary mr-2" onclick="showParameters(${response.table[i].appoinmentid})">View Report</button>`
          }
					
					row = `<tr>
								<td>${[n]}</td>
								<td>${response.table[i].appoinmentno } </td>
                <td>${response.table[i].reportname } </td>
                <td>${response.table[i].reportpre } </td>
								<td>${response.table[i].appoinmentdate } </td>
                <td>${tag} </td>
							</tr>`
					table = $('#reportTables').find('tbody')
					table.append(row);
					
					n++;
				}
    },
    error: function(xhr, status, error) {
      console.log("Get error");
    }
  });

}

function showParameters(id){

  console.log(id);

  var token = sessionStorage.getItem('token');
  var globalUrl = sessionStorage.getItem('globalUrl');

  $.ajax({
    type: 'GET',
    url: globalUrl + '/appoinment/get-report-submitted-details/'+id, // URL for the new endpoint
    contentType: 'application/json',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    },
    success: function(response) {
        // Handle the response from the second AJAX call
        console.log("Second GET success");
        console.log(response);

        var modal = document.getElementById("myModal");
        modal.style.display = "block";

        $("#for_pdf lebal").remove();

        $('#for_pdf').append(`<lebal>Report Name - ${response.reportname}</lebal><br>
        <lebal>Patient Name - ${response.patientname}</lebal>`)

        let row = "";
				let table = "";
				$("#parameterTable td").remove();
        
        var n = 1;

        for(var i in response.table){
					
					row = `<tr>
								<td>${[n]}</td>
								<td>${response.table[i].parametername } </td>
								<td>${response.table[i].parameterscale } </td>
                <td>${response.table[i].gender } </td>
                <td>${response.table[i].result } </td>
								

							</tr>`
					table = $('#parameterTable').find('tbody')
					table.append(row);
					
					n++;
				}

    
    },
    error: function(xhr, status, error) {
        console.log("Second GET error");
    }
  });

}

function closeModel() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function downloadPdf() {
  var sTable = document.getElementById('for_pdf').innerHTML;

  var style = "<style>";
  style = style + "table {width: 100%;font: 17px Calibri;}";
  style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
  style = style + "padding: 2px 3px;}";
  style = style + "</style>";
//text-align: center;
  // CREATE A WINDOW OBJECT.
  var win = window.open('', '', 'height=700,width=700');

  win.document.write('<html><head>');
  win.document.write('<title>Report Details</title>');   // <title> FOR PDF HEADER.
  win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
  win.document.write('</head>');
  win.document.write('<body>');
  win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
  win.document.write('</body></html>');

  win.document.close(); 	// CLOSE THE CURRENT WINDOW.

  win.print();    // PRINT THE CONTENTS.
}

function testemail(){

  var token = sessionStorage.getItem('token');
  var globalUrl = sessionStorage.getItem('globalUrl');

  $.ajax({
    type: 'GET',
    url: globalUrl + '/appoinment/email-test',
    contentType: 'application/json',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    },
    success: function(response) {

    
    },
    error: function(xhr, status, error) {
        console.log("Second GET error");
    }
  })

}
