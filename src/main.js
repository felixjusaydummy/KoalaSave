import React from 'react';
import SignIn from './views/body/SignIn'
import Home from './views/body/Home'
import Store  from './js/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { URL_USER_HOME } from "./js/constants/url-list";


function Main(props) {
  return (
    <div>  
      <Provider store = {Store}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'  component = {SignIn}/>
            <Route path={URL_USER_HOME}  component = {Home}/>        
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>  
  );
}


export default (Main)
