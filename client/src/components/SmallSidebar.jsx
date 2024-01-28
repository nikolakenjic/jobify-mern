import { FaTimes } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/SmallSidebar';
import { useDashboardContext } from '../pages/DashboardLayout';
import Logo from './Logo';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
  const { toggleSidebar, showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? 'show-sidebar' : ''}`}>
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
