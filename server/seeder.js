import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Driver from './models/Driver.js';
import Ride from './models/Ride.js';
import Payment from './models/Payment.js';
import connectDB from './config/db.js';
import { ROLES } from './utils/constants.js';
import bcrypt from 'bcryptjs';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Driver.deleteMany();
    await Ride.deleteMany();
    await Payment.deleteMany();

    const salt = await bcrypt.genSalt(10);
    
    const createdUsers = await User.insertMany([
      {
        fullName: 'Admin User',
        email: 'admin@admin.com',
        phone: '1111111111',
        password: await bcrypt.hash('admin123', salt),
        role: ROLES.ADMIN,
      },
      {
        fullName: 'John Driver',
        email: 'driver@driver.com',
        phone: '2222222222',
        password: await bcrypt.hash('driver123', salt),
        role: ROLES.DRIVER,
      },
      {
        fullName: 'Jane Rider',
        email: 'user@example.com',
        phone: '3333333333',
        password: await bcrypt.hash('password123', salt),
        role: ROLES.USER,
      },
    ]);

    const driverUser = createdUsers[1]._id;

    await Driver.create({
      user: driverUser,
      licenseNumber: 'LIC12345',
      vehicleMake: 'Toyota',
      vehicleModel: 'Prius',
      vehiclePlate: 'XYZ 1234',
      isAvailable: true,
      currentLocation: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
    });

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Driver.deleteMany();
    await Ride.deleteMany();
    await Payment.deleteMany();

    console.log('Data Destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destroy: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
