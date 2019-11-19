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
    //  1. ADD purse allocation
    //  2. UPDATE user purse record
    res.user.purse.allocations.push(payload);
    return res;
}

export function addCashPurseAllocation(state, payload){
    let res =  Object.assign({}, state)
    //TODO: Update database here
    //  1. ADD purse allocation
    //  2. UPDATE user purse record
    console.log("add cash: "+ payload.description + " " + payload.additionAmmount)
    const list = res.user.purse.allocations;
    for(let i = list.length-1; i>=0; i-- ){
        if(list[i].id == payload.id){
            //TODO: Update database here
            //  1. UPDATE user purse record
            list[i].amount = Number(list[i].amount) + Number(payload.additionAmmount); 
            break;
        }
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
    for(let i = list.length-1; i>=0; i-- ){
        if(list[i].id == payload.id){
            //TODO: Update database here
            //  1. UPDATE user purse record
            list[i].active = Boolean(payload.setActiveTo)
            break;
        }
    }
    return res;
}



export function deletePurseAllocation(state, payload){
    let res =  Object.assign({}, state)

    console.log("to delete: "+ payload.id)
    const list = res.user.purse.allocations;
    for(let i = list.length-1; i>=0; i-- ){
        if(list[i].id == payload.id){
            //TODO: Update database here
            //  1. DELETE purse allocation
            //  2. UPDATE user purse record
            list.splice(i, 1);
            break;
        }
    }
    return res;
}

