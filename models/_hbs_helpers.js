
var config    = require(__base+'config/config');
var utilities	= require(__base+'models/_utilities');

module.exports = {

  equal: function(lvalue, rvalue, options) {
    if(arguments.length < 3)
      throw new Error("#equal needs 2 parameters");
    if(lvalue != rvalue) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  },


  notequal: function(lvalue, rvalue, options) {
    if(arguments.length < 3)
      throw new Error("#equal needs 2 parameters");
    if(lvalue == rvalue) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  },


  gt: function(lvalue, rvalue, options) {
    if(arguments.length < 3)
      throw new Error("#equal needs 2 parameters");
    if(lvalue > rvalue) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },


  lt: function(lvalue, rvalue, options) {
    if(arguments.length < 3)
      throw new Error("#equal needs 2 parameters");
    if(lvalue < rvalue) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },


  truncate: function(text){
    text = text.replace(/(<([^>]+)>)/ig,"").substring(0,140);
    return text + "&hellip;";
  },

  exists: function(variable, options){
    if(typeof variable !== 'undefined') {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  },


  notempty: function(text, options){
    if(utilities.notEmpty(text)){
       return options.fn(this);
    } else {
      return options.inverse(this);
    }
  }

};
