import { createContext, useContext } from 'react';
import fetchUrl from '../utils/axios';
import { useLoaderData } from 'react-router-dom';
import { SearchContainer, JobsContainer } from '../components';

const AllJobsContext = createContext();

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};
export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data } = await fetchUrl.get('/jobs', { params: params });
    // console.log(data);

    return { data, searchValues: { ...params } };
  } catch (err) {
    console.log(err);
    return err;
  }
};
