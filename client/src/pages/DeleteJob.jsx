import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import fetchUrl from '../utils/axios';

export const action = async ({ params }) => {
  const { id } = params;
  console.log(id);
  try {
    await fetchUrl.delete(`/jobs/${id}`);
    toast.success('Successfully Delete');
  } catch (err) {
    toast.error(err?.response?.data?.msg);
  }
  return redirect('/dashboard/all-jobs');
};
