export default function(state, action) {
    let retState;
    switch (action.type) {
        case 'taskCompleted':
            retState =  Object.assign({}, state, {data: action.data});
            return retState;
        case 'taskLists':
            retState =  Object.assign({}, state, {taskLists: action.data});
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