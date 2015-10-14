
  global.__base = __dirname +'/'; // Set a global for use in requiring modules and files

  var fs         = require('fs');
  var express    = require('express');


  // Set up Express
  var app = express();
  require(__base +'config/express-config')(express, app);


  // Load all routes
  fs.readdirSync(__base +'routes').forEach(function(file){
    if(file.substr(-3) == '.js'){
      router = require(__base +'routes/' + file);
      router.route(app, express);
    }
  });



  //* 404
  app.use(function(req, res, next) {
    res.status(404).send('404 Not Found');
  }); //*/
  //* Error handler - ALWAYS DEFINE THIS MIDDLEWARE LAST
  app.use(function(err, req, res, next){
    console.log('[SOMETHING BROKE!]', err.stack);
    res.sendStatus(500).end();
    //next();
  }); //*/


  app.listen(3000);
  console.log('Magic happens on port 3000');
  console.log('NODE_ENV: '+ process.env.NODE_ENV);
