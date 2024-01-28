import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Button, CheckRegLog, FormRow, Logo } from '../components';
import fetchUrl from '../utils/axios';

const Login = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const errors = useActionData();

  const loginTestUser = async () => {
    const data = { email: 'test@test.com', password: 'secret123' };

    try {
      await fetchUrl.post('/auth/login', data);
      toast.success('Demo mode login');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.msg);
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {errors?.msg && <p style={{ color: 'red' }}>{errors.msg}</p>}

        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />

        <Button
          type="submit"
          btnName={isSubmitting ? 'Submitting...' : 'Submit'}
        />
        <Button btnName="Explore the App" onClick={loginTestUser} />

        <CheckRegLog checkText="You are not a member yet?" route="register" />
      </Form>
    </Wrapper>
  );
};

export default Login;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: '' };

  if (data.password.length < 3) {
    errors.msg = 'password too short';
    return errors;
  }

  try {
    await fetchUrl.post('/auth/login', data);
    toast.success('Registration successful');

    return redirect('/dashboard');
  } catch (err) {
    // toast.error(err?.response?.data?.msg);
    errors.msg = err?.response?.data?.msg;
    return errors;
  }
};
