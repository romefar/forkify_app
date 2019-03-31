import { DOMelements } from './base';

// method to display items
export const renderItem = item => { 
    const markup =  `
        <li class="shopping__item" data-itemId=${item.id}>
            <div class="shopping__count">
                <input class="shopping__count-value" min="0" type="number" value="${item.count}" step="${item.count}">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    DOMelements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

// method to delete item from shopping list
export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    item.parentElement.removeChild(item);
};