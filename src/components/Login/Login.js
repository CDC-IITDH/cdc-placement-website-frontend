import React, { useState } from "react";
import { Container, Typography, Grid, Divider } from "@material-ui/core";
import GoogleLogin from "react-google-login";
import { SignIn } from "../../api/auth";
import { Redirect } from "react-router-dom";
import { RefreshTokenSetup } from "../../utils/refreshToken";
import { makeStyles } from "@material-ui/core/styles";
import Button from "react-bootstrap/Button";
import Hidden from "@material-ui/core/Hidden";
import "./Login.css";

const Login = ({
  auth,
  setAuth,
  setToken,
  setUserTypes,
  setShowLoader,
  setError,
  setShowError,
}) => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  var [authLoaded, setAuthLoaded] = useState(false);

  // useEffect(() => {
  //   var token_4 =
  //     "eyJhbGciOiJSUzI1NiIsImtpZCI6ImI2ZjhkNTVkYTUzNGVhOTFjYjJjYjAwZTFhZjRlOGUwY2RlY2E5M2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTU2ODMwMjI5NTU0LTI5MG1pcmMxNnBkaGQ1ajdwaDd2N3VraWJvNHQxcWNwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTU2ODMwMjI5NTU0LTI5MG1pcmMxNnBkaGQ1ajdwaDd2N3VraWJvNHQxcWNwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAyNzczNjY1MTY0ODQ0Njk5MjY4IiwiaGQiOiJpaXRkaC5hYy5pbiIsImVtYWlsIjoiMTkwMDEwMDM2QGlpdGRoLmFjLmluIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJEa0RIQ2dwT29PQ0NGN2txeEI1SlF3IiwibmFtZSI6IlB1dHRpIEdvd3RoYW0gU2FpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpM3J4YXZQclQ1RzF3bkRMQ0V0bE5qZjE5R3pObDA1cWZiQXZGOW93PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlB1dHRpIEdvd3RoYW0gIiwiZmFtaWx5X25hbWUiOiJTYWkiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYyNTU5Mjg5NywiZXhwIjoxNjI1NTk2NDk3LCJqdGkiOiI3NWI3OTk5MDE3OGZjMDMzNGQ1M2IyYTAyYzZlNmVmMzM5YjA4ZmVjIn0.yiXwBFvaenGjWmCvpAL1eScktenrNpH5nlHCXdersE09sY4j1oPbtWJpb8mVjOwHjq6CZQK6r62U7bw9OSY-6Ih7G80aNVjbO0yGx71sL8JWICe_-84v8XFf9gNKDt6fuDn3QkO1RtzVxAQOpN7nyAF4Nn3fZfRY_4LUpVXEjzZb1rkqogRg9YzFUFSdFtLRijosZ1pAMyu9MibXfyblKaR0o9Cw-RhQ_zQKpobaew-BsX1nKa32DnmzW7ZpwAXOJNYjV0R5VJrd2ZjEImAnIGivwhycOnp7z2VHKCPlvygTb4sl0OXh-UQwZabxmBf96jZ-USt2M5lMnnLNmlP6Ug";
  //     var usrtype = ["student", "company"];
  //   setAuth(true);
  //   setToken(token_4);
  //   setUserTypes(usrtype);
  // });
  const useStyles = makeStyles((theme) => ({
    opactiy: {
      opactiy: 1,
    },
    noOpacity: {
      opactiy: 0,
    },
  }));
  const classes = useStyles();

  const googleSuccess = async (res) => {
    const token = res.tokenId;
    SignIn(token)
      .then((result) => {
        return result;
      })
      .then((result) => {
        setAuth(true);
        setToken(token);
        RefreshTokenSetup(res, setToken);
        setUserTypes(result["user_type"]);
      })
      .catch((err) => {
        setAuthLoaded(true);
        setShowLoader(false);
        setAuth(false);
        setToken(null);
        setError("Unregistered Email, Contact CDC To Register");
        setShowError(true);
      });
  };

  const googleFailure = (err) => {
    console.log(err);
    return <Redirect to='/' />;
  };

  return auth ? (
    <Redirect to='/' />
  ) : (
    <div className={authLoaded ? classes.noOpacity : classes.opacity}>
      <Container>
        <Grid
          container
          spacing={2}
          justify='center'
          alignItems='center'
          className='login-parent'
        >
          <Grid item xs={12} sm={6} className='login-name'>
            <Typography
              style={{ color: "#334878", fontWeight: "1000" }}
              align='right'
              variant='h1'
            >
              CDC
            </Typography>
            <Typography style={{ color: "#334878" }} align='right' variant='h5'>
              IIT Dharwad
            </Typography>
          </Grid>
          <Hidden xsDown>
            <Grid item sm={1}>
              <Divider
                orientation='vertical'
                flexItem
                style={{ marginRight: "-1px", height: "200px" }}
              />
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={5} className='login-btn-parent'>
            <GoogleLogin
              clientId={CLIENT_ID}
              render={(renderProps) => (
                <Button
                  className='Button-login'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <div className='login-btn'>SIGN IN</div>
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy='single_host_origin'
              isSignedIn={true}
              onAutoLoadFinished={(loggedIn) => {
                if (!loggedIn) {
                  setAuthLoaded(true);
                  setShowLoader(false);
                }
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
