import * as ACTIONTYPE from "../../constants/action-type";
import * as STATUSTYPE from "../../constants/status-type";
import * as VaultManager from "../../actions-api/vault-manager"

export const addAllocation = (action, dispatch)=>{
    new Promise((resolve, reject)=>{
        try{
            let result = VaultManager.addAllocation(action.payload, action.authorization);
            resolve(result);
        }catch(err){
            reject(err);
        }
    }).then(response=>{
        if(response.data.status === STATUSTYPE.RESPOND_SUCCESS){
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_SUCCESS,
                    transaction: ACTIONTYPE.USER_VAULT_ALLOCATION_ADD_RESOLVED,
                    message: "Vault Allocation Successfully Added",
                }
            }
            action = {
                type : ACTIONTYPE.USER_VAULT_ALLOCATION_ADD_RESOLVED,
                status : STATUSTYPE.STATUS_SUCCESS,
                data : response.data.data,
                action_status: action_status
            }
            dispatch(action);
        }else{
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_ERROR,
                    transaction: ACTIONTYPE.USER_VAULT_ALLOCATION_ADD_RESOLVED,
                    message: "Failed to Add Vault Allocation.",
                }
            }
            action = {
                type : ACTIONTYPE.USER_VAULT_ALLOCATION_ADD_RESOLVED,
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
                transaction: ACTIONTYPE.USER_VAULT_ALLOCATION_ADD_RESOLVED,
                message: "Failed to Add Vault Allocation.",
            }
        }
        action = {
            type : ACTIONTYPE.USER_VAULT_ALLOCATION_ADD_RESOLVED,
            status : STATUSTYPE.QUERY_ERROR,
            action_status: action_status
        }
        dispatch(action);
    })
}


export const addCashToAllocation = (action, dispatch)=>{
    new Promise((resolve, reject)=>{
        try{
            let result = VaultManager.addCashToAllocation(action.payload, action.authorization);
            resolve(result);
        }catch(err){
            reject(err);
        }
    }).then(response=>{
        console.log("vault add cash: "+ JSON.stringify(response, null, 2))
        if(response.data.status === STATUSTYPE.RESPOND_SUCCESS){
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_SUCCESS,
                    transaction: ACTIONTYPE.USER_VAULT_ALLOCATION_ADD_CASH_RESOLVED,
                    message: "Successfully Added Additional Vault Allocation Cash",
                }
            }
            action = {
                type : ACTIONTYPE.USER_VAULT_ALLOCATION_ADD_CASH_RESOLVED,
                status : STATUSTYPE.STATUS_SUCCESS,
                data : response.data.data,
                action_status: action_status
            }
            dispatch(action);
        }else{
            let action_status = {
                purse: {
                    status: STATUSTYPE.STATUS_ERROR,
                    transaction: ACTIONTYPE.USER_VAULT_ALLOCATION_ADD_CASH_RESOLVED,
                    message: "Failed to Add Cash to Vault Allocation.",
                }
            }
            action = {
                type : ACTIONTYPE.USER_VAULT_ALLOCATION_ADD_CASH_RESOLVED,
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
                transaction: ACTIONTYPE.USER_VAULT_ALLOCATION_ADD_CASH_RESOLVED,
                message: "Failed to Add Cash to Vault Allocation.",
            }
        }
        action = {
            type : ACTIONTYPE.USER_VAULT_ALLOCATION_ADD_CASH_RESOLVED,
            status : STATUSTYPE.QUERY_ERROR,
            action_status: action_status
        }
        dispatch(action);
    })
}