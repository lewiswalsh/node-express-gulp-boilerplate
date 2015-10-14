
  var config  = require(__base+'config/config');
  var mysql   = require('mysql');


  var pool = mysql.createPool({
    connectionLimit : 15,
    host            : '127.0.0.1',
    user            : 'user',
    password        : 'password',
    database        : 'database'
  });


  module.exports = {

    dbp : config.dbp,

    /**
      Escape a string for use in SQL statement
      @val is a string
      @return is the escaped string
    */
    escapeString : function(val){
      String(val).replace(/[\0\n\r\b\t\\\'\"\x1a]/g, function(s){
        switch(s){
          case "\0"   : return "\\0";
          case "\n"   : return "\\n";
          case "\r"   : return "\\r";
          case "\b"   : return "\\b";
          case "\t"   : return "\\t";
          case "\x1a" : return "\\Z";
          default     : return "\\"+ s;
        }
      });
      return val;
    },


    /**
      Execute query and return result
      @q is an SQL query statement
    */
    dbGet : function(q, next){
       pool.getConnection(function(err, conn){
          if(err){ return next(err, false); }
          conn.query(q, function(err, rows){
            if(err){ return next(err, false); }
            conn.release(); // ALWAYS release the connection when finished with it
            if(rows.length > 0){
              return next(false, rows);
            } else {
              return next(new Error('zero_rows_returned'), false);
            }
          });
       });
    },


    /**
      Execute query and return a single row
      @q is an SQL query statement
    */
    dbGetSingle : function(q, next){
      this.dbGet(q, function(err, rows){
        return next(err, rows[0]);
      });
    },


    /**
      Execute query and return a single field
      @q is an SQL query statement
      @field is a string identifying the field to be returned
    */
    dbGetSingleField : function(q, field, next){
      this.dbGet(q, function(err, rows){
        return next(err, rows[0][field]);
      });
    },


    /**
      Insert data in to table
      @payload is an object:
        {
         'table'  : 'mytable',
         'qdata' : [object]
        }
    */
    dbInsert : function(payload, next){
      pool.getConnection(function(err, conn){
        if(err){ return next(err, false); }
        conn.query("INSERT INTO "+ this.dbp + payload.table +" SET ?", payload.qdata, function(err, result){
            if(err){ return next(err, false); }
            conn.release(); // ALWAYS release the connection when finished with it
            return next(false, result.insertId);
        });
      });
    },


    /**
      Update row in table
      @payload is an object:
      {
       'table' : 'mytable',
       'field'   : 'id',
       'val'   : '22',
       'qdata' : [object]
      }
    */
    dbUpdate : function(payload, next){
      var q = "UPDATE "+ this.dbp + payload.table +" SET ? WHERE "+ payload.field;
      q += (isNaN(payload.val) ? " LIKE '"+ payload.val +"'" : " = "+ payload.val) +";";
      pool.getConnection(function(err, conn){
        if(err){ return next(err, false); }
        conn.query(q, payload.qdata, function(err, result){
          if(err){ return next(err, false); }
          conn.release(); // ALWAYS release the connection when finished with it
          return next(false, result.changedRows);
        })
      });
    },


    /**
      Delete from table
      @payload is an object:
      {
       'table' : 'mytable',
       'field'   : 'id',
       'val'   : '22',
       'qdata' : [object]
      }
    */
    dbDelete : function(payload, next){
      var q = "DELETE FROM "+ this.dbp + payload.table +" WHERE "+ payload.field;
      q += (isNaN(payload.val) ? " LIKE '"+ payload.val +"'" : " = "+ payload.val) +";";
      pool.getConnection(function(err, conn){
        if(err){ return next(err, false); }
        conn.query(q, function(err, result){
          if(err){ return next(err, false); }
          conn.release(); // ALWAYS release the connection when finished with it
          return next(false, result.affectedRows);
        });
      });
    }


  };
