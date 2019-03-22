import axios from 'axios';
const url = 'http://redjsolutions.com/api/index.php';

export const ACTION_TYPES = {
    FETCH: 'FETCH',
    DELETE: 'DELETE',
    ADD: 'ADD',
};


export async function apiReducer(state, action) {
    const date = new Date().toISOString().slice(0,10);
    let response;

    switch (action.type) {
        case ACTION_TYPES.FETCH:
            response = await axios.get(`${url}`);
            if (action.callback) {
                action.callback(response.data);
            }
            break;
        case ACTION_TYPES.DELETE:
            response = await axios.get(`${url}?action=delete&id=${action.id}`);
            if (action.callback) {
                action.callback();
            }
            break;
        case ACTION_TYPES.ADD:
            const bodyFormData = new FormData();
            bodyFormData.set('action', 'insert');
            bodyFormData.set('value', action.value);
            bodyFormData.set('date', date);
            response = await axios.post(url, bodyFormData);
            if (action.callback) {
                action.callback();
            }
            break;
        default:
            throw new Error();
    }
}