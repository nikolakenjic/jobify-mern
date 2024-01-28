/* eslint-disable react/prop-types */
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Button from './Button';
day.extend(advancedFormat);

const Job = ({
  _id: paramsId,
  company,
  position,
  jobStatus,
  jobLocation,
  jobType,
  createdAt,
}) => {
  const date = day(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}>{jobStatus}</div>
        </div>

        <footer className="actions">
          <Link to={`../edit-job/${paramsId}`} className="btn edit-btn">
            Edit
          </Link>
          <Form method="delete" action={`../delete-job/${paramsId}`}>
            <Button type="submit" btnName="Delete" className="delete-btn" />
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
