import { Form, redirect, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import fetchUrl from '../utils/axios';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow, Button, CheckRegLog } from '../components';

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" />
        <FormRow type="text" name="lastName" labelText="Last Name" />
        <FormRow type="text" name="location" />
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />

        <Button
          type="submit"
          btnName={isSubmitting ? 'Submitting...' : 'Submit'}
        />
        <CheckRegLog checkText="Already member?" route="login" />
      </Form>
    </Wrapper>
  );
};

export default Register;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await fetchUrl.post('/auth/register', data);
    toast.success('Registration successful');
    return redirect('/login');
  } catch (err) {
    toast.error(err?.response?.data?.msg);
    return err;
  }
};
