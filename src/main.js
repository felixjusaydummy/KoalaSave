import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import SignIn from './signin.js'
import Home from './home.js'
import {connect} from 'react-redux'
import Store from './store.js'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function Main(props) {

  // const Storex = Store;
  return (
    <div>
      <BrowserRouter>
            <Switch>
                <Route exact path='/'  render={()=><SignIn store={Store}/>}/>
                {/* <Route exact path='/user' component={Home}/> */}
                <Route path='/user'  render={()=><Home store={Store}/>}/>
                {/* <Route exact path='/' component={SignIn}/>
                <Route path='/user' component={Home}/> */}
                
              </Switch>
      </BrowserRouter>
    </div>  
  );
}


export default (Main)
