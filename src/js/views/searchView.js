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
    DOMelements.resultsPages.innerHTML = "";
}

// method to highlight current element
export const highlight = id => { 
    const highlightLinks = Array.from(document.querySelectorAll(".results__link"));
    highlightLinks.forEach(item => item.classList.remove("results__link--active"));
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
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
};

// method to create page buttons
const createButton = (page, type) => `
                <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1 }>
                <span>Page ${type === 'prev' ? page - 1 : page + 1 }</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                    </svg>                 
                </button>
`;


// method to render page buttons
const renderButtons = (page, numResults, resultsPerPage) => { 
    const pages = Math.ceil(numResults / resultsPerPage);
    let button;

    if(page === 1 && pages > 1) { 
        button = createButton(page, 'next');
    } else if(page < pages) { 
        button = `${createButton(page, 'prev')}${createButton(page, 'next')}`;

    } else if(page === pages && pages > 1) { 
        button = createButton(page, 'prev');
    }

    DOMelements.resultsPages.insertAdjacentHTML('afterbegin', button);
};

// method to display all results
export const renderResults = (recipes, page = 1, resPerPage = 10 ) => {
    // Example: page - 1 : 
    // start index: (1 - 1) * 10 = 0
    // end index: 1 * 10 = 10
    const startIndex = (page - 1) * resPerPage;
    const endIndex = page * resPerPage;
    recipes.slice(startIndex, endIndex).forEach(elem => renderRecipe(elem));
    renderButtons(page, recipes.length, resPerPage);
}