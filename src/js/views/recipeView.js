import { DOMelements } from './base';
import { Fraction } from 'fractional';

const formatCount = count => {
    if(count) { 
        const newCount = Math.round(count * 10000) / 10000;
        const [int, dec] = newCount.toString().split(".").map(item => parseInt(item));
        
        if(!dec) return newCount;

        if(int === 0 ) { 
            const frac = new Fraction(newCount);
            // console.log(`TEST: ${frac.numerator}/${frac.denominator}`);
            return `${frac.numerator}/${frac.denominator}`;
        } else { 
            const frac = new Fraction(newCount - int);
            // console.log(`TEST: ${int} ${frac.numerator}/${frac.denominator}`);
            return `${int} ${frac.numerator}/${frac.denominator}`;
        }
    }

    return "-";
}

const createIngredient = ingredientElement => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredientElement.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredientElement.unit}</span>
            ${ingredientElement.ingredient}
        </div>
    </li>
`;


// method to clear results
export const clearResults = () => { 
    DOMelements.recipeContainer.innerHTML = "";
}

// method to displat info about recipe
export const renderRecipe = (recipe, isLiked) => { 
    const markup = `   
        <figure class="recipe__fig">
            <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>
        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                <span class="recipe__info-text"> minutes</span>
            </div>
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>

            </div>
            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
              ${recipe.ingredients.map(item => createIngredient(item)).join('')}
            </ul>

            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>
        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>
            </a>
        </div>
    `;

    DOMelements.recipeContainer.insertAdjacentHTML('afterbegin', markup);
}

// method to update an ingredients UI 
export const updateServingsIngredients = recipe => { 
    
    // update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    // update ingredients
    const countElements = Array.from(document.querySelectorAll(".recipe__count"));
    countElements.forEach((item, i) => { 
        item.textContent = formatCount(recipe.ingredients[i].count);
    })  
};