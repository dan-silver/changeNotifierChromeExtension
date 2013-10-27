$(function () {
var currentElement, selecting = true

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
      removeAllHighlights()
      var dom_path = getFullPath(currentElement)
      var content = $(currentElement).html()
      console.log(currentElement)
      console.log(dom_path)
      chrome.runtime.sendMessage({action: "create_new_section", sectionData: {
        url: window.location.href,
        dom_path: dom_path,
        content: content
      }})
      toastr.success('We\'re now monitoring this section')
      selecting = false
    }
  })
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
