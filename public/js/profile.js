$(document).ready(function () {
  // Getting references from our form and inputs
  var editProfileForm = $('form.profile')
  var emailInput = $('input#emailForm')
  var passwordInput = $('input#passwordForm')
  var rePasswordInput = $('input#rePasswordForm')

  // When the edit button is clicked, we update the user table
  editProfileForm.on('submit', function (event) {
      event.preventDefault()
      var userData = {
          email: emailInput.val().trim(),
          password: passwordInput.val().trim(),
          rePassword: rePasswordInput.val().trim()
      }

      editProfile(userData.username, userData.email)
      // usernameInput.val('')
      emailInput.val('')
  })

  function editProfile(username, email) {
      $.post('/api/profile', {
          // username: username,
          email: email
      })
          .then(function (data) {
              window.location.replace('/profile')
              // If there's an error, handle it by throwing up an alert
          })
          .catch(handleEditProfileErr)
  };

  function handleEditProfileErr(err) {
      $('#alert.msg').text(err.responseJSON)
      $('#alert').fadeIn(500)
  }
})
