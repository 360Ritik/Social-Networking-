const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../database/schema/schema');
const authenticateToken = require('../authentication/userAuthentication');
const validateInput = require('./validations/valid')
const logger = require('../logger/logger');



const router = express.Router();

const logRequest = (req, res, next) => {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
};

// Apply logRequest middleware to all routes
router.use(logRequest);


// Create User Profile
router.post('/register', validateInput, async (req, res) => {
  try {
      const { username, password, bio, profilePictureURL } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ 
          username, 
          password: hashedPassword, 
          bio, 
          profilePictureURL 
      });
      await newUser.save();
      res.status(201).json({ message: 'User profile created successfully'});
  } catch (error) {
      logger.error('Error creating user profile:', error);
      res.status(500).json({ message: 'Internal server error', reason:'Username must be Unique' });
  }
});


router.post('/login', async (req, res) => {
  try {
      const { username, password } = req.body;
      const user = await User.findOne({ username }); 
      if (!user || !await bcrypt.compare(password, user.password)) {
          logger.error('Invalid credentials');
          return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY , { expiresIn: '1h' });

       // Set the JWT token as a cookie in the response header
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
      res.json({ token });
  } catch (error) {
      logger.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Update User Profile
router.put('/profile/update/:username', authenticateToken, async (req, res) => {
  try {
      const { username } = req.params;
      
      const { bio, profilePictureURL } = req.body;
      const updatedUser = await User.findOneAndUpdate(
          { username }, 
          { $set: { bio, profilePictureURL } }, 
          { new: true }
      );
      if (!updatedUser) {
          logger.error('User not found');
          return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (error) {
      logger.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// View User Profile
router.get('/profile/view/:username', authenticateToken, async (req, res) => {
  try {
      const { username } = req.params;
      const user = await User.findOne({username});
      if (!user) {
          logger.error('User not found');
          return res.status(404).json({ message: 'User not found' });
      }
      res.json({ user });
  } catch (error) {
      logger.error('Error viewing user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete User Profile
router.delete('/profile/delete/:username', authenticateToken, async (req, res) => {
  try {
      const { username } = req.params;
      const deletedUser = await User.findOneAndDelete({ username });
      if (!deletedUser) {
          logger.error('User not found');
          return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User profile deleted successfully' });
  } catch (error) {
      logger.error('Error deleting user profile:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;