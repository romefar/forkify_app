import uniqid from 'uniqid';

export default class List { 
    constructor() { 
        this.items = [];
    }

    addNewItem(count, unit, ingredient) { 
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        };

        this.items.push(item);
        return item;
    }

    deleteItem(id) { 
        const index = this.items.findIndex(item => item.id === id);
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        const newUnit = this.items.find(item => item.id === id).count;
        newUnit.count = newCount;
    }
}