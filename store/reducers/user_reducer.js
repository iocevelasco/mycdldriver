export default function(state = null, action){
    switch(action.type){
        case 'USER_DATA':
            return {...state, props: action.payload }
        default:
            return state;
    }
}