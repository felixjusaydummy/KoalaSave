import axios from "axios";
import * as APIBACKEND from "./../constants/api-backend"
import * as USERACCOUNT from "./account-manager"

async function callTransferSavingAccountToVault(allocation, authorizationToken){
    let url = APIBACKEND.TRANSFER_SAVINGSACCOUNT_TO_VAULT;
    let body =  allocation

    const thriftpoints = 0
    const params = {
        method: 'post',
        responseType: 'json',
        headers: {
            'Authorization': authorizationToken, 
            'thriftpoints' : thriftpoints
        },
        url: url,
        data: body
    }
    // console.log("bank accounts - transfer savings to vault: "+ JSON.stringify(params, null, 2))
    return axios(params)
    .then(response=>{
        return response;
    }).catch(error=>{
        return error;
    })

}
export async function transferSavingAccountToVault(allocation, authorizationToken){
    const val = await callTransferSavingAccountToVault(allocation, authorizationToken);
    // console.log("transfer wallet to vault1: "+ JSON.stringify(val, null, 2))
    const res = await USERACCOUNT.getAccountDetails(authorizationToken);
    // console.log("transfer wallet to vault2: "+ JSON.stringify(res, null, 2))
    return res;
}



async function callTransferVaultToSavingsAccount(allocation, authorizationToken){
    let url = APIBACKEND.TRANSFER_SAVINGSACCOUNT_FROM_VAULT;
    let body =  allocation

    const thriftpoints = 0
    const params = {
        method: 'post',
        responseType: 'json',
        headers: {
            'Authorization': authorizationToken, 
            'thriftpoints' : thriftpoints
        },
        url: url,
        data: body
    }

    // console.log("bankmanger-transfer vault to savings: "+ JSON.stringify(params, null, 2))
    return axios(params)
    .then(response=>{
        return response;
    }).catch(error=>{
        return error;
    })

}
export async function transferVaultToSavingsAccount(allocation, authorizationToken){
    const response = await callTransferVaultToSavingsAccount(allocation, authorizationToken);
    const res = await USERACCOUNT.getAccountDetails(authorizationToken);
    return res
    // return response;
}



async function callEnrollAccount(allocation, authorizationToken){
    let url = APIBACKEND.BANKACCOUNT_ACCOUNTLIST_ENROLLACCOUNT;
    let body =  allocation

    const thriftpoints = 0
    const params = {
        method: 'post',
        responseType: 'json',
        headers: {
            'Authorization': authorizationToken
        },
        url: url,
        data: body
    }

    console.log("Enroll Account: "+ JSON.stringify(params, null, 2))
    
    return axios(params)
    .then(response=>{
        return response;
    }).catch(error=>{
        return error;
    })

}
export async function enrollAccount(allocation, authorizationToken){
    const response = await callEnrollAccount(allocation, authorizationToken);
    const res = await USERACCOUNT.getAccountDetails(authorizationToken);
    return res
}




