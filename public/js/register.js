$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.login");
  var usernameInput = $("input#userForm");
  var passwordInput = $("input#passwordForm");
  var rePasswordInput = $("input#rePasswordForm");

  // When the signup button is clicked, we validate the username and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
      rePassword: rePasswordInput.val().trim()
    };

    if (!userData.username && !userData.password && !userData.rePassword) {
      $("#errorEntry").attr("style", "display: none");
      $("#errorHead").attr("style", "display: block");
      $("#usernameLabel").attr("class", "is-invalid-label");
      $("#userForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formNameError").attr("class", "form-error is-visible");
      $("#passwordLabel").attr("class", "is-invalid-label");
      $("#passwordForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formPasswordError").attr("class", "form-error is-visible");
      $("#rePasswordLabel").attr("class", "is-invalid-label");
      $("#rePasswordForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formRePasswordError").attr("class", "form-error is-visible");
      return;
    } else if (!userData.username && !userData.password) {
      $("#errorEntry").attr("style", "display: none");
      $("#errorHead").attr("style", "display: block");
      $("#usernameLabel").attr("class", "is-invalid-label");
      $("#userForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formNameError").attr("class", "form-error is-visible");
      $("#passwordLabel").attr("class", "is-invalid-label");
      $("#passwordForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formPasswordError").attr("class", "form-error is-visible");
      $("#rePasswordLabel").attr("class", "");
      $("#rePasswordForm").attr({ "class": "", "aria-invalid": "" });
      $("#formRePasswordError").attr("class", "form-error");
      return;
    } else if (!userData.username && !userData.rePassword) {
      $("#errorEntry").attr("style", "display: none");
      $("#errorHead").attr("style", "display: block");
      $("#usernameLabel").attr("class", "is-invalid-label");
      $("#userForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formNameError").attr("class", "form-error is-visible");
      $("#passwordLabel").attr("class", "");
      $("#passwordForm").attr({ "class": "", "aria-invalid": "" });
      $("#formPasswordError").attr("class", "form-error");
      $("#rePasswordLabel").attr("class", "is-invalid-label");
      $("#rePasswordForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formRePasswordError").attr("class", "form-error is-visible");
      return;
    } else if (!userData.password && !userData.rePassword) {
      $("#errorEntry").attr("style", "display: none");
      $("#errorHead").attr("style", "display: block");
      $("#usernameLabel").attr("class", "");
      $("#userForm").attr({ "class": "", "aria-invalid": "" });
      $("#formNameError").attr("class", "form-error");
      $("#passwordLabel").attr("class", "is-invalid-label");
      $("#passwordForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formPasswordError").attr("class", "form-error is-visible");
      $("#rePasswordLabel").attr("class", "is-invalid-label");
      $("#rePasswordForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formRePasswordError").attr("class", "form-error is-visible");
      return;
    } else if (!userData.username) {
      $("#errorEntry").attr("style", "display: none");
      $("#errorHead").attr("style", "display: block");
      $("#usernameLabel").attr("class", "is-invalid-label");
      $("#userForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formNameError").attr("class", "form-error is-visible");
      $("#passwordLabel").attr("class", "");
      $("#passwordForm").attr({ "class": "", "aria-invalid": "" });
      $("#formPasswordError").attr("class", "form-error");
      $("#rePasswordLabel").attr("class", "");
      $("#rePasswordForm").attr({ "class": "", "aria-invalid": "" });
      $("#formRePasswordError").attr("class", "form-error");
      return;
    } else if (!userData.password) {
      $("#errorEntry").attr("style", "display: none");
      $("#errorHead").attr("style", "display: block");
      $("#passwordLabel").attr("class", "is-invalid-label");
      $("#passwordForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formPasswordError").attr("class", "form-error is-visible");
      $("#usernameLabel").attr("class", "");
      $("#userForm").attr({ "class": "", "aria-invalid": "" });
      $("#formNameError").attr("class", "form-error");
      $("#rePasswordLabel").attr("class", "");
      $("#rePasswordForm").attr({ "class": "", "aria-invalid": "" });
      $("#formRePasswordError").attr("class", "form-error");
      return;
    } else if (!userData.rePassword) {
      $("#errorEntry").attr("style", "display: none");
      $("#errorHead").attr("style", "display: block");
      $("#rePasswordLabel").attr("class", "is-invalid-label");
      $("#rePasswordForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formRePasswordError").attr("class", "form-error is-visible");
      $("#usernameLabel").attr("class", "");
      $("#userForm").attr({ "class": "", "aria-invalid": "" });
      $("#formNameError").attr("class", "form-error");
      $("#passwordLabel").attr("class", "");
      $("#passwordForm").attr({ "class": "", "aria-invalid": "" });
      $("#formPasswordError").attr("class", "form-error");
      return;
    } else if (userData.password === userData.rePassword) {
      // If we have a username and password, run the signUpUser function
      signUpUser(userData.username, userData.password);
      usernameInput.val("");
      passwordInput.val("");
    } else {
      console.log("password entries do not match");
      $("#errorEntry").attr("style", "display: block");
      $("#errorHead").attr("style", "display: none");
      $("#usernameLabel").attr("class", "");
      $("#userForm").attr({ "class": "", "aria-invalid": "" });
      $("#formNameError").attr("class", "form-error");
      $("#passwordLabel").attr("class", "is-invalid-label");
      $("#passwordForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formPasswordError").attr("class", "form-error");
      $("#rePasswordLabel").attr("class", "is-invalid-label");
      $("#rePasswordForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formRePasswordError").attr("class", "form-error is-visible");
    }
  });

  // Does a post to the signup route. If successful, we are redirected to the chess page
  // Otherwise we log any errors
  function signUpUser(username, password) {
    $.post("/api/register", {
      username: username,
      password: password
    })
      .then(function (data) {
        window.location.replace("/");
        // If there's an error, handle it by throwing up an alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
