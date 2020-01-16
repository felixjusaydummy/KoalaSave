import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import NumberFormat from 'react-number-format';
import { VIEW_REDIRECT_PURSE, VIEW_REDIRECT_VAULT } from '../../js/constants/action-type';
import { useStyles } from "../../css/dashboard";

export const main = (props)=>{
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div >
          <Typography component="p" variant="h4">
            Tips and Recommendation
          </Typography>
      </div>
    </Container>
  );
}


