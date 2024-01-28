import { Router } from 'express';
const router = Router();
import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from '../controllers/userController.js';
import { validateUpdateUser } from '../middleware/validatorMiddleware.js';
import {
  authorizePermissions,
  checkForTestUser,
} from '../middleware/authMiddleware.js';
import upload from '../middleware/multerMiddlware.js';

router.get('/current-user', getCurrentUser);
router.get(
  '/admin/app-stats',
  authorizePermissions('admin'),
  getApplicationStats
);
router.patch(
  '/update-user',
  upload.single('avatar'),
  checkForTestUser,
  validateUpdateUser,
  updateUser
);

export default router;
