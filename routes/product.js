const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getAllCategories,
  searchCategoryProducts
} = require('../controllers/productController');



router
  .route('/')
  .post([authenticateUser, authorizePermissions('vendor')], createProduct)
  .get(getAllProducts);


router
  .route('/find/:id')
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions('vendor')], updateProduct)
  .delete([authenticateUser, authorizePermissions('vendor')], deleteProduct);


router.route('/search').get(searchProducts);
router.route('/category').get(searchCategoryProducts);
router.route('/categories').get(getAllCategories);

module.exports = router;
