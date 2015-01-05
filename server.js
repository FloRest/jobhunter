var express = require('express');
var serveStatic = require('serve-static');
var compression = require('compression');

var app = express();


var config = {
	index: "index.html",
	port: 8080
};
if (process.env.NODE_ENV === "production") {
	config.index = "index-prod.html";	
	config.port = 80;
}

app.use(compression());
app.use(serveStatic('app', { 'index': config.index }));
app.listen(config.port, function () {
	console.log("Serveur listening on port [" + config.port + "]")
});