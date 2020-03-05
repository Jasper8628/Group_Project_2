// Requiring path to so we can use relative routes to our HTML files
var path = require('path')
var db = require('../models')

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require('../config/middleware/isAuthenticated')

module.exports = function (app) {
  app.get('/', function (req, res) {
    // If the user already has an account send them to the chess page
    if (req.user) {
      res.redirect('/chess')
    }
    res.sendFile(path.join(__dirname, '../public/index.html'))
  })

  app.get('/register', function (req, res) {
    // If the user already has an account send them to the chess page
    if (req.user) {
      res.redirect('/chess')
    }
    res.sendFile(path.join(__dirname, '../public/register.html'))
  })

  app.get('/profile', function (req, res) {
    db.User.findOne({
      where: {
        id: req.user.id
      }
    }).then(function (data) {
      console.log('-----------------------' + JSON.stringify(data))
      console.log('-----------------------')
      var hbsObject = {
        users: data
      }
      console.log(hbsObject, hbsObject)
      res.render('profile', hbsObject)
    })
  })

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the register page
  app.get('/chess', isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, '../public/chess.html'))
  })

  app.get('/chat', function (req, res) {
    db.User.findOne({
      where: {
        id: '1' // TODO: This should be req.params.id but that gives errors!
      }
    }).then(function (data) {
      var hbsObject = {
        users: data
      }
      console.log(hbsObject, hbsObject)
      res.render('chat', hbsObject)
    })
  })
}
