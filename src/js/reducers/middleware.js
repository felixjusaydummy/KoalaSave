import * as ACTIONTYPE from "../constants/action-type";
import * as STATUSTYPE from "../constants/status-type";
import * as PurseManager from "../actions/purse-manager"
import * as VaultManager from "../actions/vault-manager"
import * as RedirectManager from  "../actions/redirect-manager"
import * as LoginManager from "../actions/login-manager"
import * as AccountManager from "../actions/account-manager"
import * as INITSTATE from "./init-state"

export const  middleware = ({dispatch}) => next => action => {
    // console.log("enter middleware");

    if(action.type === ACTIONTYPE.VIEW_REDIRECT_HOME ){
        action.login_status = STATUSTYPE.QUERY_LOADING;
        new Promise((resolve, reject)=>{
            try{
                const result = LoginManager.loginAsync(action.payload);
                resolve(result);
            }catch(err){
                reject(err);
            }
        }).then(response=>{
            if(response.data.result === STATUSTYPE.RESPOND_SUCCESS){
                action = {
                    type : ACTIONTYPE.VIEW_REDIRECT_HOME_RESOLVED,
                    login_status : STATUSTYPE.QUERY_RESOLVED,
                    login_message : "Successfully Login",
                    authorization : response.data.data.name
                }
            }else{
                action = {
                    type : ACTIONTYPE.VIEW_REDIRECT_HOME_RESOLVED,
                    login_status : STATUSTYPE.QUERY_ERROR,
                    login_message : "You have entered an invalid username and/or password"
                }
            }
            dispatch(action);
        })
        .catch(error=>{
            action = {
                type : ACTIONTYPE.VIEW_REDIRECT_HOME_RESOLVED,
                login_status : STATUSTYPE.QUERY_ERROR,
                login_message : "You have entered an invalid username and/or password"
            }
            dispatch(action);
        })
    }else if(action.type === ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS ){
        action.initializeState = true
        action.page_loading = true
        // console.log("authorization: " +action.authorization);

        new Promise((resolve, reject)=>{
            try{
                const result = AccountManager.getAccountDetails(action.authorization);
                resolve(result);
            }catch(err){
                reject(err);
            }

        }).then(response=>{
            let value = null;
            if(response.data.status === STATUSTYPE.RESPOND_SUCCESS){
                value = {
                    name: response.data.data.name,
                    account: response.data.data.account,
                    purse: response.data.data.purse,
                    vault: response.data.data.vault
                }
            }else{
                value = response.data;
            }
            
            
            action = {
                type : ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS_RESOLVED,
                initializeState: false,
                page_loading : false,
                data: value
            }
            // console.log("middleware: "+ JSON.stringify(action, null, 2))
            dispatch(action);
        })
        .catch(error=>{
            action = {
                type : ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS_RESOLVED,
                initializeState: false,
                page_loading: false
            }
            dispatch(action);
        })
        
        
    }

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