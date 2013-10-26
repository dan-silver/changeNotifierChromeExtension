chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.action == "new_section") {
    chrome.tabs.executeScript(null, {file: "libraries/jquery.js"}) //null defaults to currently selected tab
    chrome.tabs.executeScript(null, {file: "assets/js/content_script_get_section.js"})
    chrome.tabs.insertCSS(null, {file: "assets/css/content_script_styles.css"})
  } else if (request.action == "create_new_section") {
  	var existingMonitors = getMonitors()
  	existingMonitors.push(request.sectionData)
  	localStorage.setItem('sections', JSON.stringify(existingMonitors))
  }
})

function getMonitors() {
  return JSON.parse(localStorage.getItem('sections'))
}

setInterval(function() {
  var existingMonitors = getMonitors()
  console.log('Checking for updates')
}, 20*1000) //should be an option