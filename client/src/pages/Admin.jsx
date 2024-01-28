import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';
import fetchUrl from '../utils/axios';
import { StatItem } from '../components';

const Admin = () => {
  const { users, jobs } = useLoaderData();

  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};

export default Admin;

export const loader = async () => {
  try {
    const response = await fetchUrl.get('/users/admin/app-stats');
    return response.data;
  } catch (err) {
    toast.error(err?.response?.data?.msg);
    return redirect('/dashboard');
  }
};
