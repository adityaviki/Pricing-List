// Global Variable to keep track of the package that is being currently displayed
// when viewing on smaller screens.
var ACTIVE_PACKAGE = ''

window.addEventListener('DOMContentLoaded', (event) => {
  var i, acc = document.getElementsByClassName("accordion");

// Adds click event handler to fold/unfold the various services being offered
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      var panel = this.nextElementSibling;
      
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }

      var indicator = document.getElementById(this.id + '-indicator')
      indicator.classList.toggle('fa-angle-up');
      indicator.classList.toggle('fa-angle-down')
    });
  }

  var tabs = document.getElementsByClassName("tab-button");
  
// Adds click event to the tabs which allows users to switch between the packages
  for (i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function () {
      if(ACTIVE_PACKAGE !== '')
        document.getElementById(ACTIVE_PACKAGE).classList.toggle("active");

      this.classList.toggle("active");
      ACTIVE_PACKAGE = this.id;
      packageVisibility(ACTIVE_PACKAGE, 'table-cell');

      if (ACTIVE_PACKAGE !== 'basic')
        packageVisibility('basic', 'none');

      if (ACTIVE_PACKAGE !== 'business')
        packageVisibility('business', 'none')

      if (ACTIVE_PACKAGE !== 'pro')
        packageVisibility('pro', 'none')
    });
  }

  window.dispatchEvent(new Event('resize'));
});

// Helper function to show/hide entire column of the specified package.
function packageVisibility(package, action) {
  var i, elements = document.getElementsByClassName(package)
  for (i = 0; i < elements.length; i++) {
    elements[i].style.display = action;
  }
}

// Handle's resize event such that the current content is shown based on the 
// screen size.
window.addEventListener('resize', function (event) {
  if (window.innerWidth < 600) {
    if (ACTIVE_PACKAGE === '') {
      document.getElementById('tabs').style.display = 'block';
      ACTIVE_PACKAGE = 'basic';
      document.getElementById('basic').classList.toggle('active');
      packageVisibility('basic', 'table-cell');
      packageVisibility('business', 'none');
      packageVisibility('pro', 'none');
    }
  }
  else {
    if (ACTIVE_PACKAGE !== '') {
      document.getElementById(ACTIVE_PACKAGE).classList.toggle("active");
      ACTIVE_PACKAGE = '';
      packageVisibility('basic', 'table-cell');
      packageVisibility('business', 'table-cell');
      packageVisibility('pro', 'table-cell');
      document.getElementById('tabs').style.display = 'none';
    }
  }
});


