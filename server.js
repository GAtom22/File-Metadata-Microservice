'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse',upload.single('upfile') ,function(req, res, next){
  res.json({name: req.file.originalname, type: req.file.mimetype, size:req.file.size+' bytes'});
  //res.json(req.file);
});

//Not found 404 - Middleware
app.use(function(req,res,next){
  res.status(404);
  res.type('text').Send('Not found');
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
