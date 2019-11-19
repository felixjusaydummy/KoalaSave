import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import EcoIcon from '@material-ui/icons/Eco';
import { Link } from 'react-router-dom'

import { URL_USER_HOME, URL_USER_PURSE, URL_USER_VAULT, URL_USER_RECOMMEDATION } from "../../js/constants/url-list";

const mainListItems =
  (
    <div>
      <Link to={URL_USER_HOME}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard"  />
        </ListItem>
      </Link>

      <Link to={URL_USER_PURSE}>
        <ListItem button>
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="Purse" />
        </ListItem>
      </Link>
      
      <Link to={URL_USER_VAULT}>
        <ListItem button>
          <ListItemIcon>
            <EcoIcon />
          </ListItemIcon>
          <ListItemText primary="Vault" />
        </ListItem>
      </Link>

      <Link to={URL_USER_RECOMMEDATION}>
        <ListItem button>
          <ListItemIcon>
            <EcoIcon />
          </ListItemIcon>
          <ListItemText primary="Recommendation" />
        </ListItem>
      </Link>
    </div>
  );

  export default mainListItems

