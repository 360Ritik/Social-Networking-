const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const generateRandomId = () => Math.floor(100 + Math.random() * 9000).toString();

const UserSchema = new mongoose.Schema({
  userId: { type: String, default: uuidv4 },
  username: { type: String, required: true, unique: true },
  bio: String,
  profilePictureURL: String,
  password: { type: String, required: true }
}, { collection: 'users' });

const PostSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  postId: { type: String, default: generateRandomId },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { collection: 'posts' });

const FollowSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  followerId: { type: [String], required: true },
  followedId: { type: [String], required: true }
}, { collection: 'follows' });

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);
const Follow = mongoose.model('Follow', FollowSchema);

module.exports = { User, Post, Follow };
