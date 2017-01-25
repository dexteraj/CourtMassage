var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var clients = require('./routes/clients');
var port = 3000;
var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

//Set static folder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index)
app.use('/api', clients);


//Listen to start server
app.listen(port,function(){
    console.log('Sever started on port ' , +port)
})
