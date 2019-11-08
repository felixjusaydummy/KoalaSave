import React from 'react';
import Store from './store.js'
import SignIn from './signin.js'
import Home from './home.js'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Purse2 from './userhome/v_purse2'


function Main(props) {

  // const Storex = Store;
  return (
    <div>  
      <BrowserRouter>
            <Switch>
              <Route exact path='/'  render={()=><SignIn store={Store}/>}/>
              <Route path='/user'  render={()=><Home store={Store}/>}/>        
              <Route path='/purse2'  render={()=><Purse2 store={Store}/>}/>        
            </Switch>
        </BrowserRouter>
    </div>  
  );
}


export default (Main)


{
  /* <Provider store = {Store}>
  <BrowserRouter>
      <Switch>
        <Route exact path='/'  render={()=><SignIn />}/>
        <Route path='/user'  render={()=><Home />}/>        
        <Route path='/user/purse2'  render={()=><Purse2/>}/>        
      </Switch>
  </BrowserRouter>
</Provider> */}