import {AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar,} from "@material-ui/core";
import {Fragment, useState} from "react";
import logo from "../../images/cdc_logo.png";
import {Link} from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";

import useStyles from "./styles";
import LogOut from "../Logout/Logout";

const Navbar = ({
                    auth,
                    setAuth,
                    setToken,
                    setCurrentUserType,
                    setShowProfile,
                    showModal,
                    setShowModal,
                    ModalType,
                    setModalType
                }) => {
    const classes = useStyles();
    const smallScreens = useMediaQuery("(max-width:600px)");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return auth ? (
			<div>
				<AppBar position='static' className={classes.appbar}>
					<Toolbar>
						<Link to='/admin'>
							<img style={{ width: '150px' }} src={logo} alt='cdc-logo' />
						</Link>
						{smallScreens ? (
							<Fragment>
								<IconButton
									style={{ marginLeft: 'auto' }}
									aria-label='account of current user'
									aria-controls='menu-appbar'
									aria-haspopup='true'
									onClick={handleMenu}
									color='inherit'
								>
									<MenuIcon />
								</IconButton>

								<Menu
									id='menu-appbar'
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={open}
									onClose={handleClose}
								>
									<MenuItem onClick={handleClose}>
										<Link className={classes.links} to='/admin/'>
											Dashboard
										</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<Link className={classes.links} to='/admin/statistics'>
											Statistics
										</Link>
									</MenuItem>
									<MenuItem onClick={handleClose}>
										<div
											className={classes.links}
											onClick={() => {
												setShowModal(true);
												setModalType('addPPO');
											}}
										>
											Add PPO
										</div>
									</MenuItem>
									<MenuItem>
										<LogOut
											auth={auth}
											setAuth={setAuth}
											setToken={setToken}
											setCurrentUserType={setCurrentUserType}
										/>
									</MenuItem>
								</Menu>
							</Fragment>
						) : (
							<Box flexGrow={1} textAlign='right'>
								<Button>
									<Link className={classes.navbarLinks} to='/admin'>
										DashBoard
									</Link>
								</Button>
								<Button>
									<Link className={classes.navbarLinks} to='/admin/statistics'>
										Statistics
									</Link>
								</Button>
								<Button>
									<div
										className={classes.navbarLinks}
										onClick={() => {
											setShowModal(true);
											setModalType('addPPO');
										}}
									>
										Add PPO
									</div>
								</Button>
								<LogOut
									auth={auth}
									setAuth={setAuth}
									setToken={setToken}
									setCurrentUserType={setCurrentUserType}
								/>
							</Box>
						)}
					</Toolbar>
				</AppBar>
			</div>
		) : (
			<div className={classes.root}>
				<AppBar position='static' className={classes.appbar}>
					<Toolbar>
						<img style={{ width: '150px' }} src={logo} alt='cdc-logo' />
					</Toolbar>
				</AppBar>
			</div>
		);
};

export default Navbar;
