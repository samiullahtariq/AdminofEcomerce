import axios from 'axios'

//creating baseurl so that we dont need write again and again in every file
const BASE_URL = "/api/"

//getting token from localstorage we can also use cookies for getting token

const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken


console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken)



export const publicRequest = axios.create({
    baseURL : BASE_URL
})

// the person who is loged in 

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers : {token : `Bearer ${TOKEN}`}
})