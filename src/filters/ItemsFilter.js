
export class ItemsFilter {
    setName(name) {
        this.name = name;
    }
    
    setTypeName(name) {
        this.name = name;
    }

    getDate() {
        return this.date;
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
                // getItemTypeName(items, item.typeId).contains(this.name)}
            });
        }
        if(this.date) {
            retItems = retItems.filter(item=> item.date === this.date);
        }
        return items;
    }    
}