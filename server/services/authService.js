import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const register = async (userData) => {
  const { fullName, email, phone, password, role } = userData;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    fullName,
    email,
    phone,
    password,
    role,
  });

  if (user) {
    return {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid user data');
  }
};

const login = async (email, password, role) => {
  const user = await User.findOne({ email });

  if (user && user.role !== role) {
    throw new Error('Invalid role for this login page');
  }

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

const getProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (user) {
    return user;
  } else {
    throw new Error('User not found');
  }
};

export { register, login, getProfile };
