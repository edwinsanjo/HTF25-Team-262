const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const User = require('../models/User');
const Product = require('../models/Product');

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://edw:oOj9LZD9iqFgCEwf@cluster.omndo6m.mongodb.net/?appName=CLUSTER';
  await connectDB(uri);
  
  // Admin users
  const users = [
    { registerNumber: 'admin', password: 'admin123', isAdmin: true },
    { registerNumber: 'staff', password: 'staff123', isAdmin: true },
    { registerNumber: 'security', password: 'security123', isAdmin: true },
    
    // Regular users
    { registerNumber: 'john', password: 'john123', isAdmin: false },
    { registerNumber: 'mary', password: 'mary123', isAdmin: false },
    { registerNumber: 'student1', password: 'student123', isAdmin: false },
    { registerNumber: 'student2', password: 'student123', isAdmin: false },
    { registerNumber: 'user', password: 'user123', isAdmin: false },
  ];

  for (const u of users) {
    const exists = await User.findOne({ registerNumber: u.registerNumber });
    if (!exists) {
      const passwordHash = await bcrypt.hash(u.password, 10);
      await User.create({ registerNumber: u.registerNumber, passwordHash, isAdmin: u.isAdmin });
      console.log(`✓ Created ${u.isAdmin ? 'ADMIN' : 'USER'}: ${u.registerNumber}`);
    } else {
      console.log(`- User ${u.registerNumber} already exists (skipped)`);
    }
  }

  // Seed sample products if none exist
  const count = await Product.countDocuments();
  if (count === 0) {
    const now = new Date();
    const sampleProducts = [
      {
        description: 'Black backpack with laptop compartment',
        location: 'Library entrance',
        time: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2),
        imageUrl: '',
        securityOffice: { name: 'Library Security', phone: '+1 555 0101' },
      },
      {
        description: 'Set of keys with red keychain',
        location: 'Main canteen',
        time: new Date(now.getTime() - 1000 * 60 * 60 * 6),
        imageUrl: '',
        securityOffice: { name: 'Main Gate Security', phone: '+1 555 0100' },
      },
      {
        description: 'Blue water bottle',
        location: 'Sports complex',
        time: new Date(now.getTime() - 1000 * 60 * 60 * 30),
        imageUrl: '',
        securityOffice: { name: 'Sports Complex Security', phone: '+1 555 0103' },
      },
    ];
    await Product.insertMany(sampleProducts);
    console.log('✓ Seeded sample products');
  } else {
    console.log(`- ${count} products already exist (skipped seeding products)`);
  }

  await mongoose.disconnect();
  console.log('\n✅ Seed complete!');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
