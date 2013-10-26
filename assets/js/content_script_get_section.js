console.log('INJECTED!')
$(function () {
  $('*').hover(
    function(e){
    	$("*").removeClass('updateNotifier-selected')
        $(this).addClass('updateNotifier-selected')
        e.preventDefault();
        e.stopPropagation();
        return false;
    },function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
  )
  $(document).keypress(function(e) {
    if(e.which == 13) {
      alert('You pressed enter!')
    }
  })
})