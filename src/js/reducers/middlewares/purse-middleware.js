import * as ACTIONTYPE from "../../constants/action-type";
import * as STATUSTYPE from "../../constants/status-type";
import * as PurseManager from "../../actions/purse-manager"

export const addAllocation = (action, dispatch)=>{
    
    new Promise((resolve, reject)=>{
        try{
            let result = PurseManager.addPurseAllocationToDB(action.payload, action.authorization);
            resolve(result);

            //remove this after
            // let tempState = {
            //     user: action.user,
            //     action_status: {
            //         purse: {
            //             status: "",
            //             transaction: "",
            //             message: ""
            //         }
            //     },
            // }

            // let res = PurseManager.addPurseAllocation(tempState, action.payload);
            // let tempres = {
            //         result : STATUSTYPE.RESPOND_SUCCESS,
            //         data : res.user
            // }
            // resolve(tempres)
            
            
        }catch(err){
            reject(err);
        }
    }).then(response=>{
        // console.log("purse middleware - add1: " + JSON.stringify(response))
        
        if(response.data.status === STATUSTYPE.RESPOND_SUCCESS){
            action = {
                type : ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_RESOLVED,
                status : STATUSTYPE.QUERY_RESOLVED,
                data : response.data.data
            }

            // console.log("purse middleware - add2: " + JSON.stringify(action))
            dispatch(action);
        }else{
            action = {
                type : ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_RESOLVED,
                status : STATUSTYPE.QUERY_ERROR,
            }
            dispatch(action);
        }
        
    })
    .catch(error=>{
        console.log("Error Purse Middlware: "+error)
        action = {
            type : ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_RESOLVED,
            status : STATUSTYPE.QUERY_ERROR,
            message : "Failed to add Wallet Allocation"
        }
        dispatch(action);
    })


    // let res = PurseManager.addPurseAllocation(state, action.payload);
    // res.action_status.purse.transaction = ACTIONTYPE.USER_PURSE_ALLOCATION_ADD;
    // state = res;

}