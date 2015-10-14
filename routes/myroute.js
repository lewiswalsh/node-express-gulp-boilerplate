

  module.exports.route = function(app, express){

    var rMyRoute = express.Router();
    app.use('/myroute', rMyRoute);


    rMyRoute.get('/', function(req, res, next){
      var err = new Error('This is an error!');
      var throw_err = false;
      if(throw_err){ return next(err); } // This passes any errors to our express error handler.
      res.render('myroute', {
        page_title : 'My Route'
      });
    });


  }
