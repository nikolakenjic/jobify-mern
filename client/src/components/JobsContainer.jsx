import Wrapper from '../assets/wrappers/JobsContainer';
import Job from './Job';
import { useAllJobsContext } from '../pages/AllJobs';
import PageBtnContainer from './PageBtnContainer';

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;

  const jobList = jobs.map((job) => <Job key={job._id} {...job} />);

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{totalJobs > 1 && 's'} found.
      </h5>
      <div className="jobs">{jobList}</div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
