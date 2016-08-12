// require('dotenv').config();
var dotenv = require('dotenv');
dotenv.load();

var knex = require('../db/knex');

/**
 * GET /api
 */
exports.default = function(req, res) {
  res.render('api', {
    title: 'Api Default'
  });
};

/**
 * POST /api
 */
exports.apiPost = function(req, res) {
  // req.assert('name', 'Name cannot be blank').notEmpty();
  // req.assert('email', 'Email is not valid').isEmail();
  // req.assert('email', 'Email cannot be blank').notEmpty();
  // req.assert('message', 'Message cannot be blank').notEmpty();
  // req.sanitize('email').normalizeEmail({remove_dots: false});
  //
  // var errors = req.validationErrors();
  //
  // if (errors) {
  //   return res.status(400).send(errors);
  // }

  res.send({msg: 'You hit the api.'});
};