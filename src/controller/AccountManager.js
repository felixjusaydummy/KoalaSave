const axios = require('axios');

export function getSumAllocation(allocations){
    let sum = 0;
    allocations.map(row => (sum += row.amount))
    return sum;
}


export function getUserPurseBalance(user){
    let sum = 0;
    user.purse.allocations.map(row => (sum += row.amount))
    return user.account.balance - sum;
}

export function getVaultBalance(user){
    let sum = 0;
    user.vault.allocations.map(row => (sum += row.amount))
    return user.account.balance - sum;
}

export function updatePurse(accountname, accountid, description, amount){
    axios.get('https://eu30cd1hgj.execute-api.us-east-2.amazonaws.com/prod/KoalaVaultMain/getuserdetails').then(resp => {
        console.log(resp.data);
    });
}

