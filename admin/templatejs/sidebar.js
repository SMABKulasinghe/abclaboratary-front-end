$("#sidebar").append( '<nav class="sidebar sidebar-offcanvas" id="sidebar">'+
'<ul class="nav">'+
  '<li class="nav-item">'+
    '<a class="nav-link" href="admin.html">'+
      '<i class="icon-grid menu-icon"></i>'+
      '<span class="menu-title">Dashboard</span>'+
    '</a>'+
  '</li>'+
  '<li class="nav-item">'+
    '<a class="nav-link" data-toggle="collapse" href="#reportsspan" aria-expanded="false" aria-controls="reportsspan">'+
      '<i class="icon-layout menu-icon"></i>'+
      '<span class="menu-title">Reports</span>'+
      '<i class="menu-arrow"></i>'+
    '</a>'+
    '<div class="collapse" id="reportsspan">'+
      '<ul class="nav flex-column sub-menu">'+
        '<li class="nav-item"> <a class="nav-link" href="create-reports.html">Create Reports</a></li>'+
        '<li class="nav-item"> <a class="nav-link" href="view-reports.html">View Reports</a></li>'+
      '</ul>'+
    '</div>'+
  '</li>'+
  '<li class="nav-item">'+
    '<a class="nav-link" data-toggle="collapse" href="#appoinmentspan" aria-expanded="false" aria-controls="appoinmentspan">'+
      '<i class="icon-layout menu-icon"></i>'+
      '<span class="menu-title">Appoinments</span>'+
      '<i class="menu-arrow"></i>'+
    '</a>'+
    '<div class="collapse" id="appoinmentspan">'+
      '<ul class="nav flex-column sub-menu">'+
        '<li class="nav-item"> <a class="nav-link" href="#">Check Appoinments</a></li>'+
        '<li class="nav-item"> <a class="nav-link" href="submit-report-for-appoinment.html">Submit Reports for <br>Appoinment</a></li>'+
      '</ul>'+
    '</div>'+
  '</li>'+
'</ul>'+
'</nav>');