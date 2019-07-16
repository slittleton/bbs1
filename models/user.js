const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');


const userAuthSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true
  }
})

const UserAuth = mongoose.model('User', userAuthSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  }
  return(Joi.validate(user, schema))
}

module.exports.UserAuth = UserAuth;
module.exports.validateUser = validateUser