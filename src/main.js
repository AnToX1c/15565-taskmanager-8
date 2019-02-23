import renderFilterElement from './render-filter-element.js';
import renderCardElement from './render-card-element.js';

const mainFilterElement = document.querySelector(`.main__filter`);
const boardTasksElement = document.querySelector(`.board__tasks`);
const numberOfCards = 7;
const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const fillTheCards = (amount) => {
  for (let i = 0; i < amount; i++) {
    boardTasksElement.insertAdjacentHTML(`beforeend`, renderCardElement());
  }
};

const clearBoardTasks = () => {
  boardTasksElement.innerHTML = ``;
  fillTheCards(randomInteger(1, 10));
};

let filterElements;

mainFilterElement.insertAdjacentHTML(`beforeend`, renderFilterElement(`All`, randomInteger(0, 120), false, true));
mainFilterElement.insertAdjacentHTML(`beforeend`, renderFilterElement(`Overdue`, randomInteger(0, 120), true));
mainFilterElement.insertAdjacentHTML(`beforeend`, renderFilterElement(`Today`, randomInteger(0, 120), true));
mainFilterElement.insertAdjacentHTML(`beforeend`, renderFilterElement(`Favorites`, randomInteger(0, 120)));
mainFilterElement.insertAdjacentHTML(`beforeend`, renderFilterElement(`Repeating`, randomInteger(0, 120)));
mainFilterElement.insertAdjacentHTML(`beforeend`, renderFilterElement(`Tags`, randomInteger(0, 120)));
mainFilterElement.insertAdjacentHTML(`beforeend`, renderFilterElement(`Archive`, randomInteger(0, 120)));

filterElements = mainFilterElement.querySelectorAll(`.filter__label`);
for (let i = 0; i < filterElements.length; i++) {
  filterElements[i].onclick = function (evt) {
    evt.preventDefault();
    clearBoardTasks();
  };
}

fillTheCards(numberOfCards);
