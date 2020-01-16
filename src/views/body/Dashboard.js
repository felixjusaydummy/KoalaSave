import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import NumberFormat from 'react-number-format';
import { useStyles } from "../../css/dashboard";
import { VIEW_REDIRECT_PURSE, VIEW_REDIRECT_VAULT } from '../../js/constants/action-type';
import Grid from '@material-ui/core/Grid';

import * as TIPS from './Tips'

import EcoIcon from '@material-ui/icons/Eco';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

function getTipPage(){
  const page = null;
  return page;
}


function Dashboard(props){
  const classes = useStyles();

  const maincontrols = (
    <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
          
          <Typography component="p" variant="h4">
            Hi {props.user.name}!
          </Typography>

          {(props.user.status === "new")?
          (<Typography component="p" variant="subtitle1">
            New Account
          </Typography>)
          :(<Typography component="p" variant="subtitle1">
            Status: {props.user.status} | Thrifty Points: {props.user.rewards}
          </Typography>)}
          

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            size="large" 
            onClick={props.onPurse}
          >
            
            <AccountBalanceWalletIcon/>
            <Typography component="p" variant="h6">Wallet | <NumberFormat value={props.user.account.balance} displayType={'text'} thousandSeparator={true} /></Typography>
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
            <EcoIcon/>
            <Typography component="p" variant="h6">
              Vault
            </Typography>
          </Button>
      </div>
      
  )

  const mainpage = (
    
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Container  maxWidth="xs">
        {maincontrols}
      </Container>
      {/* {TIPS.main(props)} */}
    </Container>
    

    // <Container >
    //   <Row>
    //     <Col>1 of 3</Col>
    //     <Col xs={6}>{maincontrols}</Col>
    //     <Col>3 of 3</Col>
    //   </Row>
    //   <Row>
    //     {/* <Col>{TIPS.main(props)}</Col> */}
    //   </Row>
      
    // </Container>

    
  );

  return mainpage
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

