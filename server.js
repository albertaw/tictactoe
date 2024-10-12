const express = require('express');
const http = require('http');
const path =require('path');

const app = express();
app.set('port', process.env.PORT || 8080);
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(app.get('port'), () => {
	console.log('Server running on port ' + app.get('port'));
});