export const initialState = {
    countvisit : 0,
    app_name: "Thrifty Koala",
    useractive : false,
    authorization: "",
    action_status: {
        purse: {
            status: "",
            transaction: "",
            message: ""
        }
    },

    login_status : "",
    login_message: "",
    initializeState: true,
    page_loading  : false
}



const backupinitialState = {
    countvisit : 0,
    app_name: "Thrifty Koala",
    useractive : false,
    authorization: "",

    user: {
        userid : "ccruz_02",
        name : "Juan dela Cruz",

        account: {
            accountNo: "22012345",
            bankName: "BPI",
            balance: 339800.0
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
                    expiration: "2012-04-23T00:00:00.000Z",
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
    },

    login_status : "",
    login_message: "",
    initializeState: false
}
