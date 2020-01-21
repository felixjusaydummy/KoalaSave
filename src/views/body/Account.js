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





// INBOX LIST
let counter = 0;
function getId(){
  counter = counter + 1;
  return counter;
}

let counter2 = 0;
function getId2(){
  counter = counter2 + 1;
  return counter2;
}


const buildTransactionDetails = (elemdetails)=>{
  console.log("elem per iteim: "+ JSON.stringify(elemdetails, null, 2))
  const page = (
    <TableRow >
      <TableCell>
        <Typography component="p" variant="body1">Description</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography component="p" variant="body1">Type</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography component="p" variant="body1">Date</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography component="p" variant="body1">Amount</Typography>
      </TableCell>
    </TableRow>
  )
  return page
}


//BODY
// INBOX MESSAGE PAGE
const buildMessagePage = (elem, props)=>{
  // console.log("elem detais: "+ JSON.stringify(elem, null, 2))
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
      <TableBody>
          {/* {Row Header} */}
        <TableRow >
          <TableCell>
            <Typography component="p" variant="body1">Description</Typography>
          </TableCell>
          <TableCell align="right">
            <Typography component="p" variant="body1">Type</Typography>
          </TableCell>
          <TableCell align="right">
            <Typography component="p" variant="body1">Date</Typography>
          </TableCell>
          <TableCell align="right">
            <Typography component="p" variant="body1">Amount</Typography>
          </TableCell>
        </TableRow>

        {/* {Row Details} */}
        {(elem.TransactionHistory)?
          elem.TransactionHistory.map(elem=>{
            buildTransactionDetails(elem)
          })
        :""
        }

      </TableBody>
    </Table>

    <Typography gutterBottom>.</Typography>
    <Button
      type="button"
      variant="contained"
      color="primary"
      size="large" 
      onClick={()=>props.closeMessage(elem)}
    >
      Back
    </Button>
    </div>
  )
  return page;
}
// INBOX ITEMS
function buildMessageItems(elem, props){

  // console.log("Acconts Elem: "+ JSON.stringify(elem, null, 2))
  const message = (
      // <ListItem button key={getId()} onClick={()=>props.readMessage(elem)}>
      <ListItem button key={getId()} onClick={()=>props.readMessage(elem)}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography component="p" variant="body2">
                {elem.bankName}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="p" variant="body2">
                {elem.accountNo}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component="p" variant="body2">
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
  if(!props.current_accountdetails){
    const  defaultPage = (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Accounts and Insights
          </ListSubheader>
        }
        className={classes.root}
      >
        {(props.user.account.accounts)?
          props.user.account.accounts.map(elem=>(
            buildMessageItems(elem, props)
          ))
        :""}
        <ListItem>
            <React.Fragment>
            <Container spacing={3}>
              <Button
                type="button"
                // fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Enroll Debit Account
              </Button>
              <Button
                type="button"
                // fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Enroll Credit Account
              </Button>
              </Container>
            </React.Fragment>
        </ListItem>
      </List>
    );
    return defaultPage
  }else{
    const  defaultPage = (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        {buildMessagePage(props.current_accountdetails, props)}
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)
