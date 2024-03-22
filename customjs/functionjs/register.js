$(document).ready(function() {
  $('#registrationForm').submit(function(event) {
      event.preventDefault();

      var token = sessionStorage.getItem('token');
      var globalURL = sessionStorage.getItem('globalUrl');
      
      var formData = {
          name: $('#name').val(),
          email: $('#email').val(),
          phone: $('#phone').val(),
          dob: $('#dob').val(),
          password: $('#password').val(),
          repassword: $('#repassword').val(),
          gender: $('#gender').val(),
          userRole: $('#userRole').val()
      };

      // Password verification validation
      if (formData.password !== formData.repassword) {
        Swal.fire({
            icon: 'error',
            title: 'Password Verification Failed!',
            text: 'The password and confirm password fields do not match.',
            confirmButtonText: 'OK'
        });
        return; // Stop form submission
    }
      
      $.ajax({
          type: 'POST',
          url: globalURL+'/auth/register-patient', // Change this to your registration endpoint URL
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
                  window.location.replace("login.html");
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
