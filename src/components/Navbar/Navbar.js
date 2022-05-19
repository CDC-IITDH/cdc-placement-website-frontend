import {Toolbar, AppBar} from "@material-ui/core";
import logo from "../../images/cdc_logo.png";

import useStyles from "./styles";

const Navbar = ({auth, setAuth, setToken}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <img style={{width: "150px"}} src={logo} alt="cdc-logo"/>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
