import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    email,
    password: hashedPassword,
    firstname,
    lastname,
  });

  try {
    const duplicatedEmail = await UserModel.findOne({ email });

    if (duplicatedEmail)
      return res.status(400).json('Username is already registered!');

    const user = await newUser.save();

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.JWT,
      { expiresIn: '1h' }
    );

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ messge: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) res.status(400).json('Wrong Password');
      else {
        const token = jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          process.env.JWT,
          { expiresIn: '1h' }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).json('User does not exist');
    }
  } catch (err) {
    res.status(404).json('User does not exist');
  }
};
