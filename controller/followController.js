
const { User, Follow, Post } = require('../database/schema/schema');
const authenticateToken = require('../authentication/userAuthentication');
const mongoose = require('../database/dbConnection');
const express = require('express');

const router = express.Router();



// follow a user
router.post('/user', authenticateToken, async (req, res) => {
  try {
    const { userId, followerId } = req.body;

    if (!userId || !followerId) {
      return res.status(400).json({ message: 'Invalid request. Please provide userId and followerId.' });
    }

    // Check if the user is already following the target user
    let existingFollow = await Follow.findOne({ followerId });

    if (existingFollow) {
      // Check if the userId is already in the followedId array
      if (existingFollow.followerId.includes(followerId)) {
        return res.status(400).json({ message: 'You are already following this user' });
      }
      // Add the userId to the followedId array
      existingFollow.followerId.push(followerId);
      await existingFollow.save();
    } else {
      // If there's no existing follow, create a new one
      const newFollow = new Follow({ _id: userId, followerId: [followerId] });
      await newFollow.save();
    }

    // Check if the user with followerId exists
    let followerUser = await Follow.findOne({ _id: followerId })

    if (followerUser) {
      // Check if the userId is already in the followedId array
      let existingFollowed = await Follow.findOne({ followedId });
     
        if (!existingFollowed.followedId.includes(userId)) {
          existingFollowed.followedId.push(userId);
          await existingFollowed.save();
        }
      
    } else {
      const newFollow = new Follow({ _id: followerId, followedId: [userId] });
      await newFollow.save();
    }

    res.status(201).json({ message: 'User followed successfully and userId also added into the list of followedId of user follower' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// unfollow a user 
router.put('/unfollow/user/:userId/:followerId', authenticateToken, async (req, res) => {
  try {
    const { userId ,followerId } = req.params;
   
    // Find and remove the followerId from the array
    const isFollowing = await Follow.findOneAndUpdate(
      { _id: userId }, 
      { $pull: { followerId: followerId } },
      { new: true }
    );

    // Check if the user was following the target user
    if (!isFollowing) {
      return res.status(400).json({ message: 'You are not following this user' });
    }

    res.json({ message: 'User unfollowed successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// to retrieve the list of users a given user is following
router.get('/following/:userId', authenticateToken, async (req, res) => {

 
  try {
    const { userId }=req.params;
    const following = await Follow.find({ _id: userId })
    .select('followerId -_id');
    res.json({ following });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// to retrieve the list of users who are following a given user
router.get('/followers/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId }=req.params;
    const followers = await Follow.find({ _id: userId })
    .select('followedId -_id');;
    res.json({ followers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;