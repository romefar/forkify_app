import Search from './models/Search'
import * as searchView from './views/searchView';
import { DOMelements, renderLoader, clearLoader} from './views/base'
// Global state (data) of our app
// - Search object
// - Current recipe object
// - shopping list object
// - Liked recipes 
const state = {};

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

        // 4. Search for recipes
        await state.search.getDataFromAPI();

        // 5. Render results on UI
        clearLoader();
        searchView.renderResults(state.search.recipes);

        console.log(state.search.recipes);
    }
}

DOMelements.searchForm.addEventListener('submit', e => { 
    e.preventDefault();
    controlSearch();
});

// const search = new Search('pizza').getDataFromAPI();
// console.log(search);