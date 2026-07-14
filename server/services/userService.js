import User from '../models/User.js';

export const updateProfile = async (userId, updateData) => {
  const user = await User.findById(userId);

  if (user) {
    user.fullName = updateData.fullName || user.fullName;
    user.phone = updateData.phone || user.phone;

    if (updateData.password) {
      user.password = updateData.password;
    }

    const updatedUser = await user.save();

    return {
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
    };
  } else {
    throw new Error('User not found');
  }
};
