/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  return {
    width,
    height,
    getArea() {
      return this.width * this.height;
    },
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  Object.setPrototypeOf(obj, proto);
  // obj.__proto__  = proto;
  return obj;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  el: '',
  elId: '',
  elClass: '',
  elAttr: '',
  elPseudoClass: '',
  elPseudoElement: '',
  elCombine: '',

  element(value) {
    if (this.el !== '') {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (this.elId !== '' || this.elClass !== '' || this.elAttr !== '' || this.elPseudoClass !== '' || this.elPseudoElement !== '') {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this.el = value;
    const select = { ...this };
    this.cleanObj();
    return select;
  },

  id(value) {
    if (this.elId !== '') {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    if (this.elClass !== '' || this.elAttr !== '' || this.elPseudoClass !== '' || this.elPseudoElement !== '') {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this.elId = `#${value}`;
    const select = { ...this };
    this.cleanObj();
    return select;
  },

  class(value) {
    if (this.elAttr !== '' || this.elPseudoClass !== '' || this.elPseudoElement !== '') {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this.elClass += `.${value}`;
    const select = { ...this };
    this.cleanObj();
    return select;
  },

  attr(value) {
    if (this.elPseudoClass !== '' || this.elPseudoElement !== '') {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this.elAttr = `[${value}]`;
    const select = { ...this };
    this.cleanObj();
    return select;
  },

  pseudoClass(value) {
    if (this.elPseudoElement !== '') {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this.elPseudoClass += `:${value}`;
    const select = { ...this };
    this.cleanObj();
    return select;
  },

  pseudoElement(value) {
    if (this.elPseudoElement !== '') {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    this.elPseudoElement = `::${value}`;
    const select = { ...this };
    this.cleanObj();
    return select;
  },

  combine(selector1, combinator, selector2) {
    const select1 = selector1.combineSelect();
    const select2 = selector2.combineSelect();
    this.elCombine += `${select1} ${combinator} ${select2}`;
    const select = { ...this };
    this.elCombine = '';
    return select;
  },

  cleanObj() {
    this.el = '';
    this.elId = '';
    this.elClass = '';
    this.elAttr = '';
    this.elPseudoClass = '';
    this.elPseudoElement = '';
  },

  combineSelect() {
    const selector = `${this.el}${this.elId}${this.elClass}${this.elAttr}${this.elPseudoClass}${this.elPseudoElement}${this.elCombine}`;
    this.cleanObj();
    this.elCombine = '';
    return selector;
  },

  stringify() {
    const selector = this.elCombine === '' ? `${this.el}${this.elId}${this.elClass}${this.elAttr}${this.elPseudoClass}${this.elPseudoElement}` : `${this.elCombine}`;
    this.cleanObj();
    this.elCombine = '';
    return selector;
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
