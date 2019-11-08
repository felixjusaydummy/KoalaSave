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

export async function updatePurse(user, allocation){

    let params = {
        user_id: user.userid,
        acct_num: user.account.accountNo,
        allocation_id: allocation.id,
        name: allocation.description,
        amount: allocation.amount,
        active: allocation.active
    }

    let urlt = "https://eu30cd1hgj.execute-api.us-east-2.amazonaws.com/prod/KoalaVaultMain/updatepurse";
    let res =  await axios.post(urlt, params);
    console.log("SEND PURSE DATA TO SERVER", res);

}



export async function getPurseDetail(user){
    let params =
    {
        user_id: user.userid,
        acct_num: user.account.accountNo
    }

    let urlt = "https://eu30cd1hgj.execute-api.us-east-2.amazonaws.com/prod/KoalaVaultMain/getpursedetails?user_id=scooper_03&acct_num=102";
    

    console.log('GET PURSE DETAILS url - ', urlt)
    console.log('GET PURSE DETAILS - ', params)
    
    let res =  await axios.get(urlt);
    return res;

}