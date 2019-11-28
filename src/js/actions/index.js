import * as URLLIST from "../constants/url-list";


export function redirectToHome(){
    window.location = URLLIST.URL_USER_HOME;
}

export function redirectToPurse(){
    window.location = URLLIST.URL_USER_PURSE;
}

export function redirectToVault(){
    window.location = URLLIST.URL_USER_VAULT;
}








export function addPurseAllocation(state, payload){
    let res =  Object.assign({}, state)
    //TODO: Update database here
    //  0. call bank api for transfer
    //  1. ADD purse allocation
    //  2. UPDATE user purse record

    if(Number(payload.amount)<=0){
        payload.active = false;
    }
    let successTransfer = transferSavingAccountToPurse(res.user.account, payload, payload.amount)
    if(successTransfer){
        res.user.purse.allocations.push(payload);
        updatePursePocketAmount(res.user.purse);
    }
    
    return res;
}

export function addCashPurseAllocation(state, payload){
    let res =  Object.assign({}, state)
    //TODO: Update database here
    //  0. transfer savings to purse
    //  1. ADD purse allocation
    //  2. UPDATE user purse record
    console.log("add cash: "+ payload.description + " " + payload.additionAmmount)
    const list = res.user.purse.allocations;
    let pocket = null;
    for(let i = list.length-1; i>=0; i-- ){
        if(list[i].id == payload.id){
            //TODO: Update database here
            //  1. UPDATE user purse record
            pocket = list[i];
            break;
        }
    }
    
    let successTransfer = transferSavingAccountToPurse(res.user.account, payload, payload.additionAmmount)
    if(successTransfer){
        pocket.amount = Number(pocket.amount) + Number(payload.additionAmmount); 
        pocket.active = true;
        updatePursePocketAmount(res.user.purse);
    }
    return res;
}


export function setLockPurseAllocation(state, payload){
    let res =  Object.assign({}, state)
    //TODO: Update database here
    //  1. ADD purse allocation
    //  2. UPDATE user purse record
    console.log("set lock allocation: "+ payload.description + " " + payload.active +" "+ payload.setActiveTo)
    const list = res.user.purse.allocations;
    let pocket = null;
    for(let i = list.length-1; i>=0; i-- ){
        if(list[i].id == payload.id){
            //TODO: Update database here
            //  1. UPDATE user purse record
            pocket = list[i];
            break;
        }
    }
    if(pocket.amount>0){
        let successTransfer = transferPurseToSavingsAccount(res.user.account, pocket, pocket.amount)
        if(successTransfer){
            pocket.amount = 0;
            pocket.active = Boolean(payload.setActiveTo)
            updatePursePocketAmount(res.user.purse);
        }
    }
    return res;
}


export function deletePurseAllocation(state, payload){
    let res =  Object.assign({}, state)

    console.log("to delete: "+ payload.id)
    const list = res.user.purse.allocations;
    let pocket = null;
    let irem  = -1;
    for(let i = list.length-1; i>=0; i-- ){
        if(list[i].id == payload.id){
            //TODO: Update database here
            //  1. DELETE purse allocation
            //  2. UPDATE user purse record
            pocket = list[i];
            irem = i;
            break;
        }
    }

    
    let successTransfer = transferPurseToSavingsAccount(res.user.account, pocket, pocket.amount)
    if(successTransfer){
        list.splice(irem, 1);
        updatePursePocketAmount(res.user.purse);
    }
    return res;
}

// PRIVATE FUNCTIONS
function transferSavingAccountToPurse(account, pocket, amount){
    //TODO: call Bank API to update balance
    if(account.balance>=amount){
        account.balance = Number(account.balance) - Number(amount) 
        return true;
    }else{
        return false;
    }
    
}

function transferPurseToSavingsAccount(account, pocket, amount){
    //TODO: call Bank API to update balance
    account.balance = Number(account.balance) + Number(amount)
    return true;
}

function updatePursePocketAmount(purse){
    const list = purse.allocations;
    let purseAmount = 0;
    for(let i = list.length-1; i>=0; i-- ){
        purseAmount += Number(list[i].amount);
    }
    purse.pocketAmount = purseAmount;
}