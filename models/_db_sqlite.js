
	var config  = require(__base+'config/config');
	var sqlite3 = require('sqlite3').verbose();
	var db = new sqlite3.Database(__base+'data/phoblo.db');

	module.exports = {

		dbp : config.dbp,

		/**
      Execute query and return result
      @q is an SQL query statement
			@params is the parameters to pass
    */
    dbGet : function(q, next){
			var query = db.prepare(q);
			query.all([], function(err, rows){
				if(err){ return next(err, null); }
				rows = (rows.length > 0 ? rows : []);
				return next(null, rows);
			});
    },

		/**
      Execute query and return a single row
      @q is an SQL query statement
			@params is the parameters to pass
    */
    dbGetSingle : function(q, next){
      this.dbGet(q, function(err, rows){
        return next(err, rows[0]);
      });
    }

	};
