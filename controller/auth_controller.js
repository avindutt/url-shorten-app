const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');

module.exports.register = async (req, res) => {
  try {
    const { username, password, cnfpassword } = req.body;
    if(password !== cnfpassword){
      console.log('Passwords does not match');
      return res.redirect('back');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.redirect('/login');
    console.log({ message: 'User registered successfully', username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username/password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log({ message: 'Invalid username/password' });
      return res.redirect('back');
    }

    // generate jwt token when user is logged in
    const token = jwt.sign({ userId: user._id }, 'createdByAvin', { expiresIn: '1h' });
    console.log({ token });
    res.status(200).json({token});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};