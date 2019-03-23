import axios from 'axios';
const url = 'http://redjsolutions.com/api/index.php';

export async function addItem(value, itemType, callback) {
    const bodyFormData = new FormData();
    bodyFormData.set('action', 'insert');
    bodyFormData.set('value', value);
    bodyFormData.set('type', itemType);
    bodyFormData.set('date', new Date().toISOString().slice(0,10));
    const response = await axios.post(url, bodyFormData);
    if(callback){
        callback(response.data);
    }
}

export async function fetchItems(callback) {
    const response = await axios.get(`${url}`);
    callback(response.data);
}

export async function deleteItem(id, callback) {
    const response = await axios.get(`${url}?action=delete&id=${id}`);
    callback(response.data);
}


