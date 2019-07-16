const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { UserAuth, validateUser } = require('../models/user');
const bcrypt = require('bcryptjs');

// GET ================================================
router.get('/', (req, res)=> {
  res.send('Users')
})

router.get('/:id', async (req, res)=> {
  const userAuth = await UserAuth.findById(req.params.id)
  console.log(userAuth)
  res.send(userAuth.name)
})

// POST ===============================================
// -------- REGISTER NEW USER --------
router.post('/register', async (req,res) => {
  const { error }  = validateUser(req.body);
  if (error) { return res.status(400).send(error) };

  const { name, email, password } = req.body;
  let newUser = new UserAuth({
    name, 
    email, 
    password
  })
  
  // Encrypt Password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  await newUser.save().catch(err=>console.log(err));
  
  //TODO#### GENERATE AUTH TOKEN - send token to client
  
  res.send(`Registered New User: ${newUser.name}`);
})

// -------- LOGIN USER --------


module.exports = router;