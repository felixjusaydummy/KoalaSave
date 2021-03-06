import React, { Fragment } from 'react';
import clsx from 'clsx';
// import Store from './../../js/store'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';





//ICONS
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuOpenSharpIcon from '@material-ui/icons/MenuOpenSharp';
import StarIcon from '@material-ui/icons/Star';

import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Copyright from "../foot/Copyright";
import { useStyles } from "../../css/home";

import * as URL_LIST from "../../js/constants/url-list"

import * as ACTIONTYPE from "../../js/constants/action-type"

import * as mainListItems from '../drawer/listItems'
import Dashboard from './Dashboard'
import Purse from './Purse'
import Vault from './Vault'
import Inbox from './Inbox'
import Setting from './Setting'
import Account from './Account'
import UserAccount from  './UserAccounts'
import InviteFriends from './InviteFriends'




function Home(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const loadingpage = (
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
            
          </Toolbar>
        </AppBar>


        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Grid container >
              <div>
                LOADING...
              </div>
            </Grid>
          </Container>
        </main>
      </BrowserRouter>
    </div>
  )

  const brokenLink = (
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
            
          </Toolbar>
        </AppBar>


        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Grid container >
              <div>
                Broken Link. Try again reloading the page
              </div>
            </Grid>
          </Container>
        </main>
      </BrowserRouter>
    </div>
  )

  const getTitleHeadName = ()=>{
    if(props.user && props.user.name){
      return ("Hi "+ props.user.name)
    }else{
      return props.app_name
    }
  }

  const page  =  (
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

            <IconButton 
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerClose}
              className={clsx(classes.menuButton, !open && classes.menuButtonHidden)}
              >
              <MenuOpenSharpIcon />
            </IconButton>


            
            {/* <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
            </Typography> */}

            {/* <IconButton color="inherit"> */}
              {/* <Badge badgeContent={4} color="secondary"> */}
                {/* <NotificationsIcon /> */}
              {/* </Badge> */}
            {/* </IconButton> */}
          </Toolbar>
        </AppBar>



        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          
          
            
            <List>
              <ListItem >
                <ListItemIcon>
                  <StarIcon/>
                </ListItemIcon>
                <ListItemText >
                  {getTitleHeadName()+"!"}
                </ListItemText>
              </ListItem>  
            </List>
          
            
          
          <Divider />
          
            <List>{mainListItems.mainfunction(props)}</List>
            {/* <List>{mainListItems}</List> */}
          <Divider />
        </Drawer>




        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Grid container >
            <Switch>
                <Route exact path={URL_LIST.URL_USER_HOME}  component = {Dashboard} />
                <Route path={URL_LIST.URL_USER_PURSE}  component = {Purse}  />
                <Route path={URL_LIST.URL_USER_VAULT}  component={Vault}  />
                <Route path={URL_LIST.URL_USER_RECOMMEDATION}  component={Inbox} />
                <Route path={URL_LIST.URL_USER_SETTING}  component={Setting} />
                <Route path={URL_LIST.URL_USER_ACCOUNT}  component={Account} />
                <Route path={URL_LIST.URL_INVITE_A_FRIEND}  component={InviteFriends} />
                {/* <Route path={URL_LIST.URL_USER_ACCOUNT}  component={UserAccount} /> */}
              </Switch>
            </Grid>
            <Copyright />
          </Container>
        </main>

        
        
      </BrowserRouter>
    </div>
  );

  if(props.initializeState){
    // console.log("home: initialize")
    if(!props.page_loading)
      props.initializeUserAccountDetails(props.authorization);
    return loadingpage
  }else{
    // console.log("home: initialize done")
    if(props.user){
      return page;
    }else{
      return brokenLink;
    }
  }
  
}
  

function mapStateToProps(state){
  // console.log("home: mapstatetoprops")
  return state;
}
  
function mapDispatchToProps(dispatch){
    return {
      initializeUserAccountDetails: (authorizationToken)=>{
          const action = {
            type: ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS,
            authorization: authorizationToken
          }
          dispatch(action)
      }
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Home)