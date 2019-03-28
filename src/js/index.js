import Search from './models/Search'
import Recipe from "./models/Recipe"
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { DOMelements, renderLoader, clearLoader} from './views/base';
// Global state (data) of our app
// - Search object
// - Current recipe object
// - shopping list object
// - Liked recipes 
const state = {};


/*
    SEARCH CONTROLLER
*/

const controlSearch = async () => { 
    // 1. Get query from view
    const query = searchView.getInputData();

    if(query) { 
        // 2. New search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for result
        searchView.clearInputField();
        searchView.clearResults();
        renderLoader(DOMelements.searchResults);
      
        try {
            // 4. Search for recipes
            await state.search.getDataFromAPI();
             
            // 5. Render results on UI
            clearLoader();
            searchView.renderResults(state.search.recipes);
            console.log(state.search.recipes);
        } catch (error) {
            console.log(`Error. Something went wrong. Message: ${error}`);
            clearLoader();
        }       
    }
}

DOMelements.searchForm.addEventListener('submit', e => { 
    e.preventDefault();
    controlSearch();
});

DOMelements.resultsPages.addEventListener('click', (e) => { 
    const button = e.target.closest('.btn-inline');
    if(button) { 
        const gotoPageData = parseInt(button.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.recipes, gotoPageData);
    }
});


/*
    RECIPE CONTROLLER
*/

const controlRecipe = async () => { 
    // 1. Get id(hash) from the URL
    const id = window.location.hash.slice(1);

    // if id exist 
    if(id) { 

        renderLoader(DOMelements.recipeContainer);
        // 2. Create new Recipe object and add to state
        state.recipe = new Recipe(id);

        if(state.search)  searchView.highlight(id);

        // 4. Get recipe data
        try {
            recipeView.clearResults();
            // 3. Prepare UI for result           

            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            // parse the ingredients
            state.recipe.parseIngredients();
             // 5. Calc servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
 
            // 6. Render results on UI
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            console.log(`Error. Something went wrong. Message: ${error}`);
        }        

        console.log(state.recipe);
    }
}

// hashchange event fired every time, when the URL's hash has changed
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);

DOMelements.recipeContainer.addEventListener('click', e => { 
    if(e.target.matches('.btn-decrease, .btn-decrease *')) { 
        if(state.recipe.servings > 1) { 
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }       
    } else if(e.target.matches('.btn-increase, .btn-increase *')) { 
        if(state.recipe.servings <= 15) { 
            state.recipe.updateServings('inc');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }
    console.log(state.recipe);
});