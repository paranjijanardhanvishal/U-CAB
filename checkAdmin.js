import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './server/models/User.js';

dotenv.config({ path: './server/.env' });

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    const admin = await User.findOne({ email: 'admin@admin.com' });
    if (admin) {
      console.log('Admin user found:', admin.email, 'Role:', admin.role);
    } else {
      console.log('Admin user NOT found');
    }
    const allUsers = await User.find({});
    console.log('Total users:', allUsers.length);
    for (const u of allUsers) {
      console.log(`- ${u.email} (${u.role})`);
    }
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

checkAdmin();
