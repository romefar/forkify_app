import { DOMelements } from './base'

// method to input value from searck form
export const getInputData = () => DOMelements.searchInput.value;

// method to clear form input field
export const clearInputField = () => {
     DOMelements.searchInput.value = "";
}

// method to clear results
export const clearResults = () => { 
    DOMelements.searchResultList.innerHTML = "";
}

// method to cut recipe title
const limitTitle = (title, bound = 17) => { 
    console.log(title);
    const res = [];
    if(title.length > bound) { 
        title.slice(0).split(' ').reduce((accum, item, i, arr) => { 
            if(accum + item.length <= bound) {
                res.push(item);
                return accum + item.length;
            };
            // tip to exit from reduce method
            arr.splice(1);          
        }, 0);
        console.log(title);
        // return new title
        return `${res.join(' ')} ...`;
    }
    return title;
};

// method to display single recipe
const renderRecipe = (recipe) => { 
    const recipeMarkup = `
                <li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="Test">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;
    DOMelements.searchResultList.insertAdjacentHTML('beforeend', recipeMarkup);
} 

// method to display all results
export const renderResults = recipes => {
    recipes.forEach(elem => renderRecipe(elem));
}