const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const { uploadsDir } = require('./middleware/upload');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://edw:oOj9LZD9iqFgCEwf@cluster.omndo6m.mongodb.net/?appName=CLUSTER';

async function start() {
  await connectDB(MONGODB_URI);

  const app = express();
  app.use(cors({ origin: /http:\/\/localhost:(3000|3001)/ }));
  app.use(express.json());

  app.use('/uploads', express.static(uploadsDir));

  app.get('/api/health', (_req, res) => res.json({ ok: true }));
  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/complaints', complaintRoutes);

  app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
}

module.exports = { start };



