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

import EcoIcon from '@material-ui/icons/Eco';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Grid from '@material-ui/core/Grid';


//logs
import LOGO_MERCHANT1 from './../../js/pictures/merchant1.png'
import LOGO_MERCHANT2 from './../../js/pictures/merchant2.png'
import LOGO_MERCHANT3 from './../../js/pictures/merchant3.png'
import LOGO_MERCHANT4 from './../../js/pictures/merchant4.png'
import LOGO_TIP1 from './../../js/pictures/tip1.png'
import LOGO_TIP2 from './../../js/pictures/tip2.png'
import LOGO_TIP3 from './../../js/pictures/tip3.png'




function buildMainControlPanel(props, classes){
  const mainpanel = (
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
  return mainpanel  
}

function builcTipsPanel(props, classes){
  const mainpanel = (
    <div className={classes.papertips}>
          
          <Typography component="p" variant="h6">
            Tips and Recommendations
          </Typography>
          <Grid container spacing={3}>
          <Grid item xs={3}>
              <Button className={classes.img}>
                <div>
                  <Typography component="p" variant="body2">
                    How to start creating your budget plan?
                  </Typography>
                </div>
              </Button>
              
            </Grid>
            <Grid item xs={3}>
              <Button className={classes.img}> 
                <div>
                  <img src={LOGO_TIP1} alt="Logo" className={classes.imgtips}/>;
                  <Typography component="p" variant="body2">
                    Healthcare costs are extremely expensive. Make sure to stay protected w/ Travel Insurance
                  </Typography>
                </div>
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button className={classes.img}>
                <div>
                  <img src={LOGO_TIP2} alt="Logo" className={classes.imgtips}/>;
                  <Typography component="p" variant="body2">
                    Tips and strategies on how to save money
                  </Typography>
                </div>
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button className={classes.img}>
                <div>
                  <img src={LOGO_TIP3} alt="Logo" className={classes.imgtips}/>;
                  <Typography component="p" variant="body2">
                    Investing can be the first important step to achieving your best possible financial future
                  </Typography>
                </div>
              </Button>
            </Grid>
          </Grid>
      </div>
  )
  return mainpanel 
}

function buildAffiliateMerchants(props, classes){
  const mainpanel = (
    <div className={classes.papertips}>
          
          <Typography component="p" variant="h6">
            Affiliate Merchants
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Button>
                <img src={LOGO_MERCHANT1} alt="Logo" className={classes.img}/>;
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button>
                <img src={LOGO_MERCHANT2} alt="Logo" className={classes.img}/>;
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button>
                <img src={LOGO_MERCHANT3} alt="Logo" className={classes.img}/>;
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button>
                <img src={LOGO_MERCHANT4} alt="Logo" className={classes.img}/>;
              </Button>
            </Grid>
          </Grid>
          
      </div>
  )
  return mainpanel 
}


function Dashboard(props){
  const classes = useStyles();

  const mainControlsPanel = buildMainControlPanel(props, classes);
  const tipsPanel = builcTipsPanel(props, classes);
  const merchantsPanel = buildAffiliateMerchants(props, classes);

  const mainpage = (

  
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Container  maxWidth="xs">
        {mainControlsPanel}
      </Container>
      <Container  maxWidth="lg">
        {tipsPanel}
      </Container>
      <Container  maxWidth="lg">
        {merchantsPanel}
      </Container>
    </Container>
    

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

