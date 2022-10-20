import Button from 'react-bootstrap/Button';
import { Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import './UserSwitch.css';

const UserSwitch = ({
	userTypes,
	setCurrentUserType,
	setAuth,
	currentUserType,
	auth,
	setShowLoader,
}) => {
	useEffect(() => {
		if (auth) {
			if (!currentUserType) {
				if (!userTypes.length) {
					setAuth(false);
				} else if (userTypes.length === 1) {
					setCurrentUserType(userTypes[0]);
				} else {
					var path =
						window.location.pathname.split('/').length > 2
							? window.location.pathname.split('/')[2]
							: null;
					if (path && userTypes.includes(path) && path !== 's_admin')
						setCurrentUserType(path);
					else setShowLoader(false);
				}
			}
		}
	});

	return (
		<div>
			<div>
				<Container>
					<Grid
						style={{ marginTop: '10%' }}
						container
						spacing={5}
						justifyContent='center'
						alignItems='center'
					>
						<Grid item>
							<div className='UserType-headinfo'>
								Please Select One of the User Profile to Proceed
							</div>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={5}
						justifyContent='center'
						alignItems='center'
					>
						{userTypes.map((item, i) => {
							if (item === 's_admin') return null;
							return (
								<Grid item key={i} xs={12} sm>
									<div className='UserType-btn-parent' key={i}>
										<Button
											className='UserType-btn'
											onClick={() => {
												setCurrentUserType(item);
												setShowLoader(true);
											}}
										>
											{item.toUpperCase()}
										</Button>
									</div>
								</Grid>
							);
						})}
					</Grid>
				</Container>
			</div>
		</div>
	);
};

export default UserSwitch;
