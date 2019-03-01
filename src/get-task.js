const taskColors = new Set([`black`, `yellow`, `blue`, `green`, `pink`]);
const taskTags = new Set([`homework`, `theory`, `practice`, `intensive`, `keks`]);
const getRandomBoolean = () => Math.random() >= 0.5;
const getTask = () => ({
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: [...taskTags.keys()].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3)),
  picture: `//picsum.photos/100/100?r=${Math.random()}`,
  color: [...taskColors.keys()][Math.floor(Math.random() * taskColors.size)],
  repeatingDays: {
    'mo': getRandomBoolean(),
    'tu': getRandomBoolean(),
    'we': getRandomBoolean(),
    'th': getRandomBoolean(),
    'fr': getRandomBoolean(),
    'sa': getRandomBoolean(),
    'su': getRandomBoolean(),
  },
  isFavorite: getRandomBoolean(),
  isDone: getRandomBoolean(),
});

export default getTask;
