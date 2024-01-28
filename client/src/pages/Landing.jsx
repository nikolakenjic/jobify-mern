import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            I&apos;m baby freegan twee keffiyeh, affogato williamsburg
            intelligentsia quinoa neutra. Locavore schlitz austin actually swag
            flexitarian chillwave blue bottle subway tile vexillologist same
            raclette humblebrag keytar stumptown. Cloud bread la croix waistcoat
            kitsch, occupy drinking vinegar knausgaard jean shorts subway tile
            listicle. Irony vexillologist taxidermy, iPhone normcore occupy
            90&apos;s tousled enamel pin edison bulb tonx poutine listicle
            hammock blackbird spyplane.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
