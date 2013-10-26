console.log('INJECTED!')

var currentElement

$(function () {
  $('*').hover(
    function(e){
    	currentElement = $(this)
    	$("*").removeClass('updateNotifierSelected')
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
      console.log('A key has been pressed!')
    if(e.which == 13) {
      console.log('You pressed enter!')
      console.log(currentElement.getFullPath())
      chrome.runtime.sendMessage({action: "create_new_section", sectionData:{}})
    }
  })
})