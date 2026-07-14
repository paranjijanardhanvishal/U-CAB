import Driver from '../models/Driver.js';

export const getDriverProfile = async (userId) => {
  const driver = await Driver.findOne({ user: userId }).populate('user', '-password');
  if (driver) {
    return driver;
  }
  throw new Error('Driver profile not found');
};

export const updateAvailability = async (userId, isAvailable) => {
  const driver = await Driver.findOne({ user: userId });
  if (driver) {
    driver.isAvailable = isAvailable;
    await driver.save();
    return driver;
  }
  throw new Error('Driver profile not found');
};

export const updateLocation = async (userId, latitude, longitude) => {
  const driver = await Driver.findOne({ user: userId });
  if (driver) {
    driver.currentLocation = { latitude, longitude };
    await driver.save();
    return driver;
  }
  throw new Error('Driver profile not found');
};
