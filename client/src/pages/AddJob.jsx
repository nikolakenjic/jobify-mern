import { Button, FormRow, FormRowStatusAndTypes } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/constant';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import fetchUrl from '../utils/axios';

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow
            type="text"
            labelText="job location"
            name="jobLocation"
            defaultValue={user.location || ''}
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
          />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await fetchUrl.post('/jobs', data);
    toast.success('Successfully added a job');
    return redirect('all-jobs');
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.msg);
    return err;
  }
};
