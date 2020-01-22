import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import NumberFormat from 'react-number-format';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


//ICONS
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import NotificationsIcon from '@material-ui/icons/Notifications';

import * as ACTIONTYPE from './../../js/constants/action-type'
import * as STATUSTYPE from './../../js/constants/status-type'
import { Container } from '@material-ui/core';
import EnrollAccountModal from './../modal/EnrollAccountModal'
import InfoModal from './../modal/InfoModal'

const { forwardRef, useRef } = React;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


const getDateValue = (datevalue)=>{
  const options = {
    year: 'numeric', month: 'long', day: '2-digit',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: true,
    timeZone: 'Asia/Manila' 
  };
  const res = new Intl.DateTimeFormat('en-GB',options).format(new Date(datevalue))
  return res;
}

const categByDepositAndCreditAccounts = (accountlist)=>{
  const len = accountlist.length;
  let deposit = [], credit = [];
  for(let i = 0; i<len; i++){
    if(accountlist[i].type === STATUSTYPE.ACCOUNTTYPE_CREDIT){
      credit.push(accountlist[i])
    }else{
      deposit.push(accountlist[i])
    }
  }

  return {
    deposit: deposit,
    credit: credit
  }
}



// INBOX LIST
let counter = 0;
function getId(){
  counter = counter + 1;
  return counter;
}

let counter2 = 1;
function getId2(){
  counter2 = counter2 + 1;
  return counter2;
}


const buildTransactionDetails = (e)=>{
  const page = (
    <TableRow  key={getId2()} >
      <TableCell align="left">
        <Typography component="p" variant="body1">
          {getDateValue(e.date)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography component="p" variant="body1">{e.description}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography component="p" variant="body1">{e.crdr}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography component="p" variant="body1">
          PHP <NumberFormat value={e.amount} displayType={'text'} thousandSeparator={true} />
        </Typography>
      </TableCell>
    </TableRow>
  )
  return page
}



const buildTable= (list)=>{
  const table = (
    <TableBody>
      {/* {Row Header} */}
      <TableRow key={0}>
        <TableCell align="left">
          <Typography component="p" variant="body1">Date</Typography>
        </TableCell>
        <TableCell>
          <Typography component="p" variant="body1">Description</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography component="p" variant="body1">Type</Typography>
        </TableCell>
        <TableCell align="right">
          <Typography component="p" variant="body1">Amount</Typography>
        </TableCell>
      </TableRow>

      {/* {Row Details} */}
      {list.map(elem=>(
        buildTransactionDetails(elem)
      ))}
    </TableBody>
  )
  return table
}


//BODY
// INBOX MESSAGE PAGE
const buildHeaderPage = (elem, props)=>{
  const page = (
    <div>
    <Table size="small">
      <TableBody>
          <TableRow >
            <TableCell>
              <div>
                <Typography component="p" variant="h6">Bank Name: {elem.bankName}</Typography>
                <Typography component="p" variant="body2">Account No.: {elem.accountNo}</Typography>
              </div>
            </TableCell>
            <TableCell align="right">
              <Typography component="p" variant="h6">Php <NumberFormat value={elem.balance} displayType={'text'} thousandSeparator={true} /></Typography>
            </TableCell>
          </TableRow>
      </TableBody>
    </Table>
    <Typography gutterBottom>.</Typography>

    <Table>
        {/* {Row Details} */}
        {(elem.TransactionHistory && elem.TransactionHistory.length)?
            buildTable(elem.TransactionHistory)
          :
          <TableBody>
            <TableRow  key={0}>
              <TableCell align="center">No Data</TableCell>
            </TableRow>
          </TableBody>
        }

      
    </Table>

    <Typography gutterBottom>.</Typography>
    <Button
      type="button"
      variant="contained"
      color="primary"
      size="large" 
      onClick={()=>props.closeMessage(elem)}
      spacing={3}
    >
      Back
    </Button>
    </div>
  )
  return page;
}
// List ITEMS
function buildListAccountItems(elem, props){
  // console.log("Acconts Elem: "+ JSON.stringify(elem, null, 2))
  const message = (
      // <ListItem button key={getId()} onClick={()=>props.readMessage(elem)}>
      <ListItem button key={getId()} onClick={()=>props.readMessage(elem)}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography component="p" variant="h5">
                {elem.bankName}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="p" variant="h5">
                {elem.accountNo}
            </Typography>
          </Grid>
          <Grid item xs={4} align="right">
            <Typography component="p" variant="h5">
              Php <NumberFormat value={elem.balance} displayType={'text'} thousandSeparator={true} />
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
  )
  return message;
}




// MAIN //
function Account(props) {
  const classes = useStyles();
  const ref = useRef();
  const ChildModal = forwardRef(EnrollAccountModal);
  const passEnrollAccount = (payload)=>{
    props.enrollAccount(payload, props);
  }

  const closeInfoModal = ()=>{
    props.resetMessageStatus();
  }

  if(!props.current_accountdetails){
    //show list of accounts

    const cateAccounts = categByDepositAndCreditAccounts(props.user.account.accounts);

    const  defaultPageDeposit = (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Deposit Accounts
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem>
            <React.Fragment>
            {/* <Container spacing={3}> */}
              <Button
                type="button"
                // fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=>ref.current.openEnrollAccount(STATUSTYPE.ACCOUNTTYPE_DEPOSIT)}
              >
                Enroll Deposit Account
              </Button>
              {/* </Container> */}
            </React.Fragment>
        </ListItem>

        {(cateAccounts.deposit)?
          cateAccounts.deposit.map(elem=>(
            buildListAccountItems(elem, props)
          ))
        :""}
      </List>
    );

    const  defaultPageCredit = (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Credit Accounts
          </ListSubheader>
        }
        className={classes.root}
      >
        <ListItem>
            <React.Fragment>
            {/* <Container spacing={3}> */}
              <Button
                type="button"
                // fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=>ref.current.openEnrollAccount(STATUSTYPE.ACCOUNTTYPE_CREDIT)}
              >
                Enroll Credit Account
              </Button>
              {/* </Container> */}
            </React.Fragment>
        </ListItem>

        {(cateAccounts.credit)?
          cateAccounts.credit.map(elem=>(
            buildListAccountItems(elem, props)
          ))
        :""}
      </List>
    );

    const consoList = (
      <Container component="main" maxWidth="lg">
        <ChildModal 
          passEnrollAccount={passEnrollAccount}
          ref={ref}/>

        {(props.action_status.purse.status === STATUSTYPE.STATUS_ERROR )? 
          <InfoModal 
            status={"Error"} 
            message={props.action_status.purse.message} 
            closeInfoModal={closeInfoModal} />: ""}  
          
        <List className={classes.root}>
          
          <ListItem key={0}>
            {defaultPageDeposit}
          </ListItem>
          <ListItem key={1}>
            {defaultPageCredit}
          </ListItem>
        </List>
      </Container>
    )

    return consoList
  }else{
    //show account details
    const  defaultPage = (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        {buildHeaderPage(props.current_accountdetails, props)}
      </List>
    );
    return defaultPage
  }
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  
    return {
      readMessage: (message)=>{
          const action = {
            type: ACTIONTYPE.BANKACCOUNT_READ_ACCOUTDETAILS,
            payload: message
          };
          dispatch(action);
      },
      closeMessage: ()=>{
        const action = {
          type: ACTIONTYPE.BANKACCOUNT_CLOSE_ACCOUTDETAILS,
          payload: null
        };
        dispatch(action);
      },
      enrollAccount: (payload, props)=>{
        const action = {
          type: ACTIONTYPE.BANKACCOUNT_ACCOUNT_ENROLLACCOUNT,
          payload: payload,
          authorization: props.authorization,
        };
        dispatch(action);
      },
      resetMessageStatus: ()=>{
        const action = {
          type: ACTIONTYPE.MESSAGE_RESET_DEFAULT
        };
        dispatch(action);
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)
