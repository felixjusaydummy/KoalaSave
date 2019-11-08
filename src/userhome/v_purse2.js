import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Title from './util_title'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import {getSumAllocation, getUserPurseBalance} from '../controller/AccountManager'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}



function Purse2(props){
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

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
          
          <Title>Purse2 Balance</Title>


          
          <Typography component="h1" variant="h5">
            {props.user.name}
          </Typography>
          <Typography component="p" variant="h4">
            {getUserPurseBalance(props.user)}
          </Typography>

          
          <Table size="small">
            <TableBody>
                <TableRow >
                  <TableCell>Purse Amount</TableCell>
                  <TableCell align="right">{getSumAllocation(props.user.purse.allocations)}</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>Total Balance</TableCell>
                  <TableCell align="right">{props.user.account.balance}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
          
          
          <div> ... </div>
          <div>Breakdown</div>
          <Table size="small">
            <TableBody>
                {props.user.purse.allocations.map(row => (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.name}</TableCell>
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
            onClick={props.onAddPurse}
          >
            Add
          </Button>
      </div>
      
    </Container>
  );
}


function mapStateToProps(state){
  return state;

}

function mapDispatchToProps(dispatch){
  return {
      onAddPurse: ()=>{
          const action = 
          {type: 'USER-PURSE-ALLOCATION-ADD',
           value: {
              id: 2,
              name: "testAllocation",
              amount: 10,
              active: true
          }
          };
          dispatch(action);
          
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purse2)

