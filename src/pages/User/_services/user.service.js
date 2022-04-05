import { authHeader } from '../_helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    getAll,
    addUser,
    googlelogin,
    getProfile,
    update,
    changePassword,
    forgotpassword,
    delete: _delete
};


function addUser(user) {
    axios.post('http://localhost:5000/users/add',user)
    .then(res =>{
        console.log("User added!")
    })
    .catch(err=>{
        console.log(err)
    })
}
function googlelogin(tokenId){
    axios({
        method:"POST",
        url:"http://localhost:5000/users/googlelogin",
        data: {
            tokenId : tokenId
        }
    }).then(res => {
        localStorage.setItem('token',res.data.accessToken)
        authHeader();
        console.log(localStorage.getItem('token'))
    })
}
function login(username, password) {
    const data = {
        username : username,
        mailAddress : username,
        password : password
    }
    axios.post(`http://localhost:5000/users/login`,data)
    .then(res=> {
        localStorage.setItem('token',res.data.accessToken)
        localStorage.setItem('username',username)
        localStorage.setItem('mailAddress',username)
        localStorage.setItem('password',password)
        authHeader();
        console.log(localStorage.getItem('token'))
    })
    .catch(err=>{
        console.log(err+"err")
    })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`http://localhost:5000/users`, requestOptions)
    .then(res => {
        console.log("success")
        console.log(res.data)
        res = res.data
    })
}

function getProfile() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    const result = axios.get(`http://localhost:5000/users/profile/`+localStorage.getItem('username'),requestOptions)
    .then((res) =>  res.data)
    return result
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost:5000/users/add`, requestOptions).then(handleResponse);
}

async function forgotpassword(mailAddress){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return await axios.post(`http://localhost:5000/users/ForgotPassword/`+mailAddress, requestOptions)
}
async function changePassword(mailAddress,password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

    };
    return await axios.put('http://localhost:5000/users/PasswordUpdate/'+mailAddress+"/"+password,requestOptions)
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost:5000/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://localhost:5000/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
