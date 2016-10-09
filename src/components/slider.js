'use strict'
import ejs from '../../node_modules/ejs/ejs';
import sliderTemplate from '../templates/slider.html';
import slider from '../styles/slider.scss';
import IdGenerator from '../tools/IdGenerator.js';

const $ = uploadcare.jQuery;
const POINTER_ID = "pointer_" + IdGenerator.Generate();
let that;

export default class Slider {
  constructor(container, maxValue = 100) {
    this.container = container;
    this.onChangeHandler = null;
    this.maxValue = maxValue;
    that = this;

  }

  render(parentEl = this.container, value = 0) {
    this.container = parentEl;
    let markupStr = ejs.render(sliderTemplate, {
      pointerId: POINTER_ID 
    });
    parentEl.html(markupStr);
    this.setupHandlers(parentEl);

    this.currentPos = Math.round(100 / this.maxValue * value);

    this.$pointer.css("left", "calc(" + this.currentPos + "% - 8px)");
  }

  setupHandlers(parentEl) {
    this.$pointer = 
    $(parentEl).find("#" + POINTER_ID);

    this.$pointer.on("mousedown", ev => { 
      return this.pointerMouseDown(ev);
    });   
  }

  pointerMouseDown(ev) {

    this.multiplyer = 100 / ( this.$pointer.parent().width() );
    this.leftOffset = this.$pointer.parent().offset().left;
    ev.preventDefault();
    ev.stopPropagation();
    ev.bubbles = false;

    $("body").mousemove(ev => {
      return that.bodyMouseMove(ev); 
    });

    $("body").mouseup(ev => { 
      return that.bodyMouseUp(ev)
    });
  }

  bodyMouseMove(ev) {
    let pointerPos = ((ev.pageX - this.leftOffset) * this.multiplyer);
    pointerPos = Math.max(0, pointerPos);
    pointerPos = Math.min(100, pointerPos);
    pointerPos = Math.round(pointerPos);

    this.$pointer.css("left", "calc(" + pointerPos + "% - 8px)");
    
    if(this.onChangeHandler && this.currentPos != pointerPos) {
      this.onChangeHandler(Math.round(this.maxValue / 100 * pointerPos));
    }
    this.currentPos = pointerPos;
  }

  bodyMouseUp(ev) {
    $("body").off();
  }

  onChange( handler ) {
    this.onChangeHandler = handler;
  }
}