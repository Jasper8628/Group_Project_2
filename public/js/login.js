$(document).ready(function () {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var usernameInput = $("input#userForm");
  var passwordInput = $("input#passwordForm");

  // When the form is submitted, we validate there's a username and password entered
  loginForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username && !userData.password) {
      $("#errorEntry").attr("style", "display: none");
      $("#errorHead").attr("style", "display: block");
      $("#usernameLabel").attr("class", "is-invalid-label");
      $("#userForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formNameError").attr("class", "form-error is-visible");
      $("#passwordLabel").attr("class", "is-invalid-label");
      $("#passwordForm").attr({ "class": "is-invalid-input", "aria-invalid": "true" });
      $("#formPasswordError").attr("class", "form-error is-visible");
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
      return;
    } else {
      // If we have a username and password we run the loginUser function and clear the form
      loginUser(userData.username, userData.password);
      usernameInput.val("");
      passwordInput.val("");
    }
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the chess page
  function loginUser(username, password) {
    $.post("/api/login", {
      username: username,
      password: password
    })
      .then(function () {
        window.location.replace("/chat");
        // If there's an error, log the error
      })
      .catch(function (err) {
        console.log(err);
        $("#errorEntry").attr("style", "display: block");
        $("#errorHead").attr("style", "display: none");
        $("#usernameLabel").attr("class", "");
        $("#userForm").attr({ "class": "", "aria-invalid": "" });
        $("#formNameError").attr("class", "form-error");
        $("#passwordLabel").attr("class", "");
        $("#passwordForm").attr({ "class": "", "aria-invalid": "" });
        $("#formPasswordError").attr("class", "form-error");
      });
  }
});
