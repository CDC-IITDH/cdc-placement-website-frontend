import React from "react";
import { GoogleLogout } from "react-google-login";
import "./Logout.css";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

function Logout({ auth, setAuth, setToken, setCurrentUserType }) {
  const history = useHistory();
  const onSuccess = (res) => {
    setAuth(false);
    setToken(null);
    setCurrentUserType(null);
    return history.push("/");
  };
  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <GoogleLogout
      clientId={CLIENT_ID}
      buttonText="Logout"
      render={(renderProps) => (
        <Button
          className="Button-logout"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <div className="logout-btn">SIGN OUT</div>
        </Button>
      )}
      onLogoutSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
}

export default Logout;
