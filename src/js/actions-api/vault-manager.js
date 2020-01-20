import axios from "axios";
import * as APIBACKEND from "./../constants/api-backend"
import * as USERACCOUNT from "./account-manager"

async function callAddAllocation(allocation, authorizationToken){
    let url = APIBACKEND.VAULT_ALLOCATION_ADD;
    let body =  allocation
    const thriftpoints = 0;
    
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
    return axios(params)
    .then(response=>{
        return response;
    }).catch(error=>{
        return error;
    })

}
export async function addAllocation(allocation, authorizationToken){
    await callAddAllocation(allocation, authorizationToken);
    return USERACCOUNT.getAccountDetails(authorizationToken);
}


async function callAddCashToAllocation(payload, authorizationToken){
    let url = APIBACKEND.VAULT_ALLOCATION_ADD_CASH;
    // payload: {
    //     pocket:payload,
    //     additionAmmount: iAmount
    //   },

    const thriftpoints = 0
    const allocation = payload.pocket
    let body =  {
        newDescription: allocation.description,
        oldDescription: allocation.description,
        amount : (Number(allocation.amount) + Number(payload.additionAmmount)),
        releaseRequest : allocation.releaseRequest,
        targetAmount : allocation.targetAmount,
        expiration : allocation.expiration
    }

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
    return axios(params)
    .then(response=>{
        return response;
    }).catch(error=>{
        return error;
    })

}
export async function addCashToAllocation(allocation, authorizationToken){
    await callAddCashToAllocation(allocation, authorizationToken);
    return USERACCOUNT.getAccountDetails(authorizationToken);
}