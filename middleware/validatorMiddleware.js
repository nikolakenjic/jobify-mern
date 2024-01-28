import { body, validationResult, param } from 'express-validator';
import mongoose from 'mongoose';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constant.js';
import Job from '../models/jobModel.js';
import User from '../models/UserModel.js';

const validatorWithErrors = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMsgs = errors.array().map((error) => error.msg);
        console.log(errorMsgs);
        if (errorMsgs[0].startsWith('Could not')) {
          throw new NotFoundError(errorMsgs);
        }
        if (errorMsgs[0].startsWith('not authorized')) {
          throw new UnauthorizedError('not authorized to access this route');
        }
        throw new BadRequestError(errorMsgs);
      }
      next();
    },
  ];
};

// JOB VALIDATION
export const inputJobValidator = validatorWithErrors([
  body('company', 'Company name is required')
    .notEmpty()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Min 3 character, max 50'),
  body('position', 'Position is required')
    .notEmpty()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Min 3 character, max 50'),
  body('jobStatus', 'Invalid Status Value').isIn(Object.values(JOB_STATUS)),
  body('jobType', 'Invalid Type Value').isIn(Object.values(JOB_TYPE)),
  body('jobLocation', 'Job Location is required').notEmpty(),
]);

export const validateIdParam = validatorWithErrors([
  param('id').custom(async (value, { req }) => {
    const isIdValid = mongoose.Types.ObjectId.isValid(value);

    if (!isIdValid) {
      throw new BadRequestError('Invalid MongoDB ID');
    }

    const job = await Job.findOne({ _id: value });

    if (!job) throw new NotFoundError(`Could not found the job ID: ${value}`);

    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === job.createdBy.toString();

    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError('not authorized to access this route');
    }
  }),
]);

// USER VALIDATION
export const validateRegisterUser = validatorWithErrors([
  body('name', 'Name is required')
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 30 })
    .withMessage('Min 3, max 30 character'),
  body('email', 'Please enter a valid email')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (value) => {
      const userDoc = await User.findOne({ email: value });
      if (userDoc) {
        throw new BadRequestError('Email already exist');
      }
    }),
  body('password', 'Password is required')
    .trim()
    .isLength({ min: 6, max: 30 })
    .withMessage('Min 6, max 30 character'),
  body('location').notEmpty().withMessage('location is required'),
  body('lastName').notEmpty().withMessage('last name is required'),
]);

export const validateLoginUser = validatorWithErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);

// UPDATE USER VALIDATION
export const validateUpdateUser = validatorWithErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
]);
