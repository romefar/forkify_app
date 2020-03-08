import axios from 'axios';

export default class Search { 
    constructor(query) { 
        this.query = query;
    }

    // method to get data from f2f API
    async getDataFromAPI() {
        // error handling
       try {
        const result = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
        this.recipes = result.data.recipes;
       // console.log(this.recipes);
       } catch (error) {
           console.log(error);
       }
    }
}