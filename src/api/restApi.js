import axios from 'axios';
const url = 'http://redjsolutions.com/api/index.php';

export class AddItemInput{
    constructor(recordType, value, date, typeId, notes) {
        this.recordType = recordType;
        this.value= value;
        this.date = new Date().toISOString().slice(0,10);
        this.typeId = typeId;
        this.notes = notes;
    }
    async save(callback){
        const bodyFormData = new FormData();
        bodyFormData.set('action', 'insert');
        bodyFormData.set('value', this.value);
        bodyFormData.set('typeId', this.typeId);
        bodyFormData.set('recordType', this.recordType);
        bodyFormData.set('notes', this.notes);
        bodyFormData.set('date', this.date);
        const response = await axios.post(url, bodyFormData);
        if(callback){
            callback(response.data);
        }    
    }
}

// export async function addItem(value, itemType, callback) {
//     const bodyFormData = new FormData();
//     bodyFormData.set('action', 'insert');
//     bodyFormData.set('value', value);
//     bodyFormData.set('type', itemType);
//     bodyFormData.set('date', new Date().toISOString().slice(0,10));
//     const response = await axios.post(url, bodyFormData);
//     if(callback){
//         callback(response.data);
//     }
// }

export async function addItemType(name, dataType_1, dataName_1, dataType_2, dataName_2, callback) {
    const bodyFormData = new FormData();
    bodyFormData.set('action', 'createItemType');
    bodyFormData.set('name', name);
    bodyFormData.set('dataType_1', dataType_1);
    bodyFormData.set('dataName_1', dataName_1);
    if(dataType_2)
        bodyFormData.set('dataType_2', dataType_2);
    if(dataName_2)
        bodyFormData.set('dataName_2', dataName_2);
    const response = await axios.post(url, bodyFormData);
    if(response.data) {
        callback(response.data);
    }
}

export async function fetchItems(callback) {
    const response = await axios.get(`${url}`);
    callback(response.data);
}

export async function fetchItemTypes(callback) {
    const response = await axios.get(`${url}?action=listItemTypes`);
    callback(response.data);
}

export async function deleteItem(id, callback) {
    const response = await axios.get(`${url}?action=delete&id=${id}`);
    callback(response.data);
}

export async function deleteItemType(id, callback) {
    const response = await axios.get(`${url}?action=deleteItemType&id=${id}`);
    callback(response.data);
}


