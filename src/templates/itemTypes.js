export const ItemDataTypes = {
    EVENT_HAPPENED: 'EVENT_HAPPENED',
    NUMBER: 'NUMBER',
};

class ItemType {
    constructor(name, itemDataType, dataTypeName = '') {
        this.name = name;
        this.itemDataType = itemDataType;
        this.dataTypeName = dataTypeName;
    }
}

export const itemTypes = [
    new ItemType('Brushed Teeth', ItemDataTypes.EVENT_HAPPENED),
    new ItemType('Celery Juice', ItemDataTypes.EVENT_HAPPENED),
    new ItemType('Dead Lift', ItemDataTypes.NUMBER, "Weight"),
    new ItemType('Squats', ItemDataTypes.NUMBER, "Weight"),
]