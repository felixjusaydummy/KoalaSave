import * as ACTIONTYPE from "../../constants/action-type";
import * as STATUSTYPE from "../../constants/status-type";
import * as AccountManager from "../../actions-api/account-manager"

export const GetUserAccount = (action, dispatch)=>{
    action.initializeState = true
    action.page_loading = true

    new Promise((resolve, reject)=>{
        try{
            const result = AccountManager.getAccountDetails(action.authorization);
            resolve(result);
        }catch(err){
            reject(err);
        }

    }).then(response=>{
        let value = null;
        
        if(response.data.status === STATUSTYPE.RESPOND_SUCCESS){
            value = response.data.data
        }else{
            value = response.data;
        }
        
        // console.log(response.data.status + " : " + STATUSTYPE.RESPOND_SUCCESS)
        // console.log(JSON.stringify(value, null, 2))

        action = {
            type : ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS_RESOLVED,
            initializeState: false,
            page_loading : false,
            data: value
        }
        // console.log("middleware: "+ JSON.stringify(action, null, 2))
        dispatch(action);
    })
    .catch(error=>{
        action = {
            type : ACTIONTYPE.USER_INITIALIZE_ACCOUNT_DETAILS_RESOLVED,
            initializeState: false,
            page_loading: false
        }
        dispatch(action);
    })
}