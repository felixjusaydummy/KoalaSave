import * as ACTIONTYPE from "../../constants/action-type";
import * as STATUSTYPE from "../../constants/status-type";
import * as BankAccountManager from "../../actions-api/bankaccount-manager"

export const transferSavingAccountToVault = (action, dispatch)=>{
    new Promise((resolve, reject)=>{
        try{
            let result = BankAccountManager.transferSavingAccountToVault(action.payload, action.authorization);
            resolve(result);
        }catch(err){
            reject(err);
        }
    }).then(response=>{
        if(response.data.status === STATUSTYPE.RESPOND_SUCCESS){
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_SUCCESS,
                    transaction: ACTIONTYPE.USER_SAVINGSACCOUNT_TO_VAULT_RESOLVED,
                    message: "Successfully transferred from Savings Account to Vault",
                }
            }
            action = {
                type : ACTIONTYPE.USER_SAVINGSACCOUNT_TO_VAULT_RESOLVED,
                status : STATUSTYPE.STATUS_SUCCESS,
                data : response.data.data,
                action_status: action_status
            }
            // console.log("bankaccount-middleware: "+ JSON.stringify(action, null, 2))
            dispatch(action);
        }else{
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_ERROR,
                    transaction: ACTIONTYPE.USER_SAVINGSACCOUNT_TO_VAULT_RESOLVED,
                    message: "Failed to transferred from Savings Account to Vault",
                }
            }
            action = {
                type : ACTIONTYPE.USER_SAVINGSACCOUNT_TO_VAULT_RESOLVED,
                status : STATUSTYPE.STATUS_ERROR,
                action_status: action_status
            }
            dispatch(action);
        }
    })
    .catch(error=>{
        let action_status = {
            purse: {
                status: STATUSTYPE.STATUS_ERROR,
                transaction: ACTIONTYPE.USER_SAVINGSACCOUNT_TO_VAULT_RESOLVED,
                message: "Failed to transferred from Savings Account to Vault",
            }
        }
        action = {
            type : ACTIONTYPE.USER_SAVINGSACCOUNT_TO_VAULT_RESOLVED,
            status : STATUSTYPE.QUERY_ERROR,
            action_status: action_status
        }
        dispatch(action);
    })
}




export const transferVaultToSavingsAccount = (action, dispatch)=>{
    new Promise((resolve, reject)=>{
        try{
            let result = BankAccountManager.transferVaultToSavingsAccount(action.payload, action.authorization);
            resolve(result);
        }catch(err){
            reject(err);
        }
    }).then(response=>{
        console.log("bankaccount-middleware-result: "+ JSON.stringify(response, null, 2))
        if(response.data.status === STATUSTYPE.RESPOND_SUCCESS){
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_SUCCESS,
                    transaction: ACTIONTYPE.USER_SAVINGSACCOUNT_FROM_VAULT_RESOLVED,
                    message: "Successfully transferred from Vault to Savings Account",
                }
            }
            action = {
                type : ACTIONTYPE.USER_SAVINGSACCOUNT_TO_VAULT_RESOLVED,
                status : STATUSTYPE.STATUS_SUCCESS,
                data : response.data.data,
                action_status: action_status
            }
            console.log("bankaccount-middleware-success: "+ JSON.stringify(action, null, 2))
            dispatch(action);
        }else{
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_ERROR,
                    transaction: ACTIONTYPE.USER_SAVINGSACCOUNT_FROM_VAULT_RESOLVED,
                    message: "Failed to transferred from Vault to Savings Account",
                }
            }
            action = {
                type : ACTIONTYPE.USER_SAVINGSACCOUNT_FROM_VAULT_RESOLVED,
                status : STATUSTYPE.STATUS_ERROR,
                action_status: action_status
            }
            console.log("bankaccount-middleware-error: "+ JSON.stringify(action, null, 2))
            dispatch(action);
        }
    })
    .catch(error=>{
        let action_status = {
            purse: {
                status: STATUSTYPE.STATUS_ERROR,
                transaction: ACTIONTYPE.USER_SAVINGSACCOUNT_FROM_VAULT_RESOLVED,
                message: "Failed to transferred from Vault to Savings Account",
            }
        }
        action = {
            type : ACTIONTYPE.USER_SAVINGSACCOUNT_FROM_VAULT_RESOLVED,
            status : STATUSTYPE.QUERY_ERROR,
            action_status: action_status
        }
        console.log("bankaccount-middleware-catch-error: "+ JSON.stringify(action, null, 2))
        dispatch(action);
    })
}
