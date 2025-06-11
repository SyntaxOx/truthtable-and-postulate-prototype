import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSun} from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/Logo.png';
import './CSS/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  // Navigation functions
  const home = () => navigate('/');
  const truthTable = () => navigate('/truth-table');
  const identity = () => navigate('/identity');
  const inverse = () => navigate('/inverse');
  const commutative = () => navigate('/commutative');
  const demorgan = () => navigate('/demorgan');
  const distributive = () => navigate('/distributive');
  const associative = () => navigate('/associative');

  return (
    <>
      <div id="navbar">
        <img src={Logo} alt="" />

        <div id="button">
          <button id="home" onClick={home}>Home</button>
          <button id="truthTable" onClick={truthTable}>Truth Table</button>
          <button id="identity" onClick={identity}>Identity</button>
          <button id="inverse" onClick={inverse}>Inverse</button>
          <button id="commutative" onClick={commutative}>Commutative</button>
          <button id="demorgan" onClick={demorgan}>De Morgan</button>
          <button id="distributive" onClick={distributive}>Distributive</button>
          <button id="associative" onClick={associative}>Associative</button>
        </div>

        <div id="icons">
          <FontAwesomeIcon icon={faSun}/>
        </div>
      </div>
    </>
  );
};

export default Navbar;