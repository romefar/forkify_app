// object with all DOM elements which we are using in our app
export const DOMelements = { 
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    searchResults: document.querySelector('.results'),
    resultsPages: document.querySelector('.results__pages'),
    recipeContainer: document.querySelector('.recipe')
}

export const elementStrings = { 
    loader: 'loader'
}

// method to show a loader icon
export const renderLoader = parent => { 
    const loader = `
        <div class=${elementStrings.loader}>
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;       
    parent.insertAdjacentHTML('afterbegin', loader);
}

// method to delete a loader icon
export const clearLoader = () => { 
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader) { 
        loader.parentElement.removeChild(loader);
    }
}