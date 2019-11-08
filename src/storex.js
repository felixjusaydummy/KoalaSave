import {createStore} from 'redux';
import {updatePurse, getPurseDetail} from  './controller/AccountManager'

const initialState = {
    app_name: "KoalaSaver",
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
            totalPurse: 120,
            allocations: [
                {
                    id: 1,
                    name: "Savings",
                    amount: 10,
                    active: true
                }
            ]
        },

        vault: {
            totalPurse: 50,
            allocations: [
                {
                    id: 1,
                    name: "Savings",
                    amount: 500,
                    active: true
                },
                {
                    id: 2,
                    name: "Utilities",
                    amount: 1234,
                    active: true
                }
            ]
        }

    }


}

const reducer = (state = initialState, action)=>{
    console.log('reducer', action);

    console.log('USER-PURSE-ALLOCATION-LOADALL', action.value);
    let allocations = getPurseDetail(state.user);            
    console.log(allocations);
    
    switch(action.type){
        case 'USER-LOGIN':
            console.log('USER-LOGIN', state.useractive);
            return Object.assign({}, state, {useractive : true});
        case 'USER-PURSE-ALLOCATION-ADD':
            console.log('USER-PURSE-ALLOCATION-ADD', action.value);
            console.log('USER-PURSE-ALLOCATION-ADD-values ', state.user.purse.allocations);
            updatePurse(state.user, action.value)
            return Object.assign({}, state, state.user.purse.allocations.push(action.value));

        case 'USER-PURSE-ALLOCATION-LOADALL':
            console.log('USER-PURSE-ALLOCATION-LOADALL', action.value);
            let allocations = getPurseDetail(state.user);            
            console.log(allocations);
        default:
            return state;
    }
}

const Storex = createStore(reducer);

export default Storex;