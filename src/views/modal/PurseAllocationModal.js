import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux'
import { 
  USER_PURSE_ALLOCATION_ADD,
  TASK_POCKET_ADD_NEW,
  TASK_POCKET_ADD_AMOUNT,
  TASK_POCKET_RELEASE_AMOUNT
} from "../../js/constants/action-type";


function PurseAllocationModal(props, ref) {

  //TRUE for adding new allocation
  //FALSE for editing allocation value
  const [addAllocation, setAddAllocation] = React.useState(TASK_POCKET_ADD_NEW);
  const [currentAllocation, setCurrentAllocation] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [iDescriptionHolder, setDescription] = React.useState("");
  const [iAmount, setAmount] = React.useState(0);
  const [isError, setError] = React.useState(false);
  
  useImperativeHandle(ref, ()=> ({
    openAddNewAllocation(){
      setAddAllocation(TASK_POCKET_ADD_NEW);
      setCurrentAllocation(null);
      setOpen(true);
      setError(false);
    },
    openEditAllocationAmount(payload){
      setAddAllocation(TASK_POCKET_ADD_AMOUNT);
      setCurrentAllocation(payload);
      setDescription(payload.description);
      setOpen(true);
      setError(false);
    },
    releaseAllocationAmount(payload){
      setAddAllocation(TASK_POCKET_RELEASE_AMOUNT);
      setCurrentAllocation(payload);
      setDescription(payload.description);
      setOpen(true);
      setError(false);
    }

  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateAndClose = () => {

    if(Number(iAmount)>=0 && iDescriptionHolder){
      if(addAllocation == TASK_POCKET_ADD_NEW){
        props.passToAddNewAllocation(iDescriptionHolder, iAmount);
      }else if(addAllocation == TASK_POCKET_ADD_AMOUNT){
        props.passToAddCashAllocation(currentAllocation, iAmount);
      }
      setOpen(false);
    }else{
      setError(true);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {(addAllocation == TASK_POCKET_ADD_NEW)? "Add Wallet Pocket": "Add Cash"}
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {(isError)?"Please enter valid description or amount":
            (addAllocation == TASK_POCKET_ADD_NEW)? "Please enter your purse allocation here.": "Add Additional Amount"}
          </DialogContentText>
          
          {(addAllocation == TASK_POCKET_ADD_NEW)?(
            //ADD NEW ALLOCATION
            <TextField 
            autoFocus 
            margin="dense" 
            name="iDescriptionHolder" 
            label="Description" 
            type="text"
            fullWidth 
            onChange={(evt)=>{ setDescription(evt.target.value) }}
            />
          ):(
            //ADD CASH
            <TextField 
            autoFocus 
            margin="dense" 
            name="iDescriptionHolder" 
            label="Description" 
            type="text"
            fullWidth 
            value = {currentAllocation.description}
            />
          )}
          
          <TextField
            margin="dense"
            id="amount"
            name="amount"
            label="Amount"
            type="Number"
            fullWidth
            onChange={(evt)=>{
              setAmount(evt.target.value);
            }}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateAndClose} color="primary">
            {(addAllocation == TASK_POCKET_ADD_NEW)?"Create":"Add Cash"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default PurseAllocationModal