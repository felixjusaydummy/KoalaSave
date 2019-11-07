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





// Generate Order Data
function createData(id, name, amount) {
  return { id, name, amount };
}

const allocations = [
  createData(1, 'Savings', 866.99),
  createData(2, 'Utilities', 100.81),
  createData(3, 'Travel', 654.39),
  createData(4, 'Shopping',  212.79),
];





function Purse(props){
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
          
          <Title>Purse Balance</Title>


          <Typography component="p" variant="h4">
            3,024.00
          </Typography>

          
          <Table size="small">
            <TableBody>
                <TableRow >
                  <TableCell>Purse Amount</TableCell>
                  <TableCell align="right">1000</TableCell>
                </TableRow>
                <TableRow >
                  <TableCell>Total Balance</TableCell>
                  <TableCell align="right">2000</TableCell>
                </TableRow>
            </TableBody>
          </Table>
          
          
          <div> ... </div>
          <div>Breakdown</div>
          <Table size="small">
            <TableBody>
                {allocations.map(row => (
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
            className={classes.submit}
          >
            Add
          </Button>
      </div>
      
    </Container>
  );
}



// function mapStateToProps(state){
//   return state
// }
// export default connect(mapStateToProps)(SignIn)


export default (Purse)

