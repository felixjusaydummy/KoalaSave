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
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EcoIcon from '@material-ui/icons/Eco';
import Title from '../../components/typography/title'
import { useStyles } from "../../css/purse";
import { 
  USER_PURSE_ALLOCATION_ADD,
  USER_PURSE_ALLOCATION_ADD_CASH,
  USER_PURSE_ALLOCATION_DELETE,
  USER_PURSE_ALLOCATION_RELEASE_CASH,
  USER_SAVINGSACCOUNT_TO_VAULT

} from "../../js/constants/action-type";

import * as STATUS_TYPE from "../../js/constants/status-type";

import NumberFormat from 'react-number-format';
import PurseAllocationModal from '../modal/PurseAllocationModal';
import YesNoModal from '../modal/YesNoModal';
import InfoModal from '../modal/InfoModal';



const { forwardRef, useRef } = React;

function Purse(props){

  const classes = useStyles();


  const ref = useRef();
  const ChildModal = forwardRef(PurseAllocationModal);
  const passToAddNewAllocation = (iDescription, iAmount)=>{
    props.addNewAllocation(iDescription, iAmount);
  };
  const passToAddCashAllocation = (payload, iAmount)=>{
    props.addCashAllocation(payload, iAmount);
  };
  const passToReleaseAllocationAmount = (payload, iAmount)=>{
    props.releaseAllocationAmount(payload, iAmount);
  };
  const passAgreeSelection = (payload)=>{
    props.deleteAllocation(payload.id)
  };


  const refYesNo = useRef();
  const ChildModal2 = forwardRef(YesNoModal);

  // const ChildModal3 = forwardRef(InfoModal);

  return (
    <Container component="main" maxWidth="s">
      <CssBaseline />
      <ChildModal 
            passToAddNewAllocation={passToAddNewAllocation} 
            passToAddCashAllocation={passToAddCashAllocation} 
            passToReleaseAllocationAmount={passToReleaseAllocationAmount}
            ref={ref}/>

      <ChildModal2
        passAgreeSelection={passAgreeSelection}
        ref={refYesNo}/>

      {(props.action_status.purse.status === STATUS_TYPE.STATUS_ERROR )? 
        <InfoModal status={"Error"} message={props.action_status.purse.message} />: ""}  

      <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>

          <Typography component="h1" variant="h5">
            {/* {props.app_name} */}
          </Typography>
          
          <Title>Wallet Balance</Title>
          
          <Typography component="p" variant="h4">
            <NumberFormat value={props.user.account.balance} displayType={'text'} thousandSeparator={true} />
          </Typography>

          <Typography component="p">
            {props.user.account.bankName + " - " + props.user.account.accountNo} 
          </Typography>
          
          <Button variant="contained" color="primary" onClick={ ()=>props.purseToVault(props.user.account.balance)}><EcoIcon/> Add to vault</Button>
          

          
          <Table size="small">
            <TableBody>
                <TableRow >
                  <TableCell>Pocket Amount</TableCell>
                  <TableCell align="right">
                    <NumberFormat value={props.user.purse.pocketAmount} displayType={'text'} thousandSeparator={true} />
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>Total Balance</TableCell>
                  <TableCell align="right">
                    <NumberFormat value={Number(props.user.account.balance + props.user.purse.pocketAmount )} displayType={'text'} thousandSeparator={true} />
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
          
          <div> ... </div>
          <div>Breakdown</div>
          <Table size="small">
            <TableBody>
                {props.user.purse.allocations.map(row => (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="right">
                      <NumberFormat value={row.amount} displayType={'text'} thousandSeparator={true} />
                    </TableCell>

                    <TableCell align="right">
                      
                      <IconButton edge="end" aria-label="lock" onClick={()=>ref.current.openReleaseAllocationAmount(row)}>
                        {(Number(row.amount>0))?(<LockIcon />):(<LockOpenIcon/>)}
                      </IconButton>
                      <IconButton edge="end" aria-label="add" onClick={ ()=>ref.current.openEditAllocationAmount(row)}>
                        <AddCircleIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={
                        ()=>refYesNo.current.openDialog("Are you sure you want to delete "+ row.description
                        +" Pocket? Pocket value will be transferred to wallet balance", row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                
            </TableBody>
          </Table>
          
          
          {/* <PurseAddAllocationModal /> */}
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
}



function mapStateToProps(state){
  // console.log(state.countvisit)
  // console.log(state.action_status)
  return state
}

function mapDispatchToProps(dispatch){
  // TODO: CHECK IF VALUE IS GREATER THAN ZERO
  return {
    
      addNewAllocation: (iDescription, iAmount)=>{
          const action = {
            type: USER_PURSE_ALLOCATION_ADD,
            payload: {
              id: 0,
              description: iDescription,
              amount: iAmount
            }
          };
          dispatch(action);
      },
      addCashAllocation: (payload, iAmount)=>{
        const action = {
          type: USER_PURSE_ALLOCATION_ADD_CASH,
          payload: {
            id: payload.id,
            description: payload.description,
            amount: payload.amount,
            additionAmmount: iAmount
          }
        };
        dispatch(action);
      },
      deleteAllocation: (iPurseAllocationId) =>{
        const action = {
          type: USER_PURSE_ALLOCATION_DELETE,
          payload: {
            id: iPurseAllocationId
          }
        };
        dispatch(action);
      },
      releaseAllocationAmount: (payload, releaseAmount)=>{
        const action = {
          type: USER_PURSE_ALLOCATION_RELEASE_CASH,
          payload: {
            id: payload.id,
            description: payload.description,
            amount: payload.amount,
            releaseAmount: releaseAmount
          }
        };
        dispatch(action);
      },
      purseToVault: (iAmount)=>{
        const action = {
          type: USER_SAVINGSACCOUNT_TO_VAULT,
          payload: {
            amount: iAmount
          }
        };
        dispatch(action);
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purse)
