import { FormRow, FormRowStatusAndTypes } from '.';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { JOB_TYPE, JOB_STATUS, JOB_SORTED_BY } from '../../../utils/constant';
import { useAllJobsContext } from '../pages/AllJobs';

const SearchContainer = () => {
  const submit = useSubmit();
  const { searchValues } = useAllJobsContext();
  const { search, jobStatus, jobType, sort } = searchValues;

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 700);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search All Jobs</h5>
        <div className="form-center">
          <FormRow
            type="search"
            name="search"
            isRequired={false}
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowStatusAndTypes
            labelText="job status"
            name="jobStatus"
            list={['all', ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => submit(e.currentTarget.form)}
          />

          <FormRowStatusAndTypes
            labelText="job type"
            name="jobType"
            list={['all', ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => submit(e.currentTarget.form)}
          />

          <FormRowStatusAndTypes
            name="sort"
            defaultValue={sort}
            list={Object.values(JOB_SORTED_BY)}
            onChange={(e) => submit(e.currentTarget.form)}
          />

          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
