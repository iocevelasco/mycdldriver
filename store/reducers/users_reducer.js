export default function(state = null, action){
    switch(action.type){
        case 'USER_DATA':
            return {...state, userProps: action.payload }
        default:
            return state;
    }
}