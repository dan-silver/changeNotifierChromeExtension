$(function () {
var currentElement, selecting = true
  jQuery('body').append("<div id='drop'></div>")
  $('#drop').css({
    position: "fixed",
    top: "0",
    width: "100%",
    height: "100%",
    "pointer-events": "none",
    "background-color": "black",
    opacity: ".7",
    "z-index": 500
  })
  $('*').hover(
    function(e){
      if (!selecting) return
    	currentElement = this
    	removeAllHighlights()
      $(this).addClass('updateNotifierSelected')
      e.preventDefault()
      e.stopPropagation()
      return false
    },function(e) {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  )
  $(document).keypress(function(e) {
    if(e.which == 13 && selecting) {
      var dom_path = getFullPath(currentElement)
      var content = $(currentElement).html()
      var name = prompt("Name this section:");
      chrome.runtime.sendMessage({action: "create_new_section", sectionData: {
        url: window.location.href,
        dom_path: dom_path,
        content: content,
        name: name
      }})
      toastr.success('We\'re now monitoring this section')
      reset()
    } else if ((e.which == 32 || e.which == 27) && selecting) {
      console.log(e)
      reset()
      e.preventDefault()
    }
  })

  function reset() {
    selecting = false
    removeAllHighlights()
    $('#drop').remove()
  }
})

function removeAllHighlights() { $("*").removeClass('updateNotifierSelected') }

function getFullPath(el) {
  if (!(el instanceof Element))
      return 'hello world'
  var path = []
  while (el.nodeType === Node.ELEMENT_NODE) {
      var selector = el.nodeName.toLowerCase()
      if (el.id) {
          selector += '#' + el.id
          path.unshift(selector)
          break
      } else {
          var sib = el, nth = 1
          while (sib = sib.previousElementSibling) {
              if (sib.nodeName.toLowerCase() == selector)
                 nth++
          }
          if (nth != 1)
              selector += ":nth-of-type("+nth+")"
      }
      path.unshift(selector)
      el = el.parentNode
  }
  return path.join(" > ")
}
