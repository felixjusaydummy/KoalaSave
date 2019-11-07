import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Signin from './signin.js'
import Home from './home.js'
import {connect} from 'react-redux'
import Store from './store.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function Main(props) {

  const Storex = Store;
  return (
    <div>
      <BrowserRouter>
            <Switch>
                <Route exact path='/'  render={()=><Signin/>}/>
                {/* <Route exact path='/'  render={()=><Home store={Storex}/>}/> */}
                <Route path='/user' component={Home}/>
              </Switch>
      </BrowserRouter>
    </div>  
  );
}


export default (Main)
