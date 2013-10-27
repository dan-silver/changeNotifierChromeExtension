$(function() {
  $('button').click(function () {
    localStorage.setItem('phoneNumber', $('#phone').val())
    localStorage.setItem('email', $('#email').val())
  	toastr.success('You\'re information has been saved!')
  })
  $('#phone').val(localStorage.phoneNumber)
  $('#email').val(localStorage.email)
})
