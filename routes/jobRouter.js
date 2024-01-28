import { Router } from 'express';
import {
  inputJobValidator,
  validateIdParam,
} from '../middleware/validatorMiddleware.js';
import {
  createJob,
  deleteJob,
  editJob,
  getAllJobs,
  getSingleJob,
  showStats,
} from '../controllers/jobController.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllJobs);

router.post('/', checkForTestUser, inputJobValidator, createJob);

router.get('/stats', showStats);

router.get('/:id', validateIdParam, getSingleJob);

router.patch(
  '/:id',
  checkForTestUser,
  inputJobValidator,
  validateIdParam,
  editJob
);

router.delete('/:id', checkForTestUser, validateIdParam, deleteJob);

export default router;
