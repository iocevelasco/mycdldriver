import axios from "axios";


export function getUsers(){

    const request = axios.get('https://jsonplaceholder.typicode.com/users')
    .then( response => response.data )

    return {
        type: 'GET_USERS',
        payload: request
    }
}