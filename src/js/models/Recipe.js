import axios from 'axios'
import {key, proxy} from '../config'
export default class { 
    constructor(id) { 
        this.id = id;
    }

    async getRecipe() { 
        try {
            const result = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = result.data.recipe.title;
            this.author = result.data.recipe.publisher;
            this.img = result.data.recipe.image_url;
            this.url = result.data.recipe.source_url;
            this.ingredients = result.data.recipe.ingredients;
            console.log()
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    // TODO: rework function
    calcTime() { 
        // 15 min for every 3 ingredirnt
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        //this.time = periods * 15;
        this.time = numIng * 5;
    }

    calcServings() { 
        this.servings = 4;
    }

    parseIngredients() { 

        const unitFullName = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitShortName = ['tbsp', 'tbsp', 'oz', 'oz','tsp', 'tsp', 'cup', 'pound'];


        const newIngredients = this.ingredients.map(item => { 
            // 1. Normalize units
            let ingredient = item.toLowerCase();
            unitFullName.forEach((item, i) => { 
                ingredient = ingredient.replace(item, unitShortName[i]);
            });

            // 2. Remove parantheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

            // 3. Parse ingredients into count, unit and name
            const arr = ingredient.split(' ');
            const unitIndex = arr.findIndex(item => unitShortName.includes(item))

            let obj;
            if(unitIndex > -1) {

                 // from start to unit
                const arrCount = arr.slice(0, unitIndex);
                
                let count;
                
                if(arrCount.length === 1) {
                    count = Math.ceil(eval(arr[0].replace('-', '+')));
                } else { 
                    // eval()?????????? 
                    count = Math.ceil(eval(arr.slice(0, unitIndex).join('+')));
                }
                
                obj = { 
                    count, 
                    unit: arr[unitIndex],
                    ingredient: arr.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(arr[0])) { 
                obj = { 
                    count : parseInt(arr[0]),
                    unit : '',
                    ingredient: arr.slice(1).join(' ')
                }
            } else if(unitIndex === -1) { 
                obj = { 
                    count : 1,
                    unit : '',
                    ingredient 
                }
            }
            return obj;
        });
        this.ingredients = newIngredients;
    }
}