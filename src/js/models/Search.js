import axios from 'axios';
import {key, proxy} from '../config'

export default class Search { 
    constructor(query) { 
        this.query = query;
    }

    // method to get data from f2f API
    async getDataFromAPI() {
        // error handling
       try {
        const result = await axios(`${proxy}https://www.food2fork.com/api/search/?key=${key}&q=${this.query}`);
        this.recipes = result.data.recipes;
       // console.log(this.recipes);
       } catch (error) {
           console.log(error);
       }
    }
}