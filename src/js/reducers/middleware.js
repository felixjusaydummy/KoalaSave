import * as ACTIONTYPE from "../constants/action-type";
import * as STATUSTYPE from "../constants/status-type";
import * as PurseManager from "../actions/purse-manager"
import * as VaultManager from "../actions/vault-manager"
import * as RedirectManager from  "../actions/redirect-manager"
import * as LoginManager from "../actions/login-manager"
import * as AccountManager from "../actions/account-manager"
import * as INITSTATE from "./init-state"
import * as SIGNIN from "./middlewares/signin-middleware"
import * as USERACCOUNT from "./middlewares/user-account-middleware"

export const  middleware = ({dispatch}) => next => action => {
    // console.log("enter middleware");

    if(action.type === ACTIONTYPE.VIEW_REDIRECT_HOME ){
        SIGNIN.SignIn(action, dispatch)
        
    }else if(action.type === ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS ){
        USERACCOUNT.GetUserAccount(action, dispatch)

    }
    // else if(action.type === USER_PURSE_ALLOCATION_ADD) {
        
    // }

    next(action);
 }















 // delete after

// setTimeout(function() {
//     try{
//         const result = LoginManager.loginAsync(action.payload);
//         resolve(result);
//     }catch(err){
//         reject(err);
//     }
// }, 2000);