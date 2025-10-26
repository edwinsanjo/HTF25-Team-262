const Product = require('../models/Product');

async function listProducts(_req, res) {
  try {
    // Only return unresolved and unclaimed items
    const items = await Product.find({ resolved: false, claimed: false }).sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
}

async function createProduct(req, res) {
  try {
    const { description, location, time } = req.body;
    // Support either securityOffice object (JSON) or individual fields
    let securityOffice = undefined;
    try {
      if (req.body.securityOffice) {
        const so = typeof req.body.securityOffice === 'string' ? JSON.parse(req.body.securityOffice) : req.body.securityOffice;
        if (so && (so.name || so.phone)) {
          securityOffice = { name: so.name || '', phone: so.phone || '' };
        }
      } else if (req.body.securityOfficeName || req.body.securityOfficePhone) {
        securityOffice = { name: req.body.securityOfficeName || '', phone: req.body.securityOfficePhone || '' };
      }
    } catch (_) {
      // Ignore malformed JSON, proceed without securityOffice
    }
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : '';
    const payload = { description, location, time, imageUrl };
    if (securityOffice) payload.securityOffice = securityOffice;
    const doc = await Product.create(payload);
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ message: 'Failed to create product', error: e?.message });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { description, location, time } = req.body;
    
    const updateData = { description, location, time };
    // Update securityOffice if provided
    try {
      if (req.body.securityOffice) {
        const so = typeof req.body.securityOffice === 'string' ? JSON.parse(req.body.securityOffice) : req.body.securityOffice;
        if (so && (so.name || so.phone)) {
          updateData.securityOffice = { name: so.name || '', phone: so.phone || '' };
        }
      } else if (req.body.securityOfficeName || req.body.securityOfficePhone) {
        updateData.securityOffice = { name: req.body.securityOfficeName || '', phone: req.body.securityOfficePhone || '' };
      }
    } catch (_) {
      // ignore
    }
    
    // If a new image is uploaded, update the imageUrl
    if (req.file) {
      updateData.imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    
    const doc = await Product.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!doc) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(doc);
  } catch (e) {
    res.status(400).json({ message: 'Failed to update product', error: e?.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const doc = await Product.findByIdAndDelete(id);
    
    if (!doc) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully', id });
  } catch (e) {
    res.status(400).json({ message: 'Failed to delete product', error: e?.message });
  }
}

async function markProductResolved(req, res) {
  try {
    const { id } = req.params;
    const doc = await Product.findByIdAndUpdate(
      id,
      { resolved: true },
      { new: true }
    );
    
    if (!doc) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product marked as resolved', product: doc });
  } catch (e) {
    res.status(400).json({ message: 'Failed to mark product as resolved', error: e?.message });
  }
}

async function claimProduct(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const doc = await Product.findById(id);
    if (!doc) return res.status(404).json({ message: 'Product not found' });
    if (doc.resolved) return res.status(400).json({ message: 'Item already resolved' });
    if (doc.claimed) return res.status(400).json({ message: 'Item already claimed' });

    doc.claimed = true;
    doc.claimedBy = userId;
    doc.claimedAt = new Date();
    await doc.save();

    res.json({ message: 'Item claimed', product: doc });
  } catch (e) {
    res.status(400).json({ message: 'Failed to claim product', error: e?.message });
  }
}

async function listClaimedByMe(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const items = await Product.find({ claimed: true, claimedBy: userId }).sort({ claimedAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch claimed items' });
  }
}

async function declaimProduct(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const isAdmin = !!req.user?.isAdmin;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const doc = await Product.findById(id);
    if (!doc) return res.status(404).json({ message: 'Product not found' });
    if (!doc.claimed) return res.status(400).json({ message: 'Item is not claimed' });
    if (!isAdmin && doc.claimedBy?.toString() !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    doc.claimed = false;
    doc.claimedBy = null;
    doc.claimedAt = null;
    await doc.save();

    res.json({ message: 'Item unclaimed', product: doc });
  } catch (e) {
    res.status(400).json({ message: 'Failed to unclaim product', error: e?.message });
  }
}

async function listProductsAdmin(_req, res) {
  try {
    // Return all unresolved items, including claimed and unclaimed, for admin view
    const items = await Product.find({ resolved: false })
      .populate('claimedBy', 'registerNumber')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch admin products' });
  }
}

module.exports = { listProducts, createProduct, updateProduct, deleteProduct, markProductResolved, claimProduct, listClaimedByMe, declaimProduct, listProductsAdmin };
