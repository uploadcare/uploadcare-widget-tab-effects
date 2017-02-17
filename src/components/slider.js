'use strict'

import sliderTemplate from '../templates/slider.html';
import IdGenerator from '../tools/IdGenerator.js';

const $ = uploadcare.jQuery;

export default class Slider {
  constructor(container, maxValue = 100) {
    this.container = container;
    this.onChangeHandler = null;
    this.maxValue = maxValue;
    this.RANGE_ID = "range_" + IdGenerator.Generate();

  }

  render(parentEl = this.container, value = 0) {
    this.container = parentEl;
    let markupStr = sliderTemplate({
      pointerId: this.RANGE_ID,
      min: 0,
      max: this.maxValue,
      value: value
    });
    parentEl.html(markupStr);
    this.setupHandlers(parentEl);
  }

  setupHandlers(parentEl) {
    this.$range =
    $(parentEl).find("." + this.RANGE_ID);

    this.$range.on("change", ev => {
      return this.change(ev);
    });
  }

  change(ev) {
    if(this.onChangeHandler) {
      this.onChangeHandler(ev.currentTarget.value);
    }
  }

  onChange( handler ) {
    this.onChangeHandler = handler;
  }
}
