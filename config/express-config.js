
  var exphbs      = require('express-handlebars');
  var bodyparser  = require('body-parser');
  var session 	  = require('express-session');
  var compression = require('compression')
  var helpers		  = require(__base +'models/_hbs_helpers');
  var config      = require(__base +'config/config');


  module.exports = function(express, app, passport){


    // Set some 'app' variables, accessible in templates
    // app_ prefix is good practice to prevent overloading
    app.locals.app_base  = config.base_local;
    app.locals.app_title = 'My application';
    app.locals.app_foo   = 'bar';

    app.use(compression()); // Compress stuff!

    // Access to POST, GET, PUT and DELETE vars
    //app.use(bodyparser());
    app.use( bodyparser.json() );   // to support JSON-encoded bodies
    app.use(bodyparser.urlencoded({ // to support URL-encoded bodies
      extended : true
    }));


    //* Sessions
    if(process.env.NODE_ENV == 'production'){
      // STRONGLY recommend using something like Redis for sessions in production
      var RedisStore = require('connect-redis')(session);
      app.use(session({
        store             : new RedisStore({ 'host' : '127.0.0.1', 'port' : '6379' }),
        secret            : 'what are your thoughts on that Scully',
        saveUninitialized : true,
        resave            : true
      }));
    } else {
      // Fine for local sessions
      var cuid = require('cuid');
      app.use(session({
        genid    : function(req){ return cuid(); }, // use UUIDs for session IDs
        secret   : 'a secure random string',
        cookie   : { maxAge: null },
        saveUninitialized : true,
           resave : true
      }));
    }
    //*/


    //* Simple request logger
    app.use(function(req, res, next){
      console.log('%s %s', req.method, req.url);
      next();
    });
    //*/

    // Template engine
    app.engine('.hbs', exphbs({
        defaultLayout : 'main',
        extname       : '.hbs',
        helpers       : helpers
      })
    );
    app.set('view engine', '.hbs');


    //* Static files
    app.use(express.static(__base +'/public'));
    //*/


  }
