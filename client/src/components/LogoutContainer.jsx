/* eslint-disable no-unused-vars */
import { FaUserCircle, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();

  return (
    <Wrapper>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogout((prevValue) => !prevValue)}
      >
        <FaUserCircle />
        {user?.name}
        {showLogout ? <FaCaretUp /> : <FaCaretDown />}
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          Logout
        </button>
      </div>
    </Wrapper>
  );
};

export default LogoutContainer;
