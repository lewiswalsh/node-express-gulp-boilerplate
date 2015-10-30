
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
    },

    isValidEmail: function(email){
      return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(email);
    }

  };
