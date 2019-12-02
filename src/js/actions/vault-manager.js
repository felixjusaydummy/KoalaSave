import * as STATUS from "../constants/status-type"
import * as AccountManager from './account-manager'


export function transferSavingsAccountToVault(state, payload){
    try{
        let res =  Object.assign({}, state)
        //TODO: Update database here
        //  0. call bank api for transfer
        //  1. UPDATE user vault record

        if(Number(payload.amount)>0){
            let successTransfer = AccountManager.transferSavingAccountToVault(res.user.account, payload.amount)
            if(successTransfer){
                res.user.vault.vaultBalance = res.user.vault.vaultBalance + payload.amount; 

                res.action_status.purse = {
                    status: STATUS.STATUS_SUCCESS,
                    message: "Wallet Balance to Vault Successfully Transferred"
                }
            }else{
                res.action_status.purse = {
                    status: STATUS.STATUS_ERROR,
                    message: "Error occured in Transferring Wallet Balance to Vault"
                }
            }
        }else{
            res.action_status.purse = {
                status: STATUS.STATUS_ERROR,
                message: "Insufficient Balanace"
            }
        }
        return res;

    }catch(err){
        let res =  Object.assign({}, state)
        res.action_status.purse = {
            status: STATUS.STATUS_ERROR,
            message: "Failed to Transfer Savings Account to Vault"
        }

        return res;
    }
}


export function transferVaultToSavingsAccount(state, payload){
    try{
        let res =  Object.assign({}, state)
        //TODO: Update database here
        //  0. call bank api for transfer
        //  1. UPDATE user vault record

        if(Number(payload.amount)>0){
            let successTransfer = AccountManager.transferVaultToSavingsAccount(res.user.account, payload.amount)
            if(successTransfer){
                res.user.vault.vaultBalance = res.user.vault.vaultBalance - payload.amount; 

                res.action_status.purse = {
                    status: STATUS.STATUS_SUCCESS,
                    message: "Vault Balance to Savings Account Successfully Transferred"
                }
            }else{
                res.action_status.purse = {
                    status: STATUS.STATUS_ERROR,
                    message: "Error occured in Transferring Vault Balance to Savings Account"
                }
            }
        }else{
            res.action_status.purse = {
                status: STATUS.STATUS_ERROR,
                message: "Insufficient Balanace"
            }
        }
        return res;

    }catch(err){
        let res =  Object.assign({}, state)
        res.action_status.purse = {
            status: STATUS.STATUS_ERROR,
            message: "Failed to Transfer Vault Balance to Saving Account"
        }

        return res;
    }
}


export function addVaultAllocation(state, payload){

    try{
        let res =  Object.assign({}, state)
        //TODO: Update database here
        //  0. call bank api for transfer
        //  1. ADD purse allocation
        //  2. UPDATE user purse record
        
        if(res.user.vault.vaultBalance>=payload.amount){
            res.user.vault.vaultBalance = Number(res.user.vault.vaultBalance) - Number(payload.amount); 
            //TODO: Generate ID
            let len = res.user.vault.allocations.length;
            let id = 1
            if(len>0){
                id = res.user.vault.allocations[len-1].id + 1;
            }
            payload.id = id;

            payload.requestRelease = false;
            res.user.vault.allocations.push(payload);
            updateVaultPocketAmount(res.user.purse);

            res.action_status.purse = {
                status: STATUS.STATUS_SUCCESS,
                message: "Purse Pocket Successfully Added",
            }
        }else{
            res.action_status.purse = {
                status: STATUS.STATUS_ERROR,
                message: "Insufficient Balanace"
            }
        }
        
        

        return res;

    }catch(err){
        let res =  Object.assign({}, state)
        res.action_status.purse = {
            status: STATUS.STATUS_ERROR,
            message: "Failed to Add Vault Pocket Allocation"
        }

        return res;
    }
}



//PRIVATE FUNCTION
function updateVaultPocketAmount(vault){
    const list = vault.allocations;
    let vaultAmount = 0;
    for(let i = list.length-1; i>=0; i-- ){
        vaultAmount += Number(list[i].amount);
    }
    vault.pocketAmount = vaultAmount;
}