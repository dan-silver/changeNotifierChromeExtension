$(function() {
  $('button').click(function () {
    localStorage.setItem('phoneNumber', $('#phone').val())
    localStorage.setItem('email', $('#email').val())
    localStorage.setItem('name', $('#name').val())
  	toastr.success('Your information has been saved!')
  })
  $('#phone').val(localStorage.phoneNumber)
  $('#email').val(localStorage.email)
  $('#name').val(localStorage.name)
})
