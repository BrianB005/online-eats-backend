const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserRole,
  updateUserPassword,
  deleteUser,
  getALlVendors,
  getALlAdmins,
} = require('../controllers/userController');

router
  .route('/')
  .get(authenticateUser, authorizePermissions('admin'), getAllUsers);
router
.route('/vendors')
.get(authenticateUser, authorizePermissions('admin'), getALlVendors);

router
.route('/admins')
.get(authenticateUser, authorizePermissions('admin'), getALlAdmins);

router.route('/currentUser').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);
router.route('/deleteAccount').delete(authenticateUser, deleteUser);
router.route('/find/:id').get(authenticateUser, getSingleUser).patch(authenticateUser,authorizePermissions("admin"),updateUserRole)

module.exports = router;
