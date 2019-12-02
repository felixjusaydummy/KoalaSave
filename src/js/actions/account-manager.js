

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