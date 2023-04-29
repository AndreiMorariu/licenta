import UserModel from '../Models/userModel.js';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherFields } = user._doc;
      res.status(200).json(otherFields);
    } else {
      res.status(400).json('User does not exist');
    }
  } catch (err) {
    res.status(400).json('User does not exist');
  }
};

export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...other } = user._doc;
      return other;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;

  const { _id, userIsAdmin, password } = req.body;

  if (id === _id) {
    try {
      if (password) {
        const salt = await bycrpt.genSalt(10);
        req.body.password = await bycrpt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT,
        { expiresIn: '1h' }
      );
      res.status(200).json({ user, token });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('Unable to fulfill the request');
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, userIsAdmin } = req.body;

  if (currentUserId === id || userIsAdmin) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json('User has been deleted');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('Unable to fulfill the request');
  }
};

export const followUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body;

  if (_id === id) res.status(403).json('Cannot perform this action');
  else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json('User followed');
      } else {
        res.status(403).json('Already following user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export const unfollowUser = async (req, res) => {
  const id = req.params.id;

  const { _id } = req.body;

  if (_id === id) res.status(403).json('Cannot perform this action');
  else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json('User unfollowed');
      } else {
        res.status(403).json('User not followed by you');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
