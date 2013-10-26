console.log("The background page has been launched")
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.action == "new_section") {
    console.log('new_section action received!')
    chrome.tabs.executeScript(null, {file: "assets/js/content_script_get_section.js"}) //null defaults to currently selected tab
  }
})