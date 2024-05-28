import React from 'react';
import logo from "../../images/CDC-Logo.png";

const Header = () => {
  return (
    <header style={styles.header}>
      <img  src={logo} alt="Logo" style={styles.logo} />
      
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
    padding: '10px',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    zIndex: '1000',
   
  },
  logo: {
    height: '60px', // Adjust this value as needed
    marginLeft:"60px"
  },
};

export default Header;
