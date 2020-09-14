export default function(state = null, action){
    switch(action.type){
        case 'GET_USERS':
            return {...state, user: action.payload }
        default:
            return state;
    }
}