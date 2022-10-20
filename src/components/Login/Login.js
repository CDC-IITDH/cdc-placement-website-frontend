import React, { useState } from 'react';
import { Container, Typography, Grid, Divider } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { SignIn } from '../../api/auth';
import { Redirect } from 'react-router-dom';
import { RefreshTokenSetup } from '../../utils/refreshToken';
import { makeStyles } from '@material-ui/core/styles';
import Button from 'react-bootstrap/Button';
import Hidden from '@material-ui/core/Hidden';
import './Login.css';

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
				setUserTypes(result['user_type']);
			})
			.catch((err) => {
				setAuthLoaded(true);
				setShowLoader(false);
				setAuth(false);
				setToken(null);
				setError('Unregistered Email, Contact CDC To Register');
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
					justifyContent='center'
					alignItems='center'
					className='login-parent'
				>
					<Grid item xs={12} sm={6} className='login-name'>
						<Typography
							style={{ color: '#334878', fontWeight: '1000' }}
							align='right'
							variant='h1'
						>
							CDC
						</Typography>
						<Typography style={{ color: '#334878' }} align='right' variant='h5'>
							IIT Dharwad
						</Typography>
					</Grid>
					<Hidden xsDown>
						<Grid item sm={1}>
							<Divider
								orientation='vertical'
								flexItem
								style={{ marginRight: '-1px', height: '200px' }}
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
