import * as UTILREWARDS from  './../utils/rewards-utilities'
import * as STATUSTYPE from './../constants/status-type'




function addReward(user, pointsEarned){
    user.rewards = user.rewards + pointsEarned;
    const message = UTILREWARDS.getRewardMessage(user, pointsEarned)
    const res = {
        status: STATUSTYPE.STATUS_SUCCESS,
        message: message
    }

    return res;
}



//main
export function checkIfPriviledgeForRewards(user){

    if(user.purse.allocations.length === 1){
        //NEW ALLOCATION
        const pointsEarned = 1
        const respond = addReward(user, pointsEarned);
        if(respond.status === STATUSTYPE.STATUS_SUCCESS){
            user.status = STATUSTYPE.REWARD_STATUS_BRONZE
            user.inbox.push(respond.message);
        }
    }

    return user
}