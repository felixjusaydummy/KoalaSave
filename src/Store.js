import {createStore} from 'redux';

const initialState = {
    app_name: "KoalaSaveKwekwek",
    useractive : false,
    user: {
        name : "Juan dela Cruz",
        eamil: "juan@gmail.com",
        password: "juan",
        
        account: {
            accountNo: "1234",
            bankName: "BPI",
            balance: 0.0
        },

        purse: {
            totalPurse: 120,
            allocations: [
                {
                    description: "Savings",
                    amount: 10,
                    active: true
                },
                {
                    description: "Utilities",
                    amount: 10,
                    active: true
                }
            ]
        },

        vault: {
            totalPurse: 50,
            allocations: [
                {
                    description: "Savings",
                    amount: 10,
                    active: true
                },
                {
                    description: "Utilities",
                    amount: 10,
                    active: true
                }
            ]
        }

    }


}

const reducer = (state = initialState, action)=>{
    
    return state;
}

const Store = createStore(reducer);

export default Store;