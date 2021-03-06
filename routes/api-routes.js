// Requiring our models and passport as we've configured it
var db = require('../models')
var passport = require('../orm/passport')
var bcrypt = require('bcryptjs')

module.exports = 
function routes (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the chess page.
  // Otherwise the user will be sent an error
  app.post('/api/login', passport.authenticate('local'), function (req, res) {
    res.json(req.user)
  })

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/register', function (req, res) {
    db.User.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, '/api/login')
      })
      .catch(function (err) {
        res.status(401).json(err)
      })
  })

  // Route for logging user out
  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })

  // Route for getting some data about our user to be used client side
  app.get('/api/user_data', function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({})
    } else {
      // Otherwise send back the user's username and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        id: req.user.id,
        email: req.user.email,
        skillLevel: req.user.skillLevel
      })
    }
  })
// Route for updating user data from the profile page. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post('/api/profile', function (req, res) {

    var hashedpassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)

      db.User.update({
        email: req.body.email,
        password: hashedpassword
      },
    // db.User.update({
    //   email: req.body.email,
    //   password: req.body.password
    // }, 
    {
      where: {
        username: req.user.username
      }
    })
      .then(function (data) {
        var object = {
          users: data
        }
        res.render('profile', object)
      })
      .catch(function (err) {
        console.log(err)
      })
  });
  

  
}
