
import * as ACTIONTYPE from "../constants/action-type";
import * as PurseManager from "../actions/purse-manager"
import * as VaultManager from "../actions/vault-manager"
import * as RedirectManager from  "../actions/redirect-manager"

const initialState = {
    countvisit : 0,
    app_name: "Thrifty Koala",
    useractive : false,

    user: {
        userid : "ccruz_02",
        name : "Juan dela Cruz",

        account: {
            accountNo: "22012345",
            bankName: "BPI",
            balance: 9800.0
        },

        purse: {
            pocketAmount: 200,
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
                    amount: 0,
                    active: false
                },
                {
                    id: 3,
                    description: "Travel",
                    amount: 100,
                    active: true
                }
            ]
        },

        vault: {
            vaultBalance : 5900,
            pocketAmount: 500,
            allocations: [
                {
                    id: 1,
                    description: "Savings",
                    targetAmount: 1000000,
                    expiration: "Jan-01-2025",
                    requestRelease: false,
                    amount: 500
                }
            ]
        }
    },
    action_status: {
        purse: {
            status: "",
            transaction: "",
            message: ""
        }
    }
}

function rootReducer(state = initialState, action){

    //REDIRECT
    if(action.type === ACTIONTYPE.VIEW_REDIRECT_HOME ){
        RedirectManager.redirectToHome();
    }else if(action.type === ACTIONTYPE.VIEW_REDIRECT_PURSE ){
        RedirectManager.redirectToPurse();
    }else if(action.type === ACTIONTYPE.VIEW_REDIRECT_VAULT ){
        RedirectManager.redirectToVault();
    }
    
    
    //PURSE
    else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_ADD ){
        let res = PurseManager.addPurseAllocation(state, action.payload);
        res.action_status.purse.transaction = ACTIONTYPE.USER_PURSE_ALLOCATION_ADD;
        state = res;

    }else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_CASH ){
        let res = PurseManager.addCashPurseAllocation(state, action.payload);
        res.action_status.purse.transaction = ACTIONTYPE.USER_PURSE_ALLOCATION_ADD_CASH;
        state = res;

    }else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_DELETE ){
        let res = PurseManager.deletePurseAllocation(state, action.payload);
        res.action_status.purse.transaction = ACTIONTYPE.USER_PURSE_ALLOCATION_DELETE;
        state = res;
        
    }else if(action.type === ACTIONTYPE.USER_PURSE_ALLOCATION_RELEASE_CASH ){
        let res = PurseManager.setReleasePurseAllocation(state, action.payload);
        res.action_status.purse.transaction = ACTIONTYPE.USER_PURSE_ALLOCATION_RELEASE_CASH;
        state = res;
    }


    //VAULT
    else if(action.type === ACTIONTYPE.USER_VAULT_ALLOCATION_ADD ){
        let res = VaultManager.addVaultAllocation(state, action.payload);
        res.action_status.purse.transaction = ACTIONTYPE.USER_VAULT_ALLOCATION_ADD;
        state = res;

    }


    //SAVINGS ACCOUNT
    else if(action.type === ACTIONTYPE.USER_SAVINGSACCOUNT_TO_VAULT ){
        let res = VaultManager.transferSavingsAccountToVault(state, action.payload);
        res.action_status.purse.transaction = ACTIONTYPE.USER_SAVINGSACCOUNT_TO_VAULT;
        state = res;
    }else if(action.type === ACTIONTYPE.USER_SAVINGSACCOUNT_FROM_VAULT ){
        let res = VaultManager.transferVaultToSavingsAccount(state, action.payload);
        res.action_status.purse.transaction = ACTIONTYPE.USER_SAVINGSACCOUNT_FROM_VAULT;
        state = res;
    }

    else{
        console.log("Redux Undefined: " + action.type + " : " + action.payload);
    }


    state = Object.assign({}, state, {countvisit: state.countvisit+1})
    return state;
}

export default rootReducer;
