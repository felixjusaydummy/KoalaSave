
import * as AccountManager from './account-manager'

import axios from "axios";
import * as APIBACKEND from "./../constants/api-backend"
import * as STATUSTYPE from "./../constants/status-type"

// export async function callPurseAllocationAPI(allocation, authorizationToken){
//     // console.log("purse manager: call add allocatio api")
//     let url = APIBACKEND.PURSE_ALLOCATION_ADD;
//     let body =  allocation

//     const params = {
//         method: 'post',
//         responseType: 'json',
//         headers: {'Authorization': authorizationToken},
//         url: url,
//         data: body
//     }
//     console.log("pursemanager - callPurseAllocationAPI: "+ JSON.stringify(params))

//     return axios(params)
//     .then(response=>{
//         console.log("success: "+ response)
//         return response;
//     }).catch(error=>{
//         console.log("error: "+ error)
//         return error;
//     })

// }

// export async function addPurseAllocationToDB(allocation, authorizationToken){
//     let res = null;
//     const response = await callPurseAllocationAPI(allocation, authorizationToken);
//     return response;
// }






export function addPurseAllocation(state, payload){
    // console.log("purse manager: call addPurseAllocation")

    try{
        let res =  Object.assign({}, state)

        let successTransfer = AccountManager.transferSavingAccountToPurse(res.user.account, payload, payload.amount)
        if(successTransfer){
            if(res.user.purse){
                res.user.purse.allocations.push(payload);
            }else{
                //NEW Account
                res.user.purse = {
                    pocketAmount: 0,
                    allocations: []
                }
                res.user.purse.allocations.push(payload);
            }
            
            updatePursePocketAmount(res.user.purse);

            res.action_status.purse = {
                status: STATUSTYPE.STATUS_SUCCESS,
                message: "Purse Pocket Successfully Added",
            }
        }else{
            res.action_status.purse = {
                status: STATUSTYPE.STATUS_ERROR,
                message: "Insufficient Balanace"
            }
        }

        return res;

    }catch(err){
        // console.log(err);
        let res =  Object.assign({}, state)
        res.action_status.purse = {
            status: STATUSTYPE.STATUS_ERROR,
            message: "Failed to Add Wallet Pocket Allocation."
        }

        return res;
    }
}


export function addCashPurseAllocation(state, payload){
    try{
        let res =  Object.assign({}, state)
        //TODO: Update database here
        //  0. transfer savings to purse
        //  1. ADD purse allocation
        //  2. UPDATE user purse record
        // console.log("add cash: "+ payload.description + " " + payload.additionAmmount)
        const list = res.user.purse.allocations;
        let pocket = null;
        for(let i = list.length-1; i>=0; i-- ){
            if(list[i].description === payload.description){
                //TODO: Update database here
                //  1. UPDATE user purse record
                pocket = list[i];
                break;
            }
        }
        
        let successTransfer = AccountManager.transferSavingAccountToPurse(res.user.account, payload, payload.additionAmmount)
        if(successTransfer){
            pocket.amount = Number(pocket.amount) + Number(payload.additionAmmount); 
            updatePursePocketAmount(res.user.purse);
            
            res.action_status.purse = {
                status: STATUSTYPE.STATUS_SUCCESS,
                message: "Purse Pocket Amount Successfully Added"
            }
        }else{
            res.action_status.purse = {
                status: STATUSTYPE.STATUS_ERROR,
                message: "Pocket Value exceed from the Wallet Balance limit"
            }
        }

        
        return res;

    }catch(err){
        let res =  Object.assign({}, state)
        res.action_status.purse = {
            status: STATUSTYPE.STATUS_ERROR,
            message: "Failed to Add Cash"
        }
        return res;
    }
    
}


export function setReleasePurseAllocation(state, payload){
    try{
        let res =  Object.assign({}, state)
        //TODO: Update database here
        //  1. ADD purse allocation
        //  2. UPDATE user purse record

        const list = res.user.purse.allocations;
        let pocket = null;
        for(let i = list.length-1; i>=0; i-- ){
            if(list[i].description === payload.description){
                //TODO: Update database here
                //  1. UPDATE user purse record
                pocket = list[i];
                break;
            }
        }
        if(pocket.amount>0){
            let successTransfer = AccountManager.transferPurseToSavingsAccount(res.user.account, pocket, payload.releaseAmount)
            if(successTransfer){
                pocket.amount = pocket.amount - payload.releaseAmount;
                updatePursePocketAmount(res.user.purse);
            }

            res.action_status.purse = {
                status: STATUSTYPE.STATUS_SUCCESS,
                message: "Purse Pocket Amount Successfully Released"
            }
        }else{
            res.action_status.purse = {
                status: STATUSTYPE.STATUS_ERROR,
                message: "Error: Pocket Amount is invalid"
            }
        }
        
        return res;

    }catch(err){
        let res =  Object.assign({}, state)
        res.action_status.purse = {
            status: STATUSTYPE.STATUS_ERROR,
            message: "Failed to Release Pocket Allocation"
        }
        return res;
    }
}


export function deletePurseAllocation(state, payload){
    try{
        let res =  Object.assign({}, state)
        // console.log("to delete: "+ payload.id)
        const list = res.user.purse.allocations;
        let pocket = null;
        let irem  = -1;
        for(let i = list.length-1; i>=0; i-- ){
            if(list[i].description === payload.description){
                //TODO: Update database here
                //  1. DELETE purse allocation
                //  2. UPDATE user purse record
                pocket = list[i];
                irem = i;
                break;
            }
        }

        let successTransfer = AccountManager.transferPurseToSavingsAccount(res.user.account, pocket, pocket.amount)
        if(successTransfer){
            list.splice(irem, 1);
            updatePursePocketAmount(res.user.purse);

            res.action_status.purse = {
                status: STATUSTYPE.STATUS_SUCCESS,
                message: "Purse Pocket Successfully Deleted"
            }
        }else{
            res.action_status.purse = {
                status: STATUSTYPE.STATUS_ERROR,
                message: "Error: Transferring Pursee to Savings Account"
            }
        }
        
        return res;

    }catch(err){
        let res =  Object.assign({}, state)
        res.action_status.purse = {
            status: STATUSTYPE.STATUS_ERROR,
            message: "Failed to Delete Allocation"
        }
        return res;
    }
}




//PRIVATE FUNCTION
function updatePursePocketAmount(purse){
    const list = purse.allocations;
    let purseAmount = 0;
    for(let i = list.length-1; i>=0; i-- ){
        purseAmount += Number(list[i].amount);
    }
    purse.pocketAmount = purseAmount;
}