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

import Title from '../../components/typography/title'
import { useStyles } from "../../css/purse";
import { 
  USER_PURSE_ALLOCATION_ADD,
  USER_PURSE_ALLOCATION_UNLOCK,
  USER_PURSE_ALLOCATION_LOCK,
  USER_PURSE_ALLOCATION_ADD_CASH,
  USER_PURSE_ALLOCATION_DELETE,
  USER_PURSE_ALLOCATION_SET_ACTIVE

} from "../../js/constants/action-type";

import NumberFormat from 'react-number-format';
import PurseAllocationModal from '../modal/PurseAllocationModal';
const { forwardRef, useRef, useImperativeHandle } = React;

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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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
          <ChildModal passToAddNewAllocation={passToAddNewAllocation} passToAddCashAllocation={passToAddCashAllocation} ref={ref}/>
          <Table size="small">
            <TableBody>
                {props.user.purse.allocations.map(row => (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="right">
                      <NumberFormat value={row.amount} displayType={'text'} thousandSeparator={true} />
                    </TableCell>

                    <TableCell align="right">
                      
                      <IconButton edge="end" aria-label="lock" onClick={()=>props.setActiveAllocation(row.id, (!Boolean(row.active)))}>
                        {(row.active)?(<LockIcon />):(<LockOpenIcon/>)}
                      </IconButton>
                      <IconButton edge="end" aria-label="add" onClick={ ()=>ref.current.openEditAllocationAmount(row)}>
                        <AddCircleIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete" onClick={()=>props.deleteAllocation(row.id)}>
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
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={props.addNewAllocation}
            onClick={ ()=>ref.current.openAddNewAllocation()}
          >
            Add
          </Button>

          

      </div>
      
    </Container>
  );
}



function mapStateToProps(state){
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
              amount: iAmount,
              active: true
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
            active: payload.active,
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
      setActiveAllocation:(iPurseAllocationId, isActive)=>{
        const action = {
          type: USER_PURSE_ALLOCATION_SET_ACTIVE,
          payload: {
            id: iPurseAllocationId,
            setActiveTo: isActive
          }
        };
        dispatch(action);
      }

      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purse)
