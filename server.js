const express = require('express');
const http = require('http');

const app = express();
app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/public'));

http.createServer(app).listen(app.get('port'), () => {
	console.log('App listening on port' + app.get('port'));
});