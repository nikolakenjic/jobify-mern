import { Button, FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { useNavigation, Form } from 'react-router-dom';
import fetchUrl from '../utils/axios';
import { toast } from 'react-toastify';
// import { useDashboardContext } from './DashboardLayout';

const Profile = () => {
  const { user } = useOutletContext();
  const { name, email, lastName, location } = user;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="image" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow type="text" name="lastName" defaultValue={lastName} />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
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

export default Profile;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('avatar');

  if (file && file.size > 5000000) {
    toast.error('Image size too large');
    return null;
  }

  try {
    await fetchUrl.patch('/users/update-user', formData);

    toast.success('Update user profile');
  } catch (err) {
    toast.error(err?.response?.data?.msg);
  }
  return null;
};
