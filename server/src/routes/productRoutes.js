const express = require('express');
const { listProducts, createProduct, updateProduct, deleteProduct, markProductResolved, claimProduct, listClaimedByMe, declaimProduct, listProductsAdmin } = require('../controllers/productController');
const { upload } = require('../middleware/upload');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', listProducts);
router.get('/admin', auth(true), listProductsAdmin);
router.post('/', auth(false), upload.single('image'), createProduct);
router.put('/:id', auth(true), upload.single('image'), updateProduct);
router.patch('/:id/resolve', auth(true), markProductResolved);
router.patch('/:id/claim', auth(false), claimProduct);
router.patch('/:id/declaim', auth(false), declaimProduct);
router.get('/claimed', auth(false), listClaimedByMe);
router.delete('/:id', auth(true), deleteProduct);

module.exports = router;
