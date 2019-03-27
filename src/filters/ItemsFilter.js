
export class ItemsFilter {

    setItemTypeIds(arrayOfItemTypeIds) {
        this.itemTypeIds = arrayOfItemTypeIds;
    }
    setName(name) {
        this.name = name;
    }
    
    setDateStart(date) {
        this.dateStart = date;
    }
    
    setDateEnd(date) {
        this.dateEnd = date;
    }

    filter(items) {
        let retItems = items;
        if(this.itemTypeIds  && this.itemTypeIds.length) {
            retItems = retItems.filter(item=> this.itemTypeIds.includes(item.typeId));
        }

        if(this.dateStart && this.dateEnd) {
            retItems = retItems.filter(item=> item.date >= this.dateStart && item.date <= this.dateEnd);
        }
        else if(this.dateStart) {
            retItems = retItems.filter(item=> item.date >= this.dateStart);
        }

        return retItems;
    }    
}