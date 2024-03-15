$("#sidebar").append( '<nav class="sidebar sidebar-offcanvas" id="sidebar">'+
'<ul class="nav">'+
  '<li class="nav-item">'+
    '<a class="nav-link" href="admin.html">'+
      '<i class="icon-grid menu-icon"></i>'+
      '<span class="menu-title">Dashboard</span>'+
    '</a>'+
  '</li>'+
  '<li class="nav-item">'+
    '<a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">'+
      '<i class="icon-layout menu-icon"></i>'+
      '<span class="menu-title">Main menu</span>'+
      '<i class="menu-arrow"></i>'+
    '</a>'+
    '<div class="collapse" id="ui-basic">'+
      '<ul class="nav flex-column sub-menu">'+
        '<li class="nav-item"> <a class="nav-link" href="admin1.html">Buttons</a></li>'+
        '<li class="nav-item"> <a class="nav-link" href="admin2.html">Dropdowns</a></li>'+
        '<li class="nav-item"> <a class="nav-link" href="admin3.html">Typography</a></li>'+
      '</ul>'+
    '</div>'+
  '</li>'+
'</ul>'+
'</nav>');