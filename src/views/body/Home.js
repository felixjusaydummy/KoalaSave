import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import {Provider, connect} from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Copyright from "../foot/Copyright";
import { useStyles } from "../../css/home";

import { 
  URL_USER_HOME, 
  URL_USER_PURSE, 
  URL_USER_VAULT, 
  URL_USER_RECOMMEDATION 
} from "../../js/constants/url-list";

import mainListItems from '../drawer/listItems'
import Dashboard from './Dashboard'
import Purse from './Purse'
import Vault from './Vault'
import Recommendation from './Recommendation'








function Home(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      
      <BrowserRouter>
        <CssBaseline />

        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {/* Dashboard */}
            </Typography>

            <IconButton color="inherit">
              {/* <Badge badgeContent={4} color="secondary"> */}
                <NotificationsIcon />
              {/* </Badge> */}
            </IconButton>
          </Toolbar>
        </AppBar>



        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
          
            <IconButton onClick={handleDrawerClose}>
                {props.app_name}
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
            <List>{mainListItems}</List>
          <Divider />
        </Drawer>



        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Grid container >
            <Switch>
                <Route exact path={URL_USER_HOME}  component = {Dashboard}/>
                <Route path={URL_USER_PURSE}  component = {Purse}/>
                <Route path={URL_USER_VAULT}  component={Vault}/>
                <Route path={URL_USER_RECOMMEDATION}  component={Recommendation}/>
              </Switch>
            </Grid>
            <Copyright />
          </Container>
        </main>

        
        
      </BrowserRouter>
    </div>
  );

  }
  

function mapStateToProps(state){
  return state;
}
  
// function mapDispatchToProps(dispatch){
//     return dispatch
// }
  
export default connect(mapStateToProps)(Home);