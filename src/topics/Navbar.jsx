import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/Logo.png';
import './CSS/navbar.css';

// Read from localStorage BEFORE rendering
const getInitialTheme = () => {
  const saved = localStorage.getItem('themeActive');
  return saved === 'true'; // default is false if null
};

const Navbar = () => {
  const [active, setActive] = useState(getInitialTheme); // initialize with localStorage
  const refSun = useRef(null);
  const refMoon = useRef(null);
  const navbuttonRef  = useRef(null);
  const naviconRef  = useRef(null);

  const navigate = useNavigate();

  // Update background and localStorage whenever theme changes
  useEffect(() => {
    document.body.style.backgroundColor = active ? 'rgb(255, 242, 207)' : 'rgb(6, 2, 27)';
    document.body.style.color = active ? 'rgb(6, 2, 27)' : 'rgb(255, 242, 207)'; 
    localStorage.setItem('themeActive', active);
  }, [active]);

  useEffect(() => {
    if (navbuttonRef.current) {
      const buttons = navbuttonRef.current.querySelectorAll('button');
      buttons.forEach(button => {
        button.style.color = active ? 'rgb(6, 2, 27)' : 'rgb(255, 242, 207)';
      });
    }
    if (naviconRef.current) {
      const icon = naviconRef.current.querySelector('.icon');
      icon.style.color = active ? 'rgb(6, 2, 27)' : 'rgb(255, 242, 207)';
    }
  }, [active]);

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

        <div id="button" ref={navbuttonRef}>
          <button id="home" onClick={home}>Home</button>
          <button id="truthTable" onClick={truthTable}>Truth Table</button>
          <button id="identity" onClick={identity}>Identity</button>
          <button id="inverse" onClick={inverse}>Inverse</button>
          <button id="commutative" onClick={commutative}>Commutative</button>
          <button id="demorgan" onClick={demorgan}>De Morgan</button>
          <button id="distributive" onClick={distributive}>Distributive</button>
          <button id="associative" onClick={associative}>Associative</button>
        </div>

        <div id="icons" ref={naviconRef}>
          <FontAwesomeIcon 
            icon={faSun} 
            className={`icon ${!active ? 'active' : ''}`} 
            onClick={() => setActive(false)}
            ref={refSun}
          />
          <FontAwesomeIcon 
            icon={faMoon} 
            className={`icon ${active ? 'active' : ''}`} 
            onClick={() => setActive(true)}
            ref={refMoon}
          /> 
        </div>
      </div>
    </>
  );
};

export default Navbar;















// FIRST WORK THAT DIDNT WORK

// import { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
// import './CSS/navbar.css';

// const Navbar = () => {
//   const [active, setActive] = useState(false);
//   const refSun = useRef(null);
//   const refMoon = useRef(null);

//   // Load theme from localStorage on component mount
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('themeActive');
//     if (savedTheme !== null) {
//       setActive(savedTheme === 'true');
//     }
//   }, []);

//   // Update theme and save to localStorage
//   useEffect(() => {
//     const body = document.body;
//     localStorage.setItem('themeActive', active);
//     body.style.backgroundColor = active ? 'white' : 'black';
//   }, [active]);

//   // Navigation handlers
//   const navigate = useNavigate();

//   const home = () => navigate('/');
//   const truthTable = () => navigate('/truth-table');
//   const identity = () => navigate('/identity');
//   const inverse = () => navigate('/inverse');
//   const commutative = () => navigate('/commutative');
//   const demorgan = () => navigate('/demorgan');
//   const distributive = () => navigate('/distributive');
//   const associative = () => navigate('/associative');

//   return (
//     <>
//       <div id="navbar">
//         <img src="/assets/Logo.png" alt="" />

//         <div id="button">
//           <button id="home" onClick={home}>Home</button>
//           <button id="truthTable" onClick={truthTable}>Truth Table</button>
//           <button id="identity" onClick={identity}>Identity</button>
//           <button id="inverse" onClick={inverse}>Inverse</button>
//           <button id="commutative" onClick={commutative}>Commutative</button>
//           <button id="demorgan" onClick={demorgan}>De Morgan</button>
//           <button id="distributive" onClick={distributive}>Distributive</button>
//           <button id="associative" onClick={associative}>Associative</button>
//         </div>

//         <div id="icons">
//           <FontAwesomeIcon 
//             icon={faSun} 
//             className={`icon ${!active ? 'active' : ''}`} 
//             onClick={() => setActive(false)}
//             ref={refSun}
//           />
//           <FontAwesomeIcon 
//             icon={faMoon} 
//             className={`icon ${active ? 'active' : ''}`} 
//             onClick={() => setActive(true)}
//             ref={refMoon}
//           /> 
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
