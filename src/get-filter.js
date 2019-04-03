const filterNames = [`All`, `Overdue`, `Today`, `Repeating`];
const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const getFilter = (i) => ({
  name: filterNames[i],
  amount: getRandomInteger(0, 120),
  isDisabled: false,
  isChecked: false,
});

export default getFilter;
