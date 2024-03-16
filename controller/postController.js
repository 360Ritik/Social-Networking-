
const { User, Post } = require('../database/schema/schema');
const authenticateToken = require('../authentication/userAuthentication');
const mongoose = require('../database/dbConnection'); 
const express = require('express');

const router = express.Router();



router.post('/add/post', authenticateToken, async (req, res) => {
    try {
      const { userId, content } = req.body;
  
      const user = await User.findOne({ userId });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const newPost = new Post({ userId: user.userId, content });
      await newPost.save();
  
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  //  View User's Posts
  router.get('/view/post/:userId', authenticateToken, async (req, res) => {
    try {
      const { userId } = req.params;
      const userPosts = await Post.find({ userId })
      .select('-__v')
      .sort({ timestamp: -1 });
      res.json({ userPosts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Update Post
  router.put('/update/post/:userId', authenticateToken, async (req, res) => {
    try {
      const { userId } = req.params;
      const { content, postId } = req.body;
      const updatedPost = await Post.findOneAndUpdate(
        { postId: postId, userId: userId }, 
        { $set: { content } }, 
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found or unauthorized' });
      }
      res.json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Delete Post
  router.delete('/delete/post/:postId', authenticateToken, async (req, res) => {
    try {
      const { postId } = req.params;
      const deletedPost = await Post.findOneAndDelete({ postId: postId });
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found or unauthorized' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  module.exports = router;
 