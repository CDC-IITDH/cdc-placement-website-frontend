import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Divider } from "@material-ui/core";
import { useGoogleLogin } from '@react-oauth/google';
import { SignIn } from "../../api/auth";
import { Redirect } from "react-router-dom";
import { RefreshTokenSetup, RefreshToken } from "../../utils/refreshToken";
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
  var [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    if (auth) {
      setAuthLoaded(true);
    }else{
      if (localStorage.getItem("refresh_token")) {
        RefreshToken().then(
          (result) => {
            if (result) {
              setToken(result["id_token"]);
              setUserTypes(result["user_type"]);
              setAuthLoaded(true);
              setAuth(true);
            }}).catch(
              (err) => {
                localStorage.removeItem("refresh_token");
                setError("Automatic login failed, Please Login again");
                setShowError(true);
                setAuth(false);
              }
            )
      }else{
        setAuthLoaded(true);
        setShowLoader(false);
      }
    }
  }, [auth, setAuth, setError, setShowError, setShowLoader, setToken, setUserTypes]);

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
    setShowLoader(true);
    const code = res.code;  // code is the authorization code that we need to send to the backend to get the id_token
    SignIn(code)
      .then((result) => {
        return result;
      })
      .then((result) => {
        setToken(result["id_token"]); // With the id_token we can get the user details
        setUserTypes(result["user_type"]);
        let store = {
          'refresh_token': result["refresh_token"]
        };
        localStorage.setItem("refresh_token", JSON.stringify(store));
        RefreshTokenSetup(res, setToken, setUserTypes);
        setAuth(true);
        setAuthLoaded(true);
        setShowLoader(false);
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
    setAuthLoaded(true);
    setShowLoader(false);
    setAuth(false);
    setToken(null);
    setError("Google Login Failed");
    setShowError(true);
  };

  const googlelogin = useGoogleLogin({
    onSuccess: googleSuccess,
    onNonOAuthError: googleFailure,
    flow: "auth-code"
  });


  return auth ? (
    <Redirect to='/' />
  ) : (
    <div className={authLoaded ? classes.noOpacity : classes.opacity}>
      <Container>
        <Grid
          container
          spacing={2}
          justifyContent='center'
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
            <Button
                  className='Button-login'
                  onClick={googlelogin}
                >
                  <div className='login-btn'>SIGN IN</div>
                </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
