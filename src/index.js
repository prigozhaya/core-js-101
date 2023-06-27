const cssSelectorBuilder = {
  el: '', 
  elId: '', 
  elClass: '', 
  elAttr: '', 
  elPseudoClass: '', 
  elPseudoElement: '', 
  elCombine: '', 
  
  element(value) {
    this.el = value;
    const select = {...this};
    this.cleanObj(); 
    return select;
  },

  id(value) {
    this.elId = `#${value}`;
    const select = { ...this };
    this.cleanObj();
    return select;
  },

  class(value) {
    this.elClass += `.${value}`;
    const select = { ...this };
    this.cleanObj();
    return select;
  },

  attr(value) {
    this.elAttr = `[${value}]`;
    const select = { ...this };
    this.cleanObj();
    return select;
  },

  pseudoClass(value) {
    this.elPseudoClass += `:${value}`;
    const select = { ...this };
    this.cleanObj();
    return select;
  },

  pseudoElement(value) {
    this.elPseudoElement = `::${value}`;
    const select = { ...this };
    this.cleanObj();
    return select;
  },

  combine(selector1, combinator, selector2) {
    let select1 = selector1.combineSelect();
    let select2 = selector2.combineSelect();
    this.elCombine = `${select1}${combinator}${select2}`;
    return {...this};
  },
  
  cleanObj() {
    this.el = '';
    this.elId = '';
    this.elClass = '';
    this.elAttr = '';
    this.elPseudoClass = '';
    this.elPseudoElement = '';
  }, 
  
  combineSelect(){
    const selector = `${this.el}${this.elId}${this.elClass}${this.elAttr}${this.elPseudoClass}${this.elPseudoElement}`;
  this.cleanObj();
  this.elCombine = '';
    return selector;
  }, 
  
  stringify(){
    const selector = this.elCombine === '' ? `${this.el}${this.elId}${this.elClass}${this.elAttr}${this.elPseudoClass}${this.elPseudoElement}` : `${this.elCombine}`;
  this.cleanObj();
  this.elCombine = '';
    return selector;
  }
};

const builder = cssSelectorBuilder;


console.log(builder.combine(
  builder.element('ul').class('animable'),
  ' ',
  builder.element('li').pseudoClass('nth-of-type(1)'),
).stringify())
