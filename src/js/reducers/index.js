
import * as ACTIONTYPE from "../constants/action-type";
import * as STATUSTYPE from "../constants/status-type";
import * as INITSTATE from "./init-state"
import * as MIDDLEWARE from "./middleware"
import * as AUTHENTICATION from  "./../actions/authentication-manager"

import * as PurseManager from "../actions/purse-manager"
import * as VaultManager from "../actions/vault-manager"
import * as RedirectManager from  "../actions/redirect-manager"
import * as LoginManager from "../actions/login-manager"
import * as AccountManager from "../actions/account-manager"
import * as RewardManager from "../actions/rewards-manager"

const initialState = INITSTATE.initialState;
const  middleware = MIDDLEWARE.middleware;

function getInitialState(){
    // console.log("initialize state")
    initialState.authorization = AUTHENTICATION.getAuthorization();
    return initialState;
}

function rootReducer(state = getInitialState(), action){
    // console.log("enter reducer")

    //REDIRECT
    if(action.type === ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS
        || action.type === ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS_RESOLVED){
        let data = {
            initializeState: action.initializeState,
            page_loading  : action.page_loading
        }

        if(action.type === ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS_RESOLVED){
            if(action.data.status === STATUSTYPE.RESPOND_ERROR){
                AUTHENTICATION.removeAuthorization()
                RedirectManager.redirectToLogin()
            }else{
                data.user = action.data
            }
        }
        state = Object.assign({}, state, data)  
    }
    else if(action.type === ACTIONTYPE.VIEW_REDIRECT_HOME ){
        state = Object.assign({}, state, {login_status: action.login_status})  
    }else if(action.type === ACTIONTYPE.VIEW_REDIRECT_HOME_RESOLVED ){
        state = Object.assign({}, state, {login_status: action.login_status, login_message:  action.login_message})  
        if(state.login_status === STATUSTYPE.QUERY_RESOLVED){
            AUTHENTICATION.setAuthorization(action.authorization);
            RedirectManager.redirectToHome();
        }
    }else if(action.type === ACTIONTYPE.VIEW_REDIRECT_PURSE ){
        RedirectManager.redirectToPurse();
    }else if(action.type === ACTIONTYPE.VIEW_REDIRECT_VAULT ){
        RedirectManager.redirectToVault();
    }
    
    
    //PURSE
    else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_ADD ){
        let res = PurseManager.addPurseAllocation(state, action.payload);
        if(res.action_status.purse.status === STATUSTYPE.STATUS_SUCCESS){
            //create reward message
            // const pointsEarned = 1
            // const resp = RewardManager.addReward(res.user, pointsEarned);
            // if(resp.status === STATUSTYPE.STATUS_SUCCESS){
            //     res.user.inbox.push(resp.message);
            // }
            RewardManager.checkIfPriviledgeForRewards(res.user)
        }
        res.action_status.purse.transaction = ACTIONTYPE.USER_PURSE_ALLOCATION_ADD;
        state = res;

    }else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_CASH ){
        let res = PurseManager.addCashPurseAllocation(state, action.payload);
        res.action_status.purse.transaction = ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_CASH;
        state = res;

    }else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_DELETE ){
        let res = PurseManager.deletePurseAllocation(state, action.payload);
        res.action_status.purse.transaction = ACTIONTYPE.USER_PURSE_ALLOCATION_DELETE;
        state = res;
        
    }else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_RELEASE_CASH ){
        let res = PurseManager.setReleasePurseAllocation(state, action.payload);
        res.action_status.purse.transaction = ACTIONTYPE.USER_PURSE_ALLOCATION_RELEASE_CASH;
        state = res;
    }


    //VAULT
    else if(action.type === ACTIONTYPE.USER_VAULT_ALLOCATION_ADD ){
        let res = VaultManager.addVaultAllocation(state, action.payload);
        res.action_status.purse.transaction = ACTIONTYPE.USER_VAULT_ALLOCATION_ADD;
        state = res;
    }else if(action.type === ACTIONTYPE.USER_VAULT_ALLOCATION_ADD_CASH ){
        let res = VaultManager.addCashVaultAllocation(state, action.payload);
        res.action_status.purse.transaction = ACTIONTYPE.USER_VAULT_ALLOCATION_ADD;
        state = res;
    }
    

    //SAVINGS ACCOUNT
    else if(action.type === ACTIONTYPE.USER_SAVINGSACCOUNT_TO_VAULT ){
        let res = VaultManager.transferSavingsAccountToVault(state, action.payload);
        res.action_status.purse.transaction = ACTIONTYPE.USER_SAVINGSACCOUNT_TO_VAULT;
        state = res;
    }else if(action.type === ACTIONTYPE.USER_SAVINGSACCOUNT_FROM_VAULT ){
        let res = VaultManager.transferVaultToSavingsAccount(state, action.payload);
        res.action_status.purse.transaction = ACTIONTYPE.USER_SAVINGSACCOUNT_FROM_VAULT;
        state = res;
    }

    else if(action.type === ACTIONTYPE.MESSAGE_RESET_DEFAULT){
        state = Object.assign(
            {},
            state, 
            {
                action_status: {
                    purse: {
                        status: "",
                        transaction: "",
                        message: ""
                    }
                }
            })    
    }

    //INBOX
    else if (action.type === ACTIONTYPE.INBOX_READ_MESSAGE){
        state = Object.assign({}, state, {current_inbox: action.payload}) 
    }else if(action.type === ACTIONTYPE.INBOX_CLOSE_MESSAGE){
        state = Object.assign({}, state, {current_inbox: null}) 
    }
       


    state = Object.assign({}, state, {countvisit: state.countvisit+1})    
    // console.log("return reducer: "+ JSON.stringify(state, null, 2))
    return state;
}

// export default rootReducer;
export{
    rootReducer,
    middleware
}
