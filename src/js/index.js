import Search from './models/Search';
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { DOMelements, renderLoader, clearLoader} from './views/base';
// Global state (data) of our app
// - Search object
// - Current recipe object
// - shopping list object
// - Liked recipes 
const state = {};
window.state = state;
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

      
        // 2. Create new Recipe object and add to state
        state.recipe = new Recipe(id);

        if(state.search)  searchView.highlight(id);

        // 4. Get recipe data
        try {
            
            recipeView.clearResults();
            // 3. Prepare UI for result           

            renderLoader(DOMelements.recipeContainer);

            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);

            // parse the ingredients
            state.recipe.parseIngredients();
             // 5. Calc servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
 
            // 6. Render results on UI
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.likes.isLiked(id));

        } catch (error) {
            console.log(`Error. Something went wrong. Message: ${error}`);
        }        

       // console.log(state.recipe);
    }
}

/*
    SHOPPING LIST CONTROLLER
*/

const controlShoppingList = () => { 

    try {

        // create a new list if there is none yet
        if(!state.list) {
            state.list = new List();
        }

        // add ingredient and display ingredients
        state.recipe.ingredients.forEach(item => {
            const uiItem = state.list.addNewItem(item.count, item.unit, item.ingredient);
            // display
            listView.renderItem(uiItem);
        });

        console.log(state.list.items);

    } catch (error) {
        console.log(`Error. Something went wrong. Message: ${error}`);
    }        
};

/*
    LIKES LIST CONTROLLER
*/
// TESTT
state.likes = new Likes();
//likesView.toggleLikeBtn(state.likes.getNumberOfLikes());
const controlLikes = () => { 

    try {

        // create a new list if there is none yet
        if(!state.likes) {
            state.likes = new Likes();
        }

        // current id
        const currentId = state.recipe.id;
        
        // user has NOT yet liked recipe
        if(!state.likes.isLiked(currentId)) { 
        
            // add like to the state
            const newLike = state.list.addItem(currentId, state.recipe.title, state.recipe.author, state.recipe.img);
            
            // toogle the liek button
            likesView.toggleLikeBtn(true);

            // add like to UI list
            likesView.renderLike(newLike);
        // user has LIKED recipe
        } else {
            // remove like to the state
            const delLike = state.list.deleteItem(currentId);
            
            // toogle the liek button
            likesView.toggleLikeBtn(false);
            // remove like from UI list
            likesView.deleteLike(currentId);
        }

        likesView.toggleLikeBtn(state.likes.getNumberOfLikes());


    } catch (error) {
        console.log(`Error. Something went wrong. Message: ${error}`);
    }        
};

// delete shopping item handle 
DOMelements.shoppingList.addEventListener('click', e => { 
    const id = e.target.closest('.shopping__item').dataset.itemid;
    
    // if click was on delete button
    if(e.target.matches('.shopping__delete, .shopping__delete * ')) { 
        // delete from state
        state.list.deleteItem(id);

        // delete from view
        listView.deleteItem(id);

    } else if(e.target.matches('.shopping__count--value')) { 
        // update count
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
});

// hashchange event fired every time, when the URL's hash has changed
window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load', controlRecipe);

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
    } else if(e.target.matches('.recipe__btn--add, .recipe__btn--add *')) { 
        // add ingredient to shopping view
        controlShoppingList();
    } else if(e.target.matches('.recipe__love, .recipe__love *')) { 
        // check likes 
        controlLikes();

    }
    //console.log(state.recipe);
});


