chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  if (request.action == "new_section") {
    chrome.tabs.executeScript(null, {file: "libraries/jquery.js"}, function () {
      chrome.tabs.executeScript(null, {file: "libraries/alert.js"})
    }) //null defaults to currently selected tab
    chrome.tabs.executeScript(null, {file: "assets/js/content_script_get_section.js"})
    chrome.tabs.insertCSS(null, {file: "assets/css/content_script_styles.css"})

    //inject jquery notification plugin
    chrome.tabs.insertCSS(null, {file: "libraries/alert.css"})

  } else if (request.action == "create_new_section") {
  	var existingMonitors = getMonitors()
  	existingMonitors.push(request.sectionData)
        saveMonitors(existingMonitors);
  }
})

function saveMonitors(monitors) {
  localStorage.setItem('sections', JSON.stringify(monitors))
}

function getMonitors() {
  return JSON.parse(localStorage.getItem('sections'))
}

// Loads a page, executes its javascript, and calls
// the callback with its html content
function loadPage(url, cb) {
  $.ajax({
    type: 'GET',
    url: url,
    data: 'page=' + url,
    dataType: 'html',
    success: function(data) {
      cb(data);
    }

  });
}

function sendNotification(url, orig_content, new_content) {
  $.ajax({
    type: 'POST',
    url: 'http://changenotify.herokuapp.com/notify',
    data: {
      phone_number: '4179880783',
      email: 'rzendacott@gmail.com',
      name: 'John Smith',
      website: url,
      original_content: orig_content,
      new_content: new_content
    },
    success: function(data) {
      console.log('Sent alert successfully!')
    }
  });
}

setInterval(function() {
  var existingMonitors = getMonitors()
  console.log('Checking for updates')
  for (var i = 0; i < existingMonitors.length; i++)
  {
    var monitor = existingMonitors[i];
    loadPage(monitor.url, function(page) {
      page = $(page); // convert the page to a parsed html doc
      var content = page.find(monitor.dom_path).html(); // find the saved element
      // If the content has changed, send alert
      if (content != monitor.content)  {
        sendNotification(monitor.url, monitor.content, content);
      }

      monitor.content = content; // update content

      // update all of the monitors here
      saveMonitors(existingMonitors);
    });
  }

}, 5000000000*1000) //should be an option


/**

Structure for section objects
{
	url
	dom_path
	content
}
**/
