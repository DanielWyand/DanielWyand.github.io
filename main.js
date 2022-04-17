// Theme change
var themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener("click", () => {
    if(document.documentElement.hasAttribute('darkTheme')){
        document.documentElement.removeAttribute('darkTheme');
        themeToggle.setAttribute('title', 'Change to Dark Theme')
        themeToggle.innerHTML = '<svg><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>'
      }
     else{
        document.documentElement.setAttribute('darkTheme', 'true');
        themeToggle.setAttribute('title', 'Change to Light Theme')
        themeToggle.innerHTML = '<svg><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>'
        
      };
})

//switch control panel
var div_controlPanel = document.getElementById('controlPanel')
var div_navBarMove = document.getElementById("navBarMove")
var ul_navlinks = document.getElementById("navLinks")
var navlis = ul_navlinks.getElementsByTagName("li")

for (var i=0,len=navlis.length; i<len; i++) {
  navlis[i].addEventListener("click", (e) => {
    var thisLI = e.target.closest('Li')
    thisLI.setAttribute("selected", "true")
    navBarMove.style.top = e.target.closest('a').offsetTop+'px'

    var  parentUl = thisLI.parentElement.children
    
    for (var i=0,pl=parentUl.length; i<pl; i++) {
      if (parentUl[i] !== thisLI){
        parentUl[i].removeAttribute("selected")
        div_controlPanel.children[i].setAttribute("hidden", "true")
      } else {
        div_controlPanel.children[i].removeAttribute("hidden")
        // navBarMove.style.top = (40 + i * 44)+'px'
      }
    }
  })
}

//show hide setting meun
var settingButton = document.getElementById('settingButton');
var settingMeun = document.getElementById('settingMeun');


settingButton.addEventListener('click', (e) => {
  e.stopPropagation();
  settingMeun.classList.toggle("hidden");
})

//drag and adjust width of control panel
var controlPanel = document.getElementById("controlPanel");
var resizeBar = document.getElementById("resizeBar");
var previewPanel = document.getElementById("previewPanel");

resizeBar.onmousedown = (e) => {
  var startX = e.clientX;
  var controlPanel_width = parseFloat(window.getComputedStyle(controlPanel)['width'])
  var previewPanel_width = parseFloat(window.getComputedStyle(previewPanel)['width'])

  document.onmousemove = (e) => {
    var endX = e.clientX;
    var deltaX = endX - startX;
    // && (previewPanel_width - deltaX >= 600)
    if ((controlPanel_width + deltaX) >= 340 ) {
      controlPanel.style.width = controlPanel_width + deltaX  + "px";
    }  
  }
  
  document.onmouseup = (e) =>{
    document.onmousemove = null;
    document.onmouseup = null;
    resizeBar.releaseCapture && resizeBar.releaseCapture();
  }
  resizeBar.setCapture && resizeBar.setCapture();
  return false
}



var profileTableRow = document.getElementsByClassName('profileTableRow')
var profileTable = document.getElementById('profileTable')
// row content template
var rowTemplate = `<div class="profileTableCell column0"><span class="highCyc" title="Add a line before" onclick="addRow(event, -1)">+</span><span class="rowNo" title="Adjust line order">1</span><span class="lowCyc" title="Add a line after" onclick="addRow(event, 1)">+</span></div><div class="profileTableCell column1"><input type="text" class="depth">~<input type="text" class="depth"></div><div class="profileTableCell column2"><span class="soilLegend" title="Add a line after"></span> <input type="text" class="soilType"></div><div class="profileTableCell column3"><textarea class="description"></textarea> <span class="editThisLine"><svg viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></span> <span class="deleteThisLine"><svg  viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></span></div>`

// insert New Row
function addRow(e, location){
  let currentRow = e.target.parentElement.parentElement;
  let newRow = document.createElement('div');
  newRow.classList.add('profileTableRow');
  newRow.innerHTML = rowTemplate;

  console.log(location)

  location == -1 ? profileTable.insertBefore(newRow, currentRow): insertAfter(newRow, currentRow);
  refreshRowNo ()
}

// inserAfter need to be constructed by ourself
function insertAfter(newElement,targetElement) {
  var parent = targetElement.parentNode;
  if(parent.lastChild == targetElement){
      parent.appendChild(newElement);
  }else{
      parent.insertBefore(newElement,targetElement.nextSibling);
  }
}

// row number refresher
function refreshRowNo (){
  for (let i=0, len = profileTableRow.length; i<len; i++) {
    profileTableRow[i].getElementsByClassName('rowNo')[0].innerHTML = i+1
  }
}
