
  module.exports = {

    months      : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortmonths : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

    notEmpty: function(text){
      if(text.replace(/\s/g, "").length > 0){
        return true;
      } else {
        return false;
      }
    },

    splitStringAtIndex: function(str, index){
      var split = [];
      split[0]  = str.substring(0, index);
      split[1]  = str.substring(index);
      return split;
    }

  };
