import axios from "axios";
import * as APIBACKEND from "./../constants/api-backend"

async function callTransferSavingAccountToVault(allocation, authorizationToken){
    let url = APIBACKEND.TRANSFER_SAVINGSACCOUNT_TO_VAULT;
    let body =  allocation

    const params = {
        method: 'post',
        responseType: 'json',
        headers: {'Authorization': authorizationToken},
        url: url,
        data: body
    }
    return axios(params)
    .then(response=>{
        return response;
    }).catch(error=>{
        return error;
    })

}
export async function transferSavingAccountToVault(allocation, authorizationToken){
    const response = await callTransferSavingAccountToVault(allocation, authorizationToken);
    return response;
}



async function callTransferVaultToSavingsAccount(allocation, authorizationToken){
    let url = APIBACKEND.TRANSFER_SAVINGSACCOUNT_FROM_VAULT;
    let body =  allocation

    const params = {
        method: 'post',
        responseType: 'json',
        headers: {'Authorization': authorizationToken},
        url: url,
        data: body
    }
    return axios(params)
    .then(response=>{
        return response;
    }).catch(error=>{
        return error;
    })

}
export async function transferVaultToSavingsAccount(allocation, authorizationToken){
    const response = await callTransferVaultToSavingsAccount(allocation, authorizationToken);
    return response;
}





