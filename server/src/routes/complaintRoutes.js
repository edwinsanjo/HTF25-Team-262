const express = require('express');
const { listComplaints, createComplaint, updateComplaint, deleteComplaint, markComplaintResolved } = require('../controllers/complaintController');
const { upload } = require('../middleware/upload');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', listComplaints);
router.post('/', auth(false), upload.single('image'), createComplaint);
router.put('/:id', auth(true), upload.single('image'), updateComplaint);
router.patch('/:id/resolve', auth(true), markComplaintResolved);
router.delete('/:id', auth(true), deleteComplaint);

module.exports = router;
