import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import NumberFormat from 'react-number-format';
import {getUserPurseBalance} from '../../controller/AccountManager';
import { useStyles } from "../../css/dashboard";
import { URL_USER_HOME, URL_USER_PURSE, URL_USER_VAULT, URL_USER_RECOMMEDATION } from "../../js/constants/url-list";
import { VIEW_REDIRECT_PURSE, VIEW_REDIRECT_VAULT } from '../../js/constants/action-type';


function Dashboard(props){
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="p" variant="h4">
            Hi {props.user.name}!
          </Typography>

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            size="large" 
            onClick={props.onPurse}
          >
            <Typography component="p" variant="h6">
              Purse Value | <NumberFormat value={getUserPurseBalance(props.user)} displayType={'text'} thousandSeparator={true} />
            </Typography>
          </Button>

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            size="large" 
            onClick={props.onVault}
          >
            <Typography component="p" variant="h6">
              Vault
            </Typography>
          </Button>
      </div>
      
    </Container>
  );
}



function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch){
  return {
    onPurse: ()=>{
        const action = {type: VIEW_REDIRECT_PURSE};
        dispatch(action);
    },

    onVault: ()=>{
      const action = {type: VIEW_REDIRECT_VAULT};
      dispatch(action);
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

