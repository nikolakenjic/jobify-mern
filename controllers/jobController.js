import mongoose from 'mongoose';
import day from 'dayjs';
import Job from '../models/jobModel.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';

// GET ALL JOBS
export const getAllJobs = async (req, res, next) => {
  const { search, jobStatus, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }

  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus;
  }

  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // Setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);

  const numOfPages = Math.ceil(totalJobs / limit);

  // if (page > numOfPages) {
  //   throw new NotFoundError('Not Found Pages');
  // }

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

// CREATE JOB
export const createJob = async (req, res, next) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

// GET SINGLE JOB
export const getSingleJob = async (req, res, next) => {
  const { id } = req.params;

  const job = await Job.findOne({ _id: id });

  res.status(StatusCodes.OK).json({ job });
};

// EDIT JOB
export const editJob = async (req, res, next) => {
  const { company, position } = req.body;
  const { id } = req.params;

  if (!company || !position)
    throw new BadRequestError(
      'Empty value, Enter correct value for company and position'
    );

  const updatedJob = await Job.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: 'job edit', job: updatedJob });
};

// DELETE JOB
export const deleteJob = async (req, res, next) => {
  const { id } = req.params;
  await Job.findByIdAndDelete({ _id: id });

  res.status(StatusCodes.OK).json({ msg: 'Success, Delete job' });
};

// SHOW STATS
export const showStats = async (req, res, next) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  console.log(stats);

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
