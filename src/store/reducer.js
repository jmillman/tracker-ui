export default function(state, action) {
    let retState;
    switch (action.type) {
        case 'taskCompleted':
            retState =  Object.assign({}, state, {data: action.data});
            return retState;
        case 'taskLists':
            retState =  Object.assign({}, state, {taskLists: action.data});
            console.log('taskLists');
            return retState;
        case 'ITEMTYPES':
            const itemTypes = action.itemTypes.reduce((accum, current) => {
                accum[current.id] = current;
                return accum;
            }, {});
            console.log('itemtypes');
            retState =  Object.assign({}, state, {itemTypes: itemTypes});
            return retState;
        case 'REPORT':
            console.error('REPORT=%O', action);
            return state;
        default:
            return state;
    }
}