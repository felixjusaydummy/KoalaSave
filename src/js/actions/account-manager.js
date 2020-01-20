import axios from "axios";
import * as APIBACKEND from "./../constants/api-backend"
import * as STATUSTYPE from "./../constants/status-type"

export function transferSavingAccountToPurse(account, pocket, amount){
    //TODO: call Bank API to update balance
    if(account.balance>=amount){
        account.balance = Number(account.balance) - Number(amount) 
        return true;
    }else{
        return false;
    }
}

export function transferPurseToSavingsAccount(account, pocket, amount){
    //TODO: call Bank API to update balance
    account.balance = Number(account.balance) + Number(amount)
    return true;
}


export function transferSavingAccountToVault(account, amount){
    //TODO: call Bank API to update balance
    if(account.balance>=amount){
        account.balance = Number(account.balance) - Number(amount) 
        return true;
    }else{
        return false;
    }
}


export function transferVaultToSavingsAccount(account, amount){
    //TODO: call Bank API to update balance
    account.balance = Number(account.balance) + Number(amount)
    return true;
}












//-------- CONNECT TO AWS GATEWAY ---------------//
// async function callAccountDetails(authorizationToken){
//     let url = APIBACKEND.GETACCOUNTDETAILS;
    
//     return axios({
//         method: 'get',
//         headers: {'authorization': authorizationToken},
//         responseType: 'json',
//         url: url
//     })
//     .then(response=>{
//         return response;
//     }).catch(error=>{
//         return error;
//     })

// }
// export async function getAccountDetails(authorizationToken){
//     let res = null;
//     const response = await callAccountDetails(authorizationToken);
//     return response;
// }

