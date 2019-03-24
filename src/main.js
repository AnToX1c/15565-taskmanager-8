import getTask from './get-task.js';
import getFilter from './get-filter.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';
import Filter from './filter.js';

const NUMBER_OF_CARDS = 7;
const NUMBER_OF_FILTERS = 4;
const mainFilterContainer = document.querySelector(`.main__filter`);
const boardTasksContainer = document.querySelector(`.board__tasks`);

const getFilters = () => {
  const filters = [];
  for (let i = 0; i < NUMBER_OF_FILTERS; i++) {
    filters.push(getFilter(i));
  }
  return filters;
};

const filters = getFilters();

const renderFilters = () => {
  for (const filter of filters) {
    const filterComponent = new Filter(filter);

    filterComponent.onFilter = (evt) => {
      const filterName = evt.target.id;
      const filteredTasks = filterTasks(initialTasks, filterName);
      fillTheBoard(filteredTasks);
    };

    mainFilterContainer.appendChild(filterComponent.render());
  }
};

const getInitialTasks = () => {
  const allTasks = [];
  for (let i = 0; i < NUMBER_OF_CARDS; i++) {
    allTasks.push(getTask());
  }
  return allTasks;
};

const initialTasks = getInitialTasks();

const fillTheBoard = (tasks) => {
  boardTasksContainer.innerHTML = ``;
  for (const task of tasks) {
    const taskComponent = new Task(task);
    const editTaskComponent = new TaskEdit(task);

    taskComponent.onEdit = () => {
      editTaskComponent.render();
      boardTasksContainer.replaceChild(editTaskComponent.element, taskComponent.element);
      taskComponent.unrender();
    };

    editTaskComponent.onSubmit = (newObject) => {
      const updatedTask = updateTask(tasks, task, newObject);

      taskComponent.update(updatedTask);
      taskComponent.render();
      boardTasksContainer.replaceChild(taskComponent.element, editTaskComponent.element);
      editTaskComponent.unrender();
    };

    editTaskComponent.onDelete = () => {
      deleteTask(tasks, task);
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

const filterTasks = (tasks, filterName) => {
  switch (filterName) {
    case `filter__all`:
      return tasks;

    case `filter__overdue`:
      return tasks.filter((it) => it.dueDate < Date.now());

    case `filter__today`:
      return tasks.filter(() => true);

    case `filter__repeating`:
      return tasks.filter((it) => [...Object.entries(it.repeatingDays)]
          .some((rec) => rec[1]));
  }
  return tasks;
};

renderFilters();
fillTheBoard(initialTasks);
