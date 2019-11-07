import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './login.js'
import Store from './Store.js'


ReactDOM.render(<SignIn store={Store}/>, document.getElementById('root'));

