import createElement from './create-element.js';
import Component from './component.js';
import moment from 'moment';
import flatpickr from 'flatpickr';
import getChart from './get-chart.js';

class Statistic extends Component {
  constructor(data) {
    super();
    this._tasks = data;
    this._startOfWeek = moment().startOf(`isoWeek`).format(`DD MMM`);
    this._endOfWeek = moment().endOf(`isoWeek`).format(`DD MMM`);
    this._colorChartData = null;
    this._tagsChartData = null;
  }

  _countColorsInArray(array) {
    const arrayOfColors = array.map((el) => el.color);
    const sumOfColors = arrayOfColors.reduce(function (acc, curr) {
      if (typeof acc[curr] === `undefined`) {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }
      return acc;
    }, []);
    return sumOfColors;
  }

  _countHashtagsInArray(array) {
    const arrayOfHashtags = array.map((el) => el.tags).join().split(`,`);
    const sumOfHashtags = arrayOfHashtags.reduce(function (acc, curr) {
      if (curr !== ``) {
        if (typeof acc[curr] === `undefined`) {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
      }
      return acc;
    }, []);
    return sumOfHashtags;
  }

  _getChart(tasks = this._tasks) {
    const tagsCtx = this._element.querySelector(`.statistic__tags`).getContext(`2d`);
    const colorsCtx = this._element.querySelector(`.statistic__colors`).getContext(`2d`);
    const chartData = {
      colors: this._countColorsInArray(tasks),
      tags: this._countHashtagsInArray(tasks)
    };
    this._colorChartData = getChart(colorsCtx, `colors`, chartData);
    this._tagsChartData = getChart(tagsCtx, `tags`, chartData);
  }

  _updateTasks(selectedDates) {
    const firstDate = moment(selectedDates[0].valueOf());
    const secondDate = moment(selectedDates[1].valueOf());
    const tasksToUpdate = this._tasks.filter((task) => {
      return task.dueDate > firstDate && task.dueDate < secondDate;
    });
    this._colorChartData.destroy();
    this._tagsChartData.destroy();
    this._getChart(tasksToUpdate);
  }

  get template() {
    return `<div>
    <div class="statistic__line">
          <div class="statistic__period">
            <h2 class="statistic__period-title">Task Activity DIAGRAM</h2>

            <div class="statistic-input-wrap">
              <input
                class="statistic__period-input"
                type="text"
                placeholder="01 Feb - 08 Feb"
              />
            </div>

            <p class="statistic__period-result">
              In total for the specified period
              <span class="statistic__task-found">0</span> tasks were fulfilled.
            </p>
          </div>
          <div class="statistic__line-graphic visually-hidden">
            <canvas class="statistic__days" width="550" height="150"></canvas>
          </div>
        </div>
        <div class="statistic__circle">
          <div class="statistic__tags-wrap">
            <canvas class="statistic__tags" width="400" height="300"></canvas>
          </div>
          <div class="statistic__colors-wrap">
            <canvas class="statistic__colors" width="400" height="300"></canvas>
          </div>
        </div>
        </div>`;
  }

  render() {
    this._element = createElement(this.template);
    this.bind();
    this._getChart();
    this._element.querySelector(`.statistic__tags-wrap`).style.width = `400px`;
    this._element.querySelector(`.statistic__tags-wrap`).style.height = `300px`;
    this._element.querySelector(`.statistic__colors-wrap`).style.width = `400px`;
    this._element.querySelector(`.statistic__colors-wrap`).style.height = `300px`;
    return this._element;
  }

  bind() {
    flatpickr(this._element.querySelector(`.statistic__period-input`), {
      mode: `range`,
      enableTime: true,
      altInput: true,
      altFormat: `j M`,
      dateFormat: `j M`,
      defaultDate: [this._startOfWeek, this._endOfWeek],
      onClose: this._updateTasks.bind(this)
    });
  }
}

export default Statistic;
