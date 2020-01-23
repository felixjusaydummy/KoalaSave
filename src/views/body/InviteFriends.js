import React from 'react'
import {connect} from 'react-redux'

//cores
import { useStyles } from "../../css/dashboard";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

function InviteAFriend(props){
    const classes = useStyles();
    const title = "Refer your friends and earn rewards"
    const message = "Get PHP 100 worth of freebies when your friend completes registration and claims their rewards on the app"
    
    const page = (
        // <List>
        //   <ListItem key={1}>
          <div>
            <Typography variant="h4" gutterBottom>
              Invite A Friend
            </Typography>
            
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" gutterBottom>.</Typography>
            
            {message}
            
            <Typography gutterBottom>.</Typography>
          
            <Button
              type="button"
              variant="contained"
              color="primary"
              size="large" 
              className={classes.submit_spacing}
            >
              Share your Link
            </Button>

            <Button
              type="button"
              variant="contained"
              color="primary"
              size="large" 
              className={classes.submit_spacing}
            >
                Cancel
            </Button>
          </div>
        //   </ListItem>
  
        // </List>
      )

    return page;
    
}

function mapStateToProps(state){
    return state
}
  
function mapDispatchToProps(dispatch){

}

export default connect(mapStateToProps)(InviteAFriend)
// export default connect(mapStateToProps, mapDispatchToProps)(Setting)
  