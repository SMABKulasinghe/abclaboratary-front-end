$(document).ready(function() {
  // Check if sessionStorage token is null
  var token = sessionStorage.getItem('token');
  
  if (token === null) {
      // If token is null, show the login URL and hide the reports URL
      $("#menu").append('<header class="header_section">' +
          '<div class="container">' +
          '<nav class="navbar navbar-expand-lg custom_nav-container ">' +
          '<a class="navbar-brand" href="index.html">' +
          '<span>' +
          'ABC Laboratary' +
          '</span>' +
          '</a>' +

          '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">' +
          '<span class=""> </span>' +
          '</button>' +

          '<div class="collapse navbar-collapse" id="navbarSupportedContent">' +
          '<ul class="navbar-nav">' +
          '<li class="nav-item active">' +
          '<a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>' +
          '</li>' +
          '<li class="nav-item">' +
          '<a class="nav-link" href="doctors.html">Doctors</a>' +
          '</li>' +
          '<li class="nav-item">' +
          '<a class="nav-link" href="contact.html">Contact Us</a>' +
          '</li>' +
          '<li class="nav-item">' +
          '<a class="nav-link" href="login.html">Login</a>' +
          '</li>' +
          '</ul>' +
          '</div>' +
          '</nav>' +
          '</div>' +
          '</header>');
  } else {
      // If token is not null, show all URLs
      $("#menu").append('<header class="header_section">' +
          '<div class="container">' +
          '<nav class="navbar navbar-expand-lg custom_nav-container ">' +
          '<a class="navbar-brand" href="index.html">' +
          '<span>' +
          'ABC Laboratary' +
          '</span>' +
          '</a>' +

          '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">' +
          '<span class=""> </span>' +
          '</button>' +

          '<div class="collapse navbar-collapse" id="navbarSupportedContent">' +
          '<ul class="navbar-nav">' +
          '<li class="nav-item active">' +
          '<a class="nav-link" href="index.html">Home <span class="sr-only">(current)</span></a>' +
          '</li>' +
          '<li class="nav-item">' +
          '<a class="nav-link" href="reports.html">Reports</a>' +
          '</li>' +
          '<li class="nav-item">' +
          '<a class="nav-link" href="doctors.html">Doctors</a>' +
          '</li>' +
          '<li class="nav-item">' +
          '<a class="nav-link" href="contact.html">Contact Us</a>' +
          '</li>' +
          '<li class="nav-item">' +
          '<button class="btn btn-link nav-link logout-btn">Logout</button>' +
          '</li>' +
          '</ul>' +
          '</div>' +
          '</nav>' +
          '</div>' +
          '</header>');

          $(".logout-btn").click(function() {
            // Clear sessionStorage token
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('pageUrls');
            sessionStorage.removeItem('userRoleId');
            sessionStorage.removeItem('logedin');
            // Redirect to login page
            location.reload();
        });
  }
});
