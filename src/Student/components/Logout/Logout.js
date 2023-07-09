import React from "react";
import "./Logout.css";
import Button from "react-bootstrap/Button";

const Logout = ({ auth, setAuth, setToken, setCurrentUserType }) => {

  const onLogout = (res) => {
    localStorage.removeItem("refresh_token");
    setToken(null);
    setAuth(false);
    setCurrentUserType(null);
  };

  return (
    <Button
      className="Button-logout"
      onClick={onLogout}>

      <div className="logout-btn">SIGN OUT</div>

    </Button>
  );
};

export default Logout;
