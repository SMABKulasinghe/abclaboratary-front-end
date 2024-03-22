document.addEventListener('DOMContentLoaded', function () {
  
    var pageUrls = sessionStorage.getItem("pageUrls");
    if(pageUrls != null){
      console.log("pageUrls",pageUrls);
      var pageUrlsArrayList = JSON.parse(pageUrls);
      var currentPage = "admin/user-registration.html";
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
  $('#userregistration').submit(function(event) {
      event.preventDefault();

      var token = sessionStorage.getItem('token');
      var globalURL = sessionStorage.getItem('globalUrl');
      
      var formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        dob: $('#dob').val(),
        nic: $('#nic').val(),
        telephone: $('#telephone').val(),
        gender: $('#gender').val(),
        registrationno: $('#registrationno').val(),
        position: $('#position').val(),
          
      };

     
      $.ajax({
          type: 'POST',
          url: globalURL+'/auth/register-user', // Change this to your registration endpoint URL
          data: JSON.stringify(formData),
          contentType: 'application/json',
          dataType: 'json',
          success: function(response) {
              if(response.statusCode=='00'){
                Swal.fire({
                  icon: 'success',
                  title: 'Registration Successful!',
                  text: 'Your registration was successful.',
                  confirmButtonText: 'OK'
                }).then(function(result) {
                  // Reload the page and clear the form fields
                  location.reload();
                });

              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Registration Error!',
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
                title: 'Registration Error!',
                text: 'An error occurred during registration.',
                confirmButtonText: 'OK'
              });
          }
      });
  });
});
