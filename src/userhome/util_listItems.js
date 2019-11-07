import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CropFreeIcon from '@material-ui/icons/CropFree';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom'


const mainListItems =
  (
    <div>
      <Link to='/user/'>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard"  />
        </ListItem>
      </Link>

      <Link to='/user/purse'>
        <ListItem button>
          <ListItemIcon>
            <CropFreeIcon />
          </ListItemIcon>
          <ListItemText primary="Purse" />
        </ListItem>
      </Link>
      
      <Link to='/user/vault'>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Vault" />
        </ListItem>
      </Link>
    </div>
  );

  export default mainListItems

