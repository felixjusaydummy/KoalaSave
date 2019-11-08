import {createStore} from 'redux';

const initialState = {
    app_name: "KoalaSaveKwekwek",
    useractive : false,
    user: {
        accntNo : "1",
        accntName : "1",
        name : "Juan dela Cruz",
        
        
        
        account: {
            accountNo: "1234",
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
                },
                {
                    id: 2,
                    name: "Utilities",
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

    switch(action.type){
        case 'USER-LOGIN':
            console.log('USER-LOGIN', state.useractive);
            return Object.assign({}, state, {useractive : true});
        case 'USER-PURSE-ALLOCATION-ADD':
            console.log('USER-PURSE-ALLOCATION-ADD', action.value);
            console.log('USER-PURSE-ALLOCATION-ADD-values ', state.user.purse.allocations);
            return Object.assign({}, state, state.user.purse.allocations.push(action.value));
        default:
            return state;
    }
}

const Store = createStore(reducer);

export default Store;