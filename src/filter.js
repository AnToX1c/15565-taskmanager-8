import Component from './component.js';

class Filter extends Component {
  constructor(data) {
    super();
    this._name = data.name;
    this._amount = data.amount;
    this._isDisabled = data.isDisabled;
    this._isChecked = data.isChecked;

    this._onFilter = null;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  _onFilterClick(evt) {
    return typeof this._onFilter === `function` && this._onFilter(evt);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  get template() {
    return `<div>
    <input
          type="radio"
          id="filter__${this._name.toLowerCase()}"
          class="filter__input visually-hidden"
          name="filter"
          ${this._isChecked ? ` checked` : ``}
          ${this._isDisabled ? ` disabled` : ``}/>
        <label for="filter__${this._name.toLowerCase()}" class="filter__label">${this._name.toUpperCase()}
        <span class="filter__${this._name.toLowerCase()}-count">${this._amount}</span></label>
        </div>`;
  }

  bind() {
    this._element.addEventListener(`change`, this._onFilterClick);
  }

  unbind() {
    this._element.removeEventListener(`change`, this._onFilterClick);
  }
}

export default Filter;
