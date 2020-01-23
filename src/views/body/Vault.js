import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Title from '../../components/typography/title'
import { useStyles } from "../../css/purse";

import { 
  USER_VAULT_ALLOCATION_ADD,
  USER_VAULT_ALLOCATION_ADD_CASH,
  USER_SAVINGSACCOUNT_FROM_VAULT,
  MESSAGE_RESET_DEFAULT

} from "../../js/constants/action-type";

import * as STATUS_TYPE from "../../js/constants/status-type";

import NumberFormat from 'react-number-format';
import VaultAllocationModal from '../modal/VaultAllocationModal';
import YesNoModal from '../modal/YesNoModal';
import InfoModal from '../modal/InfoModal';
import TransferSavingsModal from  '../modal/TransferSavingsModal';


const { forwardRef, useRef } = React;

//ID GENERATOR


function Vault(props){

  // console.log(JSON.stringify(props.user, null, 2))

  const classes = useStyles();


  const ref = useRef();
  const ChildModal = forwardRef(VaultAllocationModal);
  const passToAddNewAllocation = (payload)=>{
    props.addNewAllocation(payload, props);
  };
  const passToAddCashAllocation = (payload, iAmount)=>{
    props.addCashAllocation(payload, iAmount, props);
  };

  const refYesNo = useRef();
  const ChildModal2 = forwardRef(YesNoModal);
  const closeInfoModal = ()=>{
    props.resetMessageStatus();
  }

  const refTransferSavings = useRef();
  const ChildModal3 = forwardRef(TransferSavingsModal);
  const transferSavings = (iAmount)=>{
    props.vaultToPurse(iAmount, props);
  }

  if(props.user.vault){
    const page =(
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <ChildModal 
              passToAddNewAllocation={passToAddNewAllocation} 
              passToAddCashAllocation={passToAddCashAllocation} 
              ref={ref}/>
  
        <ChildModal3
          transferSavings={transferSavings}
          ref ={refTransferSavings}/>
  
        {(props.action_status.purse.status === STATUS_TYPE.STATUS_ERROR )? 
          <InfoModal 
            status={"Error"} 
            message={props.action_status.purse.message} 
            closeInfoModal={closeInfoModal}
            />: ""}  
  
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
  
            <Typography component="h1" variant="h5">
              {/* {props.app_name} */}
            </Typography>
            
            <Title>Vault Balance</Title>
            
            <Typography component="p" variant="h4">
              Php <NumberFormat value={props.user.vault.vaultBalance} displayType={'text'} thousandSeparator={true} />
            </Typography>
            
            {/* <Button variant="contained" color="primary" onClick={ ()=>props.purseToVault(props.user.vault.vaultBalance)}><AccountBalanceWalletIcon/>Add to Wallet</Button> */}
            <Button variant="contained" color="primary" className={classes.submit}
              onClick={()=>refTransferSavings.current.transferVaultToSavingsAccount(props.user.vault.vaultBalance)}
            ><AccountBalanceWalletIcon/>Add to Wallet</Button>          
  
            
            <Table size="small">
              <TableBody>
                  <TableRow >
                    <TableCell>Pocket Amount</TableCell>
                    <TableCell align="right">
                      Php <NumberFormat value={props.user.vault.pocketAmount} displayType={'text'} thousandSeparator={true} />
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
            
            <div> ... </div>
            <div>Breakdown</div>
            <Table size="small">
              <TableBody>
                  {props.user.vault.allocations.map(row => (
                    <TableRow key={row.description}>
                        <TableCell align="left">
                          <div>{row.description}</div>
                          <div>Target Amount</div>
                          <div>Expiration</div>
                          </TableCell>
                        <TableCell align="right">
                          <div>Php <NumberFormat value={row.amount} displayType={'text'} thousandSeparator={true} /></div>
                          <div>Php <NumberFormat value={row.targetAmount} displayType={'text'} thousandSeparator={true} /></div>
                          <div>
                          {new Intl.DateTimeFormat('en-GB', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: '2-digit' 
                            }).format(new Date(row.expiration))}
  
                          </div>
                          </TableCell>
                        <TableCell align="right">
                          <IconButton edge="end" aria-label="add" onClick={ ()=>ref.current.openEditAllocationAmount(row)}>
                            <AddCircleIcon />
                          </IconButton>
                        </TableCell>
                    </TableRow>
                  ))}
                  
              </TableBody>
            </Table>
            
            
            <Button
              type="button"
              // fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={ ()=>ref.current.openAddNewAllocation()}
            >
              Add Pocket
            </Button>
  
            
  
        </div>
        
      </Container>
    );
    return page
  }else{
    const page =(
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <ChildModal 
              passToAddNewAllocation={passToAddNewAllocation} 
              passToAddCashAllocation={passToAddCashAllocation} 
              ref={ref}/>
  
        <ChildModal3
          transferSavings={transferSavings}
          ref ={refTransferSavings}/>
  
        {(props.action_status.purse.status === STATUS_TYPE.STATUS_ERROR )? 
          <InfoModal 
            status={"Error"} 
            message={props.action_status.purse.message} 
            closeInfoModal={closeInfoModal}
            />: ""}  
  
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            
            <Title>Vault Balance</Title>
            <Typography variant="subtitle1">
              Go to Wallet and Add Cash to Vault
            </Typography>
        </div>
        
      </Container>
    );
    return page
  }
  
}



function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  // TODO: CHECK IF VALUE IS GREATER THAN ZERO
  return {
    
      addNewAllocation: (iPayload, props)=>{
          const action = {
            type: USER_VAULT_ALLOCATION_ADD,
            payload: iPayload,
            authorization: props.authorization,
          };
          dispatch(action);
      },
      addCashAllocation: (payload, iAmount, props)=>{
        const action = {
          type: USER_VAULT_ALLOCATION_ADD_CASH,
          payload: {
            pocket:payload,
            additionAmmount: iAmount
          },
          authorization: props.authorization,
        };
        dispatch(action);
      },
      vaultToPurse: (iAmount, props)=>{
        const action = {
          type: USER_SAVINGSACCOUNT_FROM_VAULT,
          payload: {
            // amount: 1
            amount: iAmount
          },
          authorization: props.authorization,
        };
        dispatch(action);
      },
      resetMessageStatus: ()=>{
        const action = {
          type: MESSAGE_RESET_DEFAULT
        };
        dispatch(action);
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vault)
