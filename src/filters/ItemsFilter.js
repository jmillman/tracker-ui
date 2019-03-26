export class ItemsFilter {
    setName(name) {
        this.name = name;
    }
    
    setDate(date) {
        this.date = date;
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
        if(this.date) {
            return items.filter(item=> item.date === this.date);
        }
        return items;
    }    
}