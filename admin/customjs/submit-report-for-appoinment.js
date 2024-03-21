document.addEventListener('DOMContentLoaded', function () {
  
    var pageUrls = sessionStorage.getItem("pageUrls");
    if(pageUrls != null){
      console.log("pageUrls",pageUrls);
      var pageUrlsArrayList = JSON.parse(pageUrls);
      var currentPage = "admin/submit-report-for-appoinment.html";
      var isPageInArray = pageUrlsArrayList.includes(currentPage);
      console.log("isPageInArray",isPageInArray);
      if(!isPageInArray || pageUrls==null){
        window.location.replace("../login.html");
      }
    }else{
      window.location.replace("../login.html");
    }
    
});

$(document).ready(function() {
	
  var token = sessionStorage.getItem('token');
  var globalUrl = sessionStorage.getItem('globalUrl');
  var userid = sessionStorage.getItem('userdata');
  
	$.ajax({
    type: 'GET',
    url: globalUrl+'/appoinment/get-appoinment-list', // Change this to your registration endpoint URL
    
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
        let docrow = "";
				let docDrop = "";
				$("#doctorlist option").remove();
        var n = 1;
        docDrop = $('#appoinmentdiv').find('select')
				docDrop.append(`<option value="0">Select a Appoinment</option>`);
        for(var i in response.appoinmentlist){
					
					docrow = `
                <option value="${response.appoinmentlist[i].id}">${response.appoinmentlist[i].appoinmentno} - ${response.appoinmentlist[i].username} - ${response.appoinmentlist[i].reportname}</option>`
          docDrop = $('#appoinmentdiv').find('select')
					docDrop.append(docrow);
					
					n++;
				}

    },
    error: function(xhr, status, error) {
      console.log("Get error");
    }
  });

  $('#submitlabreportform').submit(function(event) {
    event.preventDefault();

    var token = sessionStorage.getItem('token');
    var globalURL = sessionStorage.getItem('globalUrl');
    
    var formDataArray = [];
    $('#formdiv').find('input').each(function() {
      var inputId = $(this).attr('id');
      var inputValue = $(this).val();
      formDataArray.push({ id: inputId, value: inputValue });
    });

    console.log("formDataArray",formDataArray);

    var formData = {
      appoinmentid: $('#appoinmentid').val(),
      formDataArray: formDataArray,
    };
    
    $.ajax({
        type: 'POST',
        url: globalURL+'/report/submit-report-for-appoinment', // Change this to your registration endpoint URL
        data: JSON.stringify(formData),
        contentType: 'application/json',
        dataType: 'json',
        success: function(response) {
            if(response.statusCode=='00'){
              Swal.fire({
                icon: 'success',
                title: 'Report data added Successfully!',
                // text: 'Your registration was successful.',
                confirmButtonText: 'OK'
              }).then(function(result) {
                // Reload the page and clear the form fields
                location.reload();
              });

            }else{
              Swal.fire({
                icon: 'error',
                title: 'Report data added fail!',
                // text: response.status,
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
              // title: 'Registration Error!',
              // text: 'An error occurred during registration.',
              confirmButtonText: 'OK'
            });
        }
    });
});

	
});

function showAppoinmentReport(){

  console.log("$('#appoinmentlist').val()",$('#appoinmentlist').val());

  var appoinmentListVal = "";

    if ($('#appoinmentlist').val()==0) {
      Swal.fire({
          icon: 'error',
          title: 'Select Appoinment!',
          text: 'Please select a appoinment.',
          confirmButtonText: 'OK'
      });
      return; 
    }else{
      appoinmentListVal = $('#appoinmentlist').val();
    }

  var token = sessionStorage.getItem('token');
  var globalUrl = sessionStorage.getItem('globalUrl');
  appoinmentListVal = $('#appoinmentlist').val();
  $.ajax({
    type: 'GET',
    url: globalUrl + '/appoinment/get-appoinment-form/'+appoinmentListVal, // URL for the new endpoint
    contentType: 'application/json',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
    },
    success: function(response) {
      console.log(response);

      // $("#bigdiv div").remove();
      // $("#bigdiv h4").remove();
      // $("#bigdiv p").remove();
      // $("#bigdiv form").remove();

			$("#formdiv div").remove();
      $("#formdiv label").remove();
      $("#formdiv input").remove();
      $("#formdiv button").remove();

      
      var n = 1;

      $('#personaldetails').append(`<p class="card-description">
      Patient Personal Details and Appoinment Details
      </p>
      <div class="form-group">
      <label for="exampleInputName1">Appoinment No</label>
      <input type="text" class="form-control" id="exampleInputName1" placeholder="Name" value="${response.appoinmentno}" disabled>
      </div>
      <div class="form-group">
      <label for="exampleInputName1">Patient Name</label>
      <input type="text" class="form-control" id="exampleInputName1" placeholder="Name" value="${response.patientname}" disabled>
      </div>
      <div class="form-group">
      <label for="exampleInputName1">Patient DOB</label>
      <input type="text" class="form-control" id="exampleInputName1" placeholder="Name" value="${response.patientdob}" disabled>
      </div>
      <input type="hidden" id="appoinmentid" name="appoinmentid" value="${response.appoinmentid}" disabled>
      <input type="hidden" id="reportid" name="reportid" value="${response.reportid}" disabled>
      <input type="hidden" id="userid" name="userid" value="${response.userid}" disabled>
      <input type="hidden" id="doctorid" name="doctorid" value="${response.doctorid}" disabled>`)
      
      $('#formdiv').append(`<p class="card-description">
      Fill the Report details as your lab results
      </p>`)
      for(var i in response.reportdetails){
					
				$('#formdiv').append(`<div class="form-group" id="reportdetailsdiv${response.reportdetails[i].reportdetailid}" name="reportdetailsdiv${response.reportdetails[i].reportdetailid}">
          <label for="exampleInputName1">${response.reportdetails[i].reportdetailname}</label>
          <input type="text" class="form-control" id="${response.reportdetails[i].reportdetailid}" name="${response.reportdetails[i].reportdetailid}" placeholder="Enter the ${response.reportdetails[i].reportdetailname}" required>
        </div>`)
					
				n++;
			}
      $('#formdiv').append(`<button type="submit" class="btn btn-primary mr-2">Submit</button>
      <button class="btn btn-light">Cancel</button>`)
    },
    error: function(xhr, status, error) {
        console.log("Second GET error");
    }
  });

}