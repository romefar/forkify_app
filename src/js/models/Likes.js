export default class Likes { 
    constructor() { 
        this.likes = [];
    }

    addItem(id, title, author, img) { 
        const like = { 
            id,
            title,
            author,
            img
        };

        this.likes.push(like);
        
        // add data to localStorage
        this.preserveData();
        return like;
    }

    deleteItem(id) { 
        const index = this.likes.findIndex(item => item.id === id);
        this.likes.splice(index, 1);

        // add data to localStorage
        this.preserveData();
    }

    isLiked(id) {
        return this.likes.findIndex(item => item.id === id) !== -1;
    }

    getNumberOfLikes() { 
        return this.likes.length;
    }

    // method to keep likes data in browser
    preserveData() { 
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    // method to retrieve data
    readDataFromStorage() { 
        const likesObj = JSON.parse(localStorage.getItem('likes'));
        if(likesObj) { 
            this.likes = likesObj;
        }
    }
}