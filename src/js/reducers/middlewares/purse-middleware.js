import * as ACTIONTYPE from "../../constants/action-type";
import * as STATUSTYPE from "../../constants/status-type";
import * as PurseManager from "../../actions/purse-manager"
import * as RewardManager from "../../actions/rewards-manager"

export const addAllocation = (action, dispatch)=>{

    new Promise((resolve, reject)=>{
        try{
            // let result = PurseManager.addPurseAllocationToDB(action.payload, action.authorization);
            // resolve(result);

            //remove this after
            let tempState = {
                user: action.user,
                action_status: {
                    purse: {
                        status: "",
                        transaction: "",
                        message: ""
                    }
                },
            }

            let res = PurseManager.addPurseAllocation(tempState, action.payload);
            if(res.action_status.purse.status === STATUSTYPE.STATUS_SUCCESS){
                RewardManager.checkIfPriviledgeForRewards(res.user)
            }
            

            let tempres = {
                data: {
                    status : STATUSTYPE.RESPOND_SUCCESS,
                    data : res.user,
                    action_status: res.action_status
                }
            }
            resolve(tempres)
        }catch(err){
            reject(err);
        }
    }).then(response=>{
        if(response.data.status === STATUSTYPE.RESPOND_SUCCESS){
            action = {
                type : ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_RESOLVED,
                status : STATUSTYPE.STATUS_SUCCESS,
                data : response.data.data,
                action_status: response.data.action_status
            }
            console.log("pursemiddleware succss: "+ JSON.stringify(action))
            dispatch(action);
        }else{
            action = {
                type : ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_RESOLVED,
                status : STATUSTYPE.STATUS_ERROR,
                action_status: response.data.action_status
            }
            console.log("pursemiddleware error: "+ JSON.stringify(action))
            dispatch(action);
        }
    })
    .catch(error=>{
        // console.log("Error Purse Middlware: "+error)
        action = {
            type : ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_RESOLVED,
            status : STATUSTYPE.QUERY_ERROR,
            message : "Failed to add Wallet Allocation",
            action_status: {
                loading: false,
                purse: {
                    status: STATUSTYPE.STATUS_ERROR,
                    message: "Failed to add Wallet Allocation"
                }
            }
        }
        console.log("pursemiddleware catch error: "+ JSON.stringify(error))
        dispatch(action);
    })
}