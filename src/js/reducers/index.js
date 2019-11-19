
import * as ACTIONTYPE from "../constants/action-type";

import { 
    redirectToHome, 
    redirectToPurse, 
    redirectToVault ,
    addPurseAllocation,
    addCashPurseAllocation,
    deletePurseAllocation,
    setLockPurseAllocation

} from "../actions/index";

const initialState = {
    countvisit : 0,
    app_name: "Thrifty Koala",
    useractive : false,
    user: {
        userid : "ccruz_02",
        name : "Juan dela Cruz",

        account: {
            accountNo: "101",
            bankName: "BPI",
            balance: 10000.0
        },

        purse: {
            purseAmount: 0,
            pocketAmount: 0,
            totalBalance: 0,

            allocations: [
                {
                    id: 1,
                    description: "Savings",
                    amount: 100,
                    active: true
                },
                {
                    id: 2,
                    description: "Utilities",
                    amount: 100,
                    active: false
                },
                {
                    id: 3,
                    description: "Travel",
                    amount: 100,
                    active: true
                },
                {
                    id: 4,
                    description: "Shopping",
                    amount: 100,
                    active: false
                }
            ]
        },

        vault: {
            amount: 50,
            balance: 2, 
            allocations: [
                {
                    id: 1,
                    description: "Savings",
                    amount: 500,
                    active: true
                }
            ]
        }
    }
}

function rootReducer(state = initialState, action){
    if(action.type === ACTIONTYPE.VIEW_REDIRECT_HOME ){
        redirectToHome();
    }else if(action.type === ACTIONTYPE.VIEW_REDIRECT_PURSE ){
        redirectToPurse();
    }else if(action.type === ACTIONTYPE.VIEW_REDIRECT_VAULT ){
        redirectToVault();
    }else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_ADD ){
        state = addPurseAllocation(state, action.payload);
    }else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_CASH ){
        state = addCashPurseAllocation(state, action.payload);
    }else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_DELETE ){
        state = deletePurseAllocation(state, action.payload);
    }else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_SET_ACTIVE ){
        state = setLockPurseAllocation(state, action.payload);
    }
    state = Object.assign({}, state, {countvisit: state.countvisit+1})
    return state;
}

export default rootReducer;
