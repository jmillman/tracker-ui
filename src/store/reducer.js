export default function(state, action) {
    let retState;
    switch (action.type) {
        case 'DATA':
            retState =  Object.assign({}, state, {data: action.data});
            return retState;
        case 'ITEMTYPES':
            retState =  Object.assign({}, state, {itemTypes: action.itemTypes});
            return retState;
        case 'REPORT':
            console.error('REPORT=%O', action);
            return state;
        default:
            return state;
    }
}