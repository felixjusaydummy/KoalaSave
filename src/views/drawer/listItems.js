import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from 'react-router-dom'
import * as URL_LIST from "../../js/constants/url-list";

// ICONS
import SettingsIcon from '@material-ui/icons/Settings';
import MessageIcon from '@material-ui/icons/Message';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import EcoIcon from '@material-ui/icons/Eco';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import Badge from '@material-ui/core/Badge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import Collapse from '@material-ui/core/Collapse';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';
// import ExpandLess from '@material-ui/icons/ExpandLess';
// import ExpandMore from '@material-ui/icons/ExpandMore';
// import StarBorder from '@material-ui/icons/StarBorder';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import List from '@material-ui/core/List';
// import { makeStyles } from '@material-ui/core/styles';
import * as AUTHENTICATION from './../../js/actions/authentication-manager'
import * as RedirectManager from './../../js/actions/redirect-manager'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';


function getMessageIcon(inbox){
  let comp = (<MessageIcon />)
  if(inbox && inbox.length>0){
    let count = 0
    const len = inbox.length;
    for( let i = 0; i<len; i++){
      if(!inbox[i].open){
        count += 1
      }
    }
    comp = (<Badge badgeContent={count} color="secondary">
        <MessageIcon />
    </Badge>)
  }
  return comp
}

function triggerLogout(){
  console.log("logout")
  AUTHENTICATION.removeAuthorization()
  RedirectManager.redirectToLogin()
}

//error
export const mainfunction = (props)=>{
  let inbox = [];
  if(props.user && props.user.inbox){
    inbox = props.user.inbox
  }
  
  const mainListItems = 
      (
        <div>
          <Link to={URL_LIST.URL_USER_HOME}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home"  />
            </ListItem>
          </Link>

          <Link to={URL_LIST.URL_USER_ACCOUNT}>
            <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon/>
                </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItem>
          </Link>
    
          <Link to={URL_LIST.URL_USER_RECOMMEDATION}>
            <ListItem button>
                <ListItemIcon>
                  {getMessageIcon(inbox)}
                </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
          </Link>
    
          <Link to={URL_LIST.URL_USER_PURSE}>
            <ListItem button>
              <ListItemIcon>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary="Wallet" />
            </ListItem>
          </Link>
          
          <Link to={URL_LIST.URL_USER_VAULT}>
            <ListItem button>
              <ListItemIcon>
                <EcoIcon />
              </ListItemIcon>
              <ListItemText primary="Vault" />
            </ListItem>
          </Link>
    
          <Link to={URL_LIST.URL_USER_SETTING}>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Setting" />
            </ListItem>
          </Link>

          <Link to={URL_LIST.URL_INVITE_A_FRIEND}>
            <ListItem button>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary="Invite A Friend" />
            </ListItem>
          </Link>

          <Link to={"/"}> 
          <ListItem button onClick={()=>{triggerLogout()}}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          </Link>
        </div>
      );
  return mainListItems
} 
   


//default
// const mainListItems = 
//     (
//       <div>
//         <Link to={URL_LIST.URL_USER_HOME}>
//           <ListItem button>
//             <ListItemIcon>
//               <HomeIcon />
//             </ListItemIcon>
//             <ListItemText primary="Home"  />
//           </ListItem>
//         </Link>
  
  
//         <Link to={URL_LIST.URL_USER_RECOMMEDATION}>
//           <ListItem button>
//           <ListItemIcon>
//               <Badge badgeContent={4} color="secondary">
                
//                 {/* <NotificationsIcon /> */}
                
//                   <MessageIcon />
                
//               </Badge>
//               </ListItemIcon>
//             <ListItemText primary="Inbox" />
//           </ListItem>
//         </Link>
  
//         <Link to={URL_LIST.URL_USER_PURSE}>
//           <ListItem button>
//             <ListItemIcon>
//               <AccountBalanceWalletIcon />
//             </ListItemIcon>
//             <ListItemText primary="Wallet" />
//           </ListItem>
//         </Link>
        
//         <Link to={URL_LIST.URL_USER_VAULT}>
//           <ListItem button>
//             <ListItemIcon>
//               <EcoIcon />
//             </ListItemIcon>
//             <ListItemText primary="Vault" />
//           </ListItem>
//         </Link>
  
//         <Link to={URL_LIST.URL_USER_SETTING}>
//           <ListItem button>
//             <ListItemIcon>
//               <SettingsIcon />
//             </ListItemIcon>
//             <ListItemText primary="Setting" />
//           </ListItem>
//         </Link>
//       </div>
//     );
  
//     export default mainListItems
    
  

































// damage ...


  // export default mainListItems

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
//   nested: {
//     paddingLeft: theme.spacing(4),
//   },
// }));

// export default function mainListItems() {
//   const classes = useStyles();
//   const [open, setOpen] = React.useState(true);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <List
//       component="nav"
//       aria-labelledby="nested-list-subheader"
//       subheader={
//         <ListSubheader component="div" id="nested-list-subheader">
//           Nested List Items
//         </ListSubheader>
//       }
//       className={classes.root}
//     >
//       <ListItem button>
//         <ListItemIcon>
//           <SendIcon />
//         </ListItemIcon>
//         <ListItemText primary="Sent mail" />
//       </ListItem>
//       <ListItem button>
//         <ListItemIcon>
//           <DraftsIcon />
//         </ListItemIcon>
//         <ListItemText primary="Drafts" />
//       </ListItem>
//       <ListItem button onClick={handleClick}>
//         <ListItemIcon>
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary="Inbox" />
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItem>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <ListItem button className={classes.nested}>
//             <ListItemIcon>
//               <StarBorder />
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItem>
//         </List>
//       </Collapse>
//     </List>
//   );
// }
