document.addEventListener('DOMContentLoaded', function () {
  
  var pageUrls = sessionStorage.getItem("pageUrls");
  if(pageUrls != null){
    console.log("pageUrls",pageUrls);
    var pageUrlsArrayList = JSON.parse(pageUrls);
    var currentPage = "book-appoinment.html";
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
	
  var token = sessionStorage.getItem('token');
  var globalUrl = sessionStorage.getItem('globalUrl');
  var userid = sessionStorage.getItem('userdata');
	$.ajax({
    type: 'GET',
    url: globalUrl+'/report/get-doctor-and-report-list', // Change this to your registration endpoint URL
    
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
        docDrop = $('#doctorsdiv').find('select')
				docDrop.append(`<option value="0">Select a Doctor</option>`);
        for(var i in response.doctorList){
					
					docrow = `
                <option value="${response.doctorList[i].id}">${response.doctorList[i].doctorName} - ${response.doctorList[i].doctorSpecilization}</option>`
          docDrop = $('#doctorsdiv').find('select')
					docDrop.append(docrow);
					
					n++;
				}

        let rerow = "";
				let reDrop = "";
				$("#reportlist option").remove();
        var n = 1;
        reDrop = $('#reportdiv').find('select')
				reDrop.append(`<option value="0">Select a Report</option>`);
        for(var i in response.reportList){
					
					rerow = `
                <option value="${response.reportList[i].id}">${response.reportList[i].reportName} - ${response.reportList[i].reportDescription}</option>`
          reDrop = $('#reportdiv').find('select')
					reDrop.append(rerow);
					
					n++;
				}

        $('#useriddiv').append(`<input type="hidden" id="userid" name="userid" value="${userid}"/>`)

        // for (let item of res.responseJSON) {
        //   $('#eligible_category').append(new Option(item.eligibleCategortName, item.eligibleCategortID))
        // }
    },
    error: function(xhr, status, error) {
      console.log("Get error");
    }
  });


  $('#bookAppinementForm').submit(function(event) {
    event.preventDefault();

    var globalURL = sessionStorage.getItem('globalUrl');

    console.log("$('#doctorlist').val()",$('#doctorlist').val());
    console.log("$('#reportlist').val()",$('#reportlist').val());

    if ($('#doctorlist').val()==0) {
      Swal.fire({
          icon: 'error',
          title: 'Select Doctor!',
          text: 'Please select a doctor.',
          confirmButtonText: 'OK'
      });
      return; 
    }

    if ($('#reportlist').val()==0) {
      Swal.fire({
          icon: 'error',
          title: 'Select Report!',
          text: 'Select the report do you want to get.',
          confirmButtonText: 'OK'
      });
      return; 
    }

    var formData = {
      doctorid: $('#doctorlist').val(),
      reportid: $('#reportlist').val(),
      appoinmentDate: $('#appoinmentDate').val(),
      userid: $('#userid').val(),
    };
    
    $.ajax({
        type: 'POST',
        url: globalURL+'/appoinment/book-appoinment', // Change this to your registration endpoint URL
        data: JSON.stringify(formData),
        contentType: 'application/json',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
         
        },
        success: function(response) {
            if(response.statusCode=='00'){
              Swal.fire({
                icon: 'success',
                title: 'Appoinment add Successful!',
                // text: 'Your registration was successful.',
                confirmButtonText: 'OK'
              }).then(function(result) {
                // Reload the page and clear the form fields
                location.reload();
              });

            }else{
              Swal.fire({
                icon: 'error',
                // title: 'Registration Error!',
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
              title: 'Error!',
              // text: 'An error occurred during registration.',
              confirmButtonText: 'OK'
            });
        }
    });
  });
	
});
