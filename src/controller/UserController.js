const axios = require('axios');

console.log("kwekwek");

axios.get('https://eu30cd1hgj.execute-api.us-east-2.amazonaws.com/prod/KoalaVaultMain/getuserdetails').then(resp => {
    console.log(resp.data);
});