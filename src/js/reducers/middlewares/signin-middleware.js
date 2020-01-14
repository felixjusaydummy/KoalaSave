import * as ACTIONTYPE from "../../constants/action-type";
import * as STATUSTYPE from "../../constants/status-type";
import * as PurseManager from "../../actions/purse-manager"
import * as VaultManager from "../../actions/vault-manager"
import * as RedirectManager from  "../../actions/redirect-manager"
import * as LoginManager from "../../actions/login-manager"
import * as AccountManager from "../../actions/account-manager"
import * as INITSTATE from "./../init-state"
import * as SIGNIN from "./../middlewares/signin-middleware"

export const SignIn = (action, dispatch)=>{
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
}


