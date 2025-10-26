const Complaint = require('../models/Complaint');

async function listComplaints(_req, res) {
  try {
    // Only return unresolved items
    const items = await Complaint.find({ resolved: false }).sort({ createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch complaints' });
  }
}

async function createComplaint(req, res) {
  try {
    const { description, location, time } = req.body;
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : '';
    const doc = await Complaint.create({ description, location, time, imageUrl });
    res.status(201).json(doc);
  } catch (e) {
    res.status(400).json({ message: 'Failed to create complaint', error: e?.message });
  }
}

async function updateComplaint(req, res) {
  try {
    const { id } = req.params;
    const { description, location, time } = req.body;
    
    const updateData = { description, location, time };
    
    // If a new image is uploaded, update the imageUrl
    if (req.file) {
      updateData.imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    
    const doc = await Complaint.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!doc) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    res.json(doc);
  } catch (e) {
    res.status(400).json({ message: 'Failed to update complaint', error: e?.message });
  }
}

async function deleteComplaint(req, res) {
  try {
    const { id } = req.params;
    const doc = await Complaint.findByIdAndDelete(id);
    
    if (!doc) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    res.json({ message: 'Complaint deleted successfully', id });
  } catch (e) {
    res.status(400).json({ message: 'Failed to delete complaint', error: e?.message });
  }
}

async function markComplaintResolved(req, res) {
  try {
    const { id } = req.params;
    const doc = await Complaint.findByIdAndUpdate(
      id,
      { resolved: true },
      { new: true }
    );
    
    if (!doc) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    
    res.json({ message: 'Complaint marked as resolved', complaint: doc });
  } catch (e) {
    res.status(400).json({ message: 'Failed to mark complaint as resolved', error: e?.message });
  }
}

module.exports = { listComplaints, createComplaint, updateComplaint, deleteComplaint, markComplaintResolved };
