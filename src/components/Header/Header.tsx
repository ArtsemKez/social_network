import React from 'react';
import s from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {AppBar, makeStyles, Toolbar, IconButton, Typography, Button} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}

export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {

    const classes = useStyles();

    return <div className={classes.root}>
        <AppBar>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h5" className={classes.title}>
                    Social Network
                </Typography>
                <div>
                    {props.isAuth ? <div> {props.login}
                            <Button color="inherit" onClick={props.logout}>Logaut</Button>
                        </div>
                        : <Button color="inherit"><NavLink to='/login'>LOGIN</NavLink></Button>}
                </div>
            </Toolbar>
        </AppBar>
    </div>
}

export default Header;