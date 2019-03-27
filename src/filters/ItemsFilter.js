
export class ItemsFilter {
    setName(name) {
        this.name = name;
    }
    
    setTypeName(typeName) {
        this.typeName = typeName;
    }

    setDate(date) {
        this.date = date;
    }

    setDateStart(date) {
        this.dateStart = date;
    }
    
    setDateEnd(date) {
        this.dateEnd = date;
    }

    filter(items) {
        let retItems = items;
        if(this.name) {
            retItems = retItems.filter(item=> {
                return true;
                // return Object.keys()
                // getItemTypeName(items, item.typeId).contains(this.name)}
            });
            return retItems;
        }
        if(this.date) {
            retItems = retItems.filter(item=> item.date === this.date);
        }
        return retItems;
    }    
}