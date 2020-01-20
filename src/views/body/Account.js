import React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
// const theme = useTheme();
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

//ICONS
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import NotificationsIcon from '@material-ui/icons/Notifications';

import * as ACTIONTYPE from './../../js/constants/action-type'
import * as STATUSTYPE from './../../js/constants/status-type'

// var CanvasJSReact = require('./../../js/libs/canvasjs.react')
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

import '../../../node_modules/react-vis/dist/style.css'
// import '../../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis';

// const useStyles = makeStyles(theme => ({=
//   root: {
//     width: '100%',
//     backgroundColor: theme.palette.background.paper,
//   },
//   inline: {
//     display: 'inline',
//   },
// }));

let tempId = 0;
function getUniqueId(elem){
    tempId += 1;
    return tempId;
}

function buildChart(elem, props, classes){
    const page = (
        <div>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Creating charts
            </Typography>
        </div>
    )
    return page;
}

function buildAcountItems(elem, props, classes){
    const page = (
        <ListItem key= {getUniqueId(elem)}>
        {/* <React.Fragment > */}
            <div>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    {elem.bankName}{(elem.main)?" - CURRENT":""}
                </Typography>
                <Typography component="h2" variant="subtitle1" color="primary" gutterBottom>
                    {elem.accountNo}
                </Typography>
                {buildChart(elem, props, classes)}
            </div>
            
        {/* </React.Fragment> */}
        </ListItem>
    );
    return page;
}


function buildChatW(){
    const data = [
        {x: 0, y: 8},
        {x: 1, y: 5},
        {x: 2, y: 4},
        {x: 3, y: 9},
        {x: 4, y: 1},
        {x: 5, y: 7},
        {x: 6, y: 6},
        {x: 7, y: 3},
        {x: 8, y: 2},
        {x: 9, y: 0}
      ];

      return (
        <div className="App">
          <XYPlot height={300} width={300}>
            <LineSeries data={data} />
          </XYPlot>
        </div>
      );
}


// function buildChartX(){
//     const options = {
//         title: {
//             text: "Basic Column Chart"
//         },
//         data: [
//         {
//             // Change type to "doughnut", "line", "splineArea", etc.
//             type: "column",
//             dataPoints: [
//                 { label: "Apple",  y: 10  },
//                 { label: "Orange", y: 15  },
//                 { label: "Banana", y: 25  },
//                 { label: "Mango",  y: 30  },
//                 { label: "Grape",  y: 28  }
//             ]
//         }
//         ]
//     }
//     return (
//         <div>
//             <CanvasJSChart options = {options} />
//         </div>
//     );
// }



// MAIN //
function Account(props) {
//   const classes = useStyles();
    // const classes = makeStyles()
    const classes = useTheme();

  const  defaultPage = (
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Account and Insights
          </ListSubheader>
        }
        className={classes.root}
      >
          {props.user.account.accounts.map(row => (
              buildAcountItems(row, props, classes)
          ))}

            {buildChatW()}

          {/* <ListItem >
            {AccountCharts}
          </ListItem> */}
      </List>
    );

    
    return defaultPage
  
}

function mapStateToProps(state){
  return state
}

function mapDispatchToProps(dispatch){
  
  return {
    readMessage: (message)=>{
        const action = {
          type: ACTIONTYPE.INBOX_READ_MESSAGE,
          payload: message
        };
        dispatch(action);
    }
  }
}

export default connect(mapStateToProps)(Account)
// export default connect(mapStateToProps, mapDispatchToProps)(Account)












