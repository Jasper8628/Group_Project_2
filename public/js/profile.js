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
      if (!userData.email && !userData.password && !userData.rePassword) {
        $('#errorEntry').attr('style', 'display: none')
        $('#errorHead').attr('style', 'display: block')
        $('#usernameLabel').attr('class', 'is-invalid-label')
        $('#userForm').attr({ class: 'is-invalid-input', 'aria-invalid': 'true' })
        $('#formNameError').attr('class', 'form-error is-visible')
        $('#passwordLabel').attr('class', 'is-invalid-label')
        $('#passwordForm').attr({ class: 'is-invalid-input', 'aria-invalid': 'true' })
        $('#formPasswordError').attr('class', 'form-error is-visible')
        $('#rePasswordLabel').attr('class', 'is-invalid-label')
        $('#rePasswordForm').attr({ class: 'is-invalid-input', 'aria-invalid': 'true' })
        $('#formRePasswordError').attr('class', 'form-error is-visible')
      } else if (!userData.email && !userData.password) {
        $('#errorEntry').attr('style', 'display: none')
        $('#errorHead').attr('style', 'display: block')
        $('#usernameLabel').attr('class', 'is-invalid-label')
        $('#userForm').attr({ class: 'is-invalid-input', 'aria-invalid': 'true' })
        $('#formNameError').attr('class', 'form-error is-visible')
        $('#passwordLabel').attr('class', 'is-invalid-label')
        $('#passwordForm').attr({ class: 'is-invalid-input', 'aria-invalid': 'true' })
        $('#formPasswordError').attr('class', 'form-error is-visible')
        $('#rePasswordLabel').attr('class', '')
        $('#rePasswordForm').attr({ class: '', 'aria-invalid': '' })
        $('#formRePasswordError').attr('class', 'form-error')
      } else if (!userData.email && !userData.rePassword) {
        $('#errorEntry').attr('style', 'display: none')
        $('#errorHead').attr('style', 'display: block')
        $('#usernameLabel').attr('class', 'is-invalid-label')
        $('#userForm').attr({ class: 'is-invalid-input', 'aria-invalid': 'true' })
        $('#formNameError').attr('class', 'form-error is-visible')
        $('#passwordLabel').attr('class', '')
        $('#passwordForm').attr({ class: '', 'aria-invalid': '' })
        $('#formPasswordError').attr('class', 'form-error')
        $('#rePasswordLabel').attr('class', 'is-invalid-label')
        $('#rePasswordForm').attr({ class: 'is-invalid-input', 'aria-invalid': 'true' })
        $('#formRePasswordError').attr('class', 'form-error is-visible')
      } else if (!userData.password && !userData.rePassword) {
        $('#errorEntry').attr('style', 'display: none')
        $('#errorHead').attr('style', 'display: block')
        $('#usernameLabel').attr('class', '')
        $('#userForm').attr({ class: '', 'aria-invalid': '' })
        $('#formNameError').attr('class', 'form-error')
        $('#passwordLabel').attr('class', 'is-invalid-label')
        $('#passwordForm').attr({ class: 'is-invalid-input', 'aria-invalid': 'true' })
        $('#formPasswordError').attr('class', 'form-error is-visible')
        $('#rePasswordLabel').attr('class', 'is-invalid-label')
        $('#rePasswordForm').attr({ class: 'is-invalid-input', 'aria-invalid': 'true' })
        $('#formRePasswordError').attr('class', 'form-error is-visible')
      } else if (!userData.email) {
        $('#errorEntry').attr('style', 'display: none')
        $('#errorHead').attr('style', 'display: block')
        $('#usernameLabel').attr('class', 'is-invalid-label')
        $('#userForm').attr({ class: 'is-invalid-input', 'aria-invalid': 'true' })
        $('#formNameError').attr('class', 'form-error is-visible')
        $('#passwordLabel').attr('class', '')
        $('#passwordForm').attr({ class: '', 'aria-invalid': '' })
        $('#formPasswordError').attr('class', 'form-error')
        $('#rePasswordLabel').attr('class', '')
        $('#rePasswordForm').attr({ class: '', 'aria-invalid': '' })
        $('#formRePasswordError').attr('class', 'form-error')
      } else if (!userData.password) {
        $('#errorEntry').attr('style', 'display: none')
        $('#errorHead').attr('style', 'display: block')
        $('#passwordLabel').attr('class', 'is-invalid-label')
        $('#passwordForm').attr({ class: 'is-invalid-input', 'aria-invalid': 'true' })
        $('#formPasswordError').attr('class', 'form-error is-visible')
        $('#usernameLabel').attr('class', '')
        $('#userForm').attr({ class: '', 'aria-invalid': '' })
        $('#formNameError').attr('class', 'form-error')
        $('#rePasswordLabel').attr('class', '')
        $('#rePasswordForm').attr({ class: '', 'aria-invalid': '' })
        $('#formRePasswordError').attr('class', 'form-error')
      } else if (!userData.rePassword) {
        $('#errorEntry').attr('style', 'display: none')
        $('#errorHead').attr('style', 'display: block')
        $('#rePasswordLabel').attr('class', 'is-invalid-label')
        $('#rePasswordForm').attr({ class: 'is-invalid-input', 'aria-invalid': 'true' })
        $('#formRePasswordError').attr('class', 'form-error is-visible')
        $('#usernameLabel').attr('class', '')
        $('#userForm').attr({ class: '', 'aria-invalid': '' })
        $('#formNameError').attr('class', 'form-error')
        $('#passwordLabel').attr('class', '')
        $('#passwordForm').attr({ class: '', 'aria-invalid': '' })
        $('#formPasswordError').attr('class', 'form-error')
      } else if (userData.password === userData.rePassword) {
        // If we have a username and password, run the signUpUser function
      editProfile(userData.password, userData.email)
      passwordInput.val('')
      emailInput.val('')
      }
      else {
        console.log('password entries do not match')
        $('#errorEntry').attr('style', 'display: block')
        $('#errorHead').attr('style', 'display: none')
        $('#usernameLabel').attr('class', '')
        $('#userForm').attr({ class: '', 'aria-invalid': '' })
        $('#formNameError').attr('class', 'form-error')
        $('#passwordLabel').attr('class', 'is-invalid-label')
        $('#passwordForm').attr({ class: 'is-invalid-input', 'aria-invalid': 'true' })
        $('#formPasswordError').attr('class', 'form-error')
        $('#rePasswordLabel').attr('class', 'is-invalid-label')
        $('#rePasswordForm').attr({ class: 'is-invalid-input', 'aria-invalid': 'true' })
        $('#formRePasswordError').attr('class', 'form-error is-visible')
      }
    })

  function editProfile(password, email) {
      $.post('/api/profile', {
          password: password,
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
