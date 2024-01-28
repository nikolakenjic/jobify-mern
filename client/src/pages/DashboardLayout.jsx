import { createContext, useContext, useState } from 'react';
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import checkDefaultTheme from '../App';
import fetchUrl from '../utils/axios';
import { toast } from 'react-toastify';

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { data } = useLoaderData();
  const { user } = data;
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);

    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar((prevValue) => !prevValue);
  };

  const logoutUser = async () => {
    navigate('/');
    await fetchUrl.get('/auth/logout');
    toast.success(`${user.name} you are logout!`);
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleSidebar,
        toggleDarkTheme,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;

// LOADER DATA
export const loader = async () => {
  try {
    const { data } = await fetchUrl.get('users/current-user');

    return { data };
  } catch (err) {
    console.log(err);
    return redirect('/');
  }
};
