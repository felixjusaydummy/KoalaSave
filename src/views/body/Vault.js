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

import Title from '../../components/typography/title'
import { useStyles } from "../../css/purse";
import { USER_PURSE_ALLOCATION_ADD } from "../../js/constants/action-type";

function Vault(props){

  const classes = useStyles();
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
          
          <Title>Vault Balance</Title>

          <Typography component="p" variant="h4">
            {props.countvisit}
          </Typography>

          
          <Table size="small">
            <TableBody>
                <TableRow >
                  <TableCell>Vault Amount</TableCell>
                  <TableCell align="right">{props.user.vault.amount}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>Total Balance</TableCell>
                  <TableCell align="right">{props.user.vault.balance}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
          
          
          <div> ... </div>
          <div>Breakdown</div>
          <Table size="small">
            <TableBody>
                {props.user.vault.allocations.map(row => (
                  <TableRow key={row.id}>

                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>

                    <TableCell align="right">
                      <IconButton edge="end" aria-label="lock">
                        <LockIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="add">
                        <AddCircleIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                
            </TableBody>
          </Table>
        
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={props.addNewAllocation}
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
  return {
    
      addNewAllocation: ()=>{
          const action = {
            type: USER_PURSE_ALLOCATION_ADD,
            payload: {
              id: 2,
              description: "Travel",
              amount: 100,
              active: true
            }
          };
          dispatch(action);
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Vault)
