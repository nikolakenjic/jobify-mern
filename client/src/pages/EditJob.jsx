import { Button, FormRow, FormRowStatusAndTypes } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constant';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import fetchUrl from '../utils/axios';

const EditJob = () => {
  const { job } = useLoaderData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={job.jobLocation || ''}
          />

          <FormRowStatusAndTypes
            name="jobStatus"
            labelText="Job Status"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowStatusAndTypes
            name="jobType"
            labelText="Job Type"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />

          <Button
            type="submit"
            className="form-btn"
            btnName={isSubmitting ? 'Submitting...' : 'Submit'}
            disabled={isSubmitting}
          />
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;

export const loader = async ({ params }) => {
  const { id } = params;

  try {
    const { data } = await fetchUrl.get(`/jobs/${id}`);

    return data;
  } catch (err) {
    toast.error(err?.response?.data?.msg);

    return redirect('/dashboard/all-jobs');
  }
};

export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await fetchUrl.patch(`/jobs/${id}`, data);

    toast.success('Successfully Update');
  } catch (err) {
    toast.error(err?.response?.data?.msg);
  }
  return redirect('/dashboard/all-jobs');
};
