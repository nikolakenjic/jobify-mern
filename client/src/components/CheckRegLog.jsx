/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const CheckRegLog = ({ checkText, route, routeName }) => {
  return (
    <p>
      {checkText}
      <Link to={`/${route}`} className="member-btn">
        {routeName || route}
      </Link>
    </p>
  );
};

export default CheckRegLog;
