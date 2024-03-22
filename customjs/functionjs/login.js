$(document).ready(function(){
  $('#loginForm').submit(function(event){
      event.preventDefault();

      var globalURL = "http://localhost:8080";
      
      var email = $('#email').val();
      var password = $('#password').val();
      
      var loginData = {
          "email": email,
          "password": password
      };
      
      $.ajax({
          type: "POST",
          url: globalURL+"/auth/login",
          contentType: "application/json",
          data: JSON.stringify(loginData),
          success: function(response){
              // Handle successful login response
              $('#response').text(response.statusCode);
              if (response.status === "00") {

                sessionStorage.setItem('globalUrl', globalURL);
                sessionStorage.setItem('userRoleId', response.userrole);
                sessionStorage.setItem('token', response.token);
                sessionStorage.setItem('userdata', response.userdata);
                sessionStorage.setItem('logedin', "logedin");

                if(response.userrole === 1){

                  var arrayList = ["reports.html","book-appoinment.html"];
                  var jsonString = JSON.stringify(arrayList);
                  sessionStorage.setItem("pageUrls", jsonString);
                  window.location.replace("index.html");

                }else if(response.userrole === 2){
                  window.location.replace("admin/admin.html");
                }else if(response.userrole === 3){
                  var arrayList = ["admin/admin.html","admin/create-reports.html","admin/view-reports.html",
                  "admin/submit-report-for-appoinment.html","admin/user-registration.html"];
                  var jsonString = JSON.stringify(arrayList);
                  sessionStorage.setItem("pageUrls", jsonString);
                  window.location.replace("admin/admin.html");
                }

              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Login Error!',
                  text: response.statusCode,
                  confirmButtonText: 'OK'
                }).then(function(result) {
                  // Reload the page and clear the form fields
                  location.reload();
                });
              }
          },
          error: function(xhr, textStatus, errorThrown){
              // Handle error response
              $('#response').text("Error: " + xhr.responseText);
          }
      });
  });
});