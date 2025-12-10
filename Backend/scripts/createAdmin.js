import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('📦 MongoDB Connected\n');

    // Delete existing admin
    await User.deleteOne({ email: 'admin@learnify.com' });
    console.log('🗑️  Removed old admin user (if existed)\n');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@learnify.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ Admin user created successfully!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:    admin@learnify.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role:     admin');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Verify password works
    const testUser = await User.findOne({ email: 'admin@learnify.com' }).select('+password');
    const isValid = await bcrypt.compare('admin123', testUser.password);
    
    console.log('🧪 Password Verification Test:', isValid ? '✅ PASSED' : '❌ FAILED');

    if (!isValid) {
      throw new Error('Password verification failed!');
    }

    console.log('\n✅ Admin is ready to use!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();
