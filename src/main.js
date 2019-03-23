import renderFilterElement from './render-filter-element.js';
import getTask from './get-task.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';

const NUMBER_OF_CARDS = 7;
const mainFilterContainer = document.querySelector(`.main__filter`);
const boardTasksContainer = document.querySelector(`.board__tasks`);
const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getAllTasks = (amount) => {
  const allTasks = [];
  for (let i = 0; i < amount; i++) {
    allTasks.push(getTask());
  }
  return allTasks;
};

const fillTheBoard = (amount) => {
  const allTasks = getAllTasks(amount);
  for (const task of allTasks) {
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      boardTasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = (newObject) => {
      const updatedTask = updateTask(allTasks, task, newObject);

      taskComponent.update(updatedTask);
      taskComponent.render();
      boardTasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    editTaskComponent.onDelete = () => {
      deleteTask(allTasks, task);
      boardTasksContainer.removeChild(editTaskComponent.element);
      editTaskComponent.unrender();
    };

    boardTasksContainer.appendChild(taskComponent.render());
  }
};

const updateTask = (tasks, taskToUpdate, newTask) => {
  const index = tasks.findIndex((it) => it === taskToUpdate);
  tasks[index] = Object.assign({}, taskToUpdate, newTask);
  return tasks[index];
};

const deleteTask = (tasks, taskToDelete) => {
  const index = tasks.findIndex((it) => it === taskToDelete);
  tasks[index] = null;
  return tasks;
};

const clearBoardTasks = () => {
  boardTasksContainer.innerHTML = ``;
  fillTheBoard(randomInteger(1, 10));
};

let filterElements;

mainFilterContainer.insertAdjacentHTML(`beforeend`, renderFilterElement(`All`, randomInteger(0, 120), false, true));
mainFilterContainer.insertAdjacentHTML(`beforeend`, renderFilterElement(`Overdue`, randomInteger(0, 120), true));
mainFilterContainer.insertAdjacentHTML(`beforeend`, renderFilterElement(`Today`, randomInteger(0, 120), true));
mainFilterContainer.insertAdjacentHTML(`beforeend`, renderFilterElement(`Favorites`, randomInteger(0, 120)));
mainFilterContainer.insertAdjacentHTML(`beforeend`, renderFilterElement(`Repeating`, randomInteger(0, 120)));
mainFilterContainer.insertAdjacentHTML(`beforeend`, renderFilterElement(`Tags`, randomInteger(0, 120)));
mainFilterContainer.insertAdjacentHTML(`beforeend`, renderFilterElement(`Archive`, randomInteger(0, 120)));

filterElements = mainFilterContainer.querySelectorAll(`.filter__label`);
for (let i = 0; i < filterElements.length; i++) {
  filterElements[i].onclick = function (evt) {
    evt.preventDefault();
    clearBoardTasks();
  };
}

fillTheBoard(NUMBER_OF_CARDS);
