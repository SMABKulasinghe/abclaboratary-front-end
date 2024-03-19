document.addEventListener('DOMContentLoaded', function () {
  
    var pageUrls = sessionStorage.getItem("pageUrls");
    if(pageUrls != null){
      console.log("pageUrls",pageUrls);
      var pageUrlsArrayList = JSON.parse(pageUrls);
      var currentPage = "admin/view-reports.html";
      var isPageInArray = pageUrlsArrayList.includes(currentPage);
      console.log("isPageInArray",isPageInArray);
      if(!isPageInArray || pageUrls==null){
        window.location.replace("../login.html");
      }
    }else{
      window.location.replace("../login.html");
    }
    
});

// viewReportsTable = undefined;
// 	console.log("Ready");
// 	viewReports();

// $(document).ready(function() {
	
// 	viewReportsTable = undefined;
// 	console.log("Ready");
// 	viewReports();
	
// });

// function viewReports(){
//   var token = sessionStorage.getItem('token');
//   var globalUrl = sessionStorage.getItem('globalUrl');
//   	console.log("viewReports");
// 	if(viewReportsTable == undefined){
// 		console.log("viewReports2");
// 		viewReportsTable = $('#reportTables').DataTable({
// 			processing: true,
// 			serverSide: true,
// 			responsive: true,
// 			ajax: {
// 			   	url:globalUrl+'/report/get-all-reports',
// 			    type: 'GET',
// 			    headers: { 'Authorization': 'Bearer ' + token },
// 			},
// 			columns: [
// 					 {"data":"reportName"},
// 					 {"data":"reportDescription"},
// 					 {"data":"reportPreperation"},
// 			    {"data":"reportStatus"},
					
			
			   
// 			     ],
// 			language:{
// 				emptyTable: "You have no other tenders to submit"
// 			},
			
			
// 		});
// 		console.log("Programe");
// 	}else{
// 		viewReportsTable.ajax.url(globalUrl+'/report/get-all-reports').load();
// 	}
// }

$(document).ready(function() {
	
	viewreports();
	
});
function viewreports() {
  // Your code to handle form data

  var token = sessionStorage.getItem('token');
  var globalUrl = sessionStorage.getItem('globalUrl');
  console.log(globalUrl);
  console.log(token);
  $.ajax({
    type: 'GET',
    url: globalUrl+'/report/get-all-reports', // Change this to your registration endpoint URL
    
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
          if(response.table[i].status == 9){
            name="Pending"
            tag = `<label class="badge badge-danger">${name} </label>`
          }else if(response.table[i].status == 8){
            name="Deactive"
            tag = `<label class="badge badge-warning">${name} </label>`
          }else if(response.table[i].status == 7){
            name="Active"
            tag = `<label class="badge badge-success">${name} </label>`
          }
					
					row = `<tr>
								<td>${[n]}</td>
								<td>${response.table[i].reportName } </td>
								<td>${response.table[i].reportDescription } </td>
                <td>${response.table[i].preperation } </td>
								<td>${tag}</td>
                <td><button class="btn btn-primary mr-2" onclick="showParameters(${response.table[i].id})">Show More (Parameter List)</button></td>

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
    url: globalUrl + '/report/get-parameter-for/'+id, // URL for the new endpoint
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

        let row = "";
				let table = "";
				$("#parameterTable td").remove();
        var n = 1;
        for(var i in response.table){

          var name="Pending";
          var tag = "";
          if(response.table[i].status == 9){
            name="Pending"
            tag = `<label class="badge badge-danger">${name} </label>`
          }else if(response.table[i].status == 8){
            name="Deactive"
            tag = `<label class="badge badge-warning">${name} </label>`
          }else if(response.table[i].status == 7){
            name="Active"
            tag = `<label class="badge badge-success">${name} </label>`
          }
					
					row = `<tr>
								<td>${[n]}</td>
								<td>${response.table[i].parameterName } </td>
								<td>${response.table[i].parameterDescription } </td>
                <td>${response.table[i].maleRange } </td>
                <td>${response.table[i].femaleRange } </td>
								

							</tr>`
					table = $('#parameterTable').find('tbody')
					table.append(row);
					
					n++;
				}

        let paraName
        paraName = $('#modalCustom').find('h5')
				paraName.append("Report Name: "+response.reName);

        let paraDes
        paraDes = $('#modalCustom').find('p')
				paraDes.append("Report Description: "+response.reDes);

        let modalFooter
        modalFooter = $('#modalFooter').find('div')
        if(response.reStatus==7){
          modalFooter.append(`<button class="btn btn-warning mr-2" onclick="approveOrReject(8,${response.reId })">Reject Report</button>`);
        }else if(response.reStatus==8){
          modalFooter.append(`<button class="btn btn-success mr-2" onclick="approveOrReject(7,${response.reId })">Approve Report</button>`);
        }else if(response.reStatus==9){
          modalFooter.append(`<button class="btn btn-success mr-2" onclick="approveOrReject(7,${response.reId })">Approve Report</button>
          <button class="btn btn-warning mr-2" onclick="approveOrReject(8,${response.reId })">Reject Report</button>`);
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

function approveOrReject(id,reId) {
  console.log(id);

  var token = sessionStorage.getItem('token');
  var globalUrl = sessionStorage.getItem('globalUrl');

  $.ajax({
    type: 'GET',
    url: globalUrl + '/report/approve-or-reject-report/'+id+'/'+reId, // URL for the new endpoint
    contentType: 'application/json',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    },
    success: function(response) {
      if(response.statusCode=='00'){
        Swal.fire({
          icon: 'success',
          title: 'Update successfully!',
          // text: 'Report was Approved.',
          confirmButtonText: 'OK'
        }).then(function(result) {
          // Reload the page and clear the form fields
          location.reload();
        });

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          // text: response.status,
          confirmButtonText: 'OK'
        }).then(function(result) {
          // Reload the page and clear the form fields
          location.reload();
        });
      }
    },
    error: function(xhr, status, error) {
        console.log("Second GET error");
    }
  });
}