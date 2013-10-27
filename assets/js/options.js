$(function() {
  $('button').click(function () {
    localStorage.setItem('phoneNumber', $('#phone').val())
    localStorage.setItem('email', $('#email').val())
    localStorage.setItem('name', $('#name').val())
    localStorage.setItem('frequency', $('#frequency').val())
  	toastr.success('Your information has been saved!')
  })
  $('#phone').val(localStorage.phoneNumber)
  $('#email').val(localStorage.email)
  $('#name').val(localStorage.name)
  $('#frequency').val(localStorage.frequency)
  updatePreview(localStorage.getItem('frequency'))

  $('#frequency').bind('change', function(e) {
    e.preventDefault();
    updatePreview($(this).val())
  });

})
function updatePreview(minutes) {
  $('#frequency_preview').html(minutes+" minutes")
}