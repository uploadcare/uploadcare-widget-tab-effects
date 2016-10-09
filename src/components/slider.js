'use strict'
import ejs from '../../node_modules/ejs/ejs';
import sliderTemplate from '../templates/slider.html';
import slider from '../styles/slider.scss';
import IdGenerator from '../tools/IdGenerator.js';

const $ = uploadcare.jQuery;
const POINTER_ID = "pointer_" + IdGenerator.Generate();
let that;

export default class Slider {
  constructor(container) {
    this.container = container;
    that = this;
  }

  render(parentEl = this.container) {
    this.container = parentEl;
    let markupStr = ejs.render(sliderTemplate, {
      pointerId: POINTER_ID 
    });
    parentEl.html(markupStr);
    this.setupHandlers(parentEl);
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

    console.log({
      pageX: ev.pageX,
      pageY: ev.pageY,
      leftPos: pointerPos,
      mult: this.multiplyer
    });

    this.$pointer.css("left", "calc(" + pointerPos + "% - 8px)");
  }

  bodyMouseUp(ev) {
    console.log(ev);
    $("body").off();
  }
}