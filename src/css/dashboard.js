import { makeStyles } from '@material-ui/core/styles';

var bgColors = { 
  "Default": "#81b71a",
  "Blue": "#00B1E1",
  "Cyan": "#37BC9B",
  "Green": "#8CC152",
  "DarkGreen": "#5c8037",
  "Red": "#E9573F",
  "Yellow": "#F6BB42",
};

export const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },

  paper: {
    // marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
  papertips: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: bgColors.Green
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: bgColors.Green,
    "&:hover": {
      background: bgColors.DarkGreen
    },
  },

  img: {
    width: '100%',
    height: '100%',
    alignItems: 'top',
  },

  imgtips: {
    width: '100%',
    height: 100
  }
}));

// export const useStyles = makeStyles(theme => ({
//     '@global': {
//       body: {
//         backgroundColor: theme.palette.common.white,
//       },
//     },
  
//     paper: {
//       marginTop: theme.spacing(8),
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//     },
//     avatar: {
//       margin: theme.spacing(1),
//       backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//       width: '100%', // Fix IE 11 issue.
//       marginTop: theme.spacing(1),
//     },
//     submit: {
//       margin: theme.spacing(3, 0, 2),
//     },
//   }));