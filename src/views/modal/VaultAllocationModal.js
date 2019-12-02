import React, { useImperativeHandle } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { 
  TASK_POCKET_ADD_NEW,
  TASK_POCKET_ADD_AMOUNT,
  TASK_POCKET_RELEASE_AMOUNT
} from "../../js/constants/action-type";



export default function VaultAllocationModal(props, ref) {

  //TRUE for adding new allocation
  //FALSE for editing allocation value
  const [addAllocation, setAddAllocation] = React.useState(TASK_POCKET_ADD_NEW);
  const [currentAllocation, setCurrentAllocation] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [isError, setError] = React.useState(false);

  const [iDescriptionHolder, setDescription] = React.useState("");
  const [iAmount, setAmount] = React.useState();
  const [iTargetAmount, setTargetAmount] = React.useState("");
  const [iExpiration, setExpiration] = React.useState("");
  
  
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
    openReleaseAllocationAmount(payload){
      setAddAllocation(TASK_POCKET_RELEASE_AMOUNT);
      setCurrentAllocation(payload);
      setDescription(payload.description);
      setTargetAmount(payload.targetAmount);
      setExpiration(payload.expiration);
      setAmount(payload.amount);
      setOpen(true);
      setError(false);
    }

  }));

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateAndClose = () => {

    if(Number(iAmount)>=0 && iDescriptionHolder){
      if(addAllocation === TASK_POCKET_ADD_NEW){
          let payload = {
              id: 0,
              description: iDescriptionHolder,
              amount: iAmount,
              targetAmount: iTargetAmount,
              expiration: iExpiration
          }
        props.passToAddNewAllocation(payload);
        setOpen(false);
      }else if(addAllocation === TASK_POCKET_ADD_AMOUNT){
        if(Number(iAmount)>0){
          props.passToAddCashAllocation(currentAllocation, iAmount);
          setOpen(false);
        }else{
          setError("...")
          setError("Amount must not be less than or equal to Zero");
        }
      }else{
        if( Number(iAmount) >0 && Number(iAmount)<=Number(currentAllocation.amount)){
          props.passToReleaseAllocationAmount(currentAllocation, iAmount);
          setOpen(false);
        }else if(Number(iAmount) === 0){
          setError("Amount must not be equal to Zero");
        }
        else{
          setError("Max value exceed from Pocket Amount");    
        }
      }
    }else{
      setError("Please enter valid description or amount");
    }
  };



  const getTitle = ()=>{
    if(addAllocation === TASK_POCKET_ADD_NEW){
      return"Add Vault Pocket";
    }else if(addAllocation === TASK_POCKET_ADD_AMOUNT){
      return"Add Cash";
    }else{
      return "Release Pocket to Vault"
    }
  }

  const getMessageDescription = ()=>{
    if(!isError){
      if(addAllocation){
        return "Please enter your vault allocation here";
      }else{
        return "Add Additional Amount";
      }
    }else{
      return isError;
    }
  }

  const getSubmitButtonText = ()=>{
    if(addAllocation === TASK_POCKET_ADD_NEW){
      return "Create";
    }else if (addAllocation === TASK_POCKET_ADD_AMOUNT){
      return "Add Cash";
    }else{
      return "Release Cash";
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{getTitle()}</DialogTitle>
        <DialogContent>

          <DialogContentText>{getMessageDescription()}
          </DialogContentText>

          {(addAllocation === TASK_POCKET_ADD_NEW)?(
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
            defaultValue = {iAmount}
            onChange={(evt)=>{setAmount(evt.target.value);}}
            />

            <TextField
            margin="dense"
            id="targetAmount"
            name="targetAmount"
            label="Target Amount"
            type="Number"
            fullWidth
            defaultValue = {iTargetAmount}
            onChange={(evt)=>{setTargetAmount(evt.target.value);}}
            />

            <TextField
            margin="dense"
            id="expiration"
            name="expiration"
            label="Expiration"
            type="text"
            fullWidth
            defaultValue = {iExpiration}
            onChange={(evt)=>{setExpiration(evt.target.value);}}
            />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateAndClose} color="primary">{getSubmitButtonText()}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
