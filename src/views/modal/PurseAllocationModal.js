import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux'
import { USER_PURSE_ALLOCATION_ADD } from "../../js/constants/action-type";


function PurseAllocationModal(props, ref) {

  //TRUE for adding new allocation
  //FALSE for editing allocation value
  const [addAllocation, setAddAllocation] = React.useState(true);
  const [currentAllocation, setCurrentAllocation] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [iDescriptionHolder, setDescription] = React.useState("");
  const [iAmount, setAmount] = React.useState(0);
  
  useImperativeHandle(ref, ()=> ({
    openAddNewAllocation(){
      setAddAllocation(true);
      setCurrentAllocation(null);
      setOpen(true);
    },
    openEditAllocationAmount(payload){
      setAddAllocation(false);
      setCurrentAllocation(payload);
      setDescription(payload.description);
      setOpen(true);
    }

  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateAndClose = () => {
    if(addAllocation){
      props.passToAddNewAllocation(iDescriptionHolder, iAmount);
    }else{
      props.passToAddCashAllocation(currentAllocation, iAmount);
    }
    
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          {(addAllocation)? "Add Purse Allocation": "Add Cash"}
          </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {(addAllocation)? "Please enter your purse allocation here.": "Add Additional Amount"}
          </DialogContentText>
          
          {(addAllocation)?(
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
            {(addAllocation)?"Create":"Add Cash"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default PurseAllocationModal