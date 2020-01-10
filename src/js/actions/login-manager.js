import axios from "axios";
import * as APIBACKEND from "./../constants/api-backend"
import * as STATUSTYPE from "./../constants/status-type"

// export async function login(state, param){

async function checkCredentials(param){
    let url = APIBACKEND.SIGNIN;
    let body =  { 
        username: param.username,
        password: param.password
    }

    return axios({
        method: 'post',
        responseType: 'json',
        url: url,
        data: body
    })
    .then(response=>{
        return response;
    }).catch(error=>{
        return error;
    })

}

export async function loginAsync(param){
    let res = null;
    const response = await checkCredentials(param);
    return response;
}