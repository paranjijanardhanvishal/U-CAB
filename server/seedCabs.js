import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Vehicle from './models/Vehicle.js';
import User from './models/User.js';

dotenv.config();

const seedCabs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    // Clear existing active cabs to insert defaults
    await Vehicle.deleteMany({});
    
    // Find a driver user to attach to
    let driver = await User.findOne({ role: 'driver' });
    let driverId = driver ? driver._id : null;

    const cabs = [
      {
        driver: driverId,
        carName: 'Maruti Suzuki Swift',
        carType: 'Mini',
        carNo: 'MH 12 AB 1234',
        carImage: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=600&auto=format&fit=crop',
        pricePerKm: 12,
        status: 'Active'
      },
      {
        driver: driverId,
        carName: 'Honda City',
        carType: 'Sedan',
        carNo: 'DL 4C AB 4321',
        carImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600&auto=format&fit=crop',
        pricePerKm: 15,
        status: 'Active'
      },
      {
        driver: driverId,
        carName: 'Toyota Innova Crysta',
        carType: 'SUV',
        carNo: 'KA 03 XY 9876',
        carImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop',
        pricePerKm: 20,
        status: 'Active'
      },
      {
        driver: driverId,
        carName: 'Mercedes-Benz E-Class',
        carType: 'Premium',
        carNo: 'TS 09 XY 5555',
        carImage: 'https://images.unsplash.com/photo-1617469165786-8007eda3caa7?q=80&w=600&auto=format&fit=crop',
        pricePerKm: 28,
        status: 'Active'
      },
      {
        driver: driverId,
        carName: 'Royal Enfield Classic 350',
        carType: 'Bike',
        carNo: 'TN 01 XY 1111',
        carImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop',
        pricePerKm: 8,
        status: 'Active'
      }
    ];

    await Vehicle.insertMany(cabs);
    console.log('Successfully seeded 5 default cabs with images!');

    process.exit();
  } catch (error) {
    console.error('Error seeding cabs:', error);
    process.exit(1);
  }
};

seedCabs();
