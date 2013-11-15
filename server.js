'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path'),
    routes = require('./routes');

var app = module.exports = express();

// Controllers
var api = require('./lib/controllers/api');

app.use(express.static(path.join(__dirname, '/app')));
// Express Configuration
app.configure(function(){
    app.set('views', __dirname + '/app');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
    app.engine('html', require('ejs').renderFile);
});

app.configure('development', function(){
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, '/app')));
  app.use(express.errorHandler());
});

app.configure('production', function(){
  app.use(express.favicon(path.join(__dirname, 'public/favicon.ico')));
  app.use(express.static(path.join(__dirname, 'public')));
});

// Routes
app.get('/', routes.index);
app.get('/views/:name', routes.partials);
app.get('*', routes.index);
// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});