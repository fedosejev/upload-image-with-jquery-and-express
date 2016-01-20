var express = require('express');
var multer = require('multer');
var path = require('path');
var cors = require('cors');
var crypto = require('crypto');

var PORT = 8181;
var FILE_SIZE_LIMIT_IN_MB = 5;
var UPLOAD_PATH = '/public/uploads/';

var storage = multer.diskStorage({
  destination: __dirname + UPLOAD_PATH,
  filename: function (request, file, callback) {
    crypto.pseudoRandomBytes(16, function (error, raw) {
      if (error) {
        return callback(error, null);
      }

      callback(null, raw.toString('hex') + path.extname(file.originalname));
    })
  },
  limits: {
    fileSize: FILE_SIZE_LIMIT_IN_MB * 1000000,
    files: 1
  }
});

var upload = multer({ storage: storage });

var app = express();

app.use(express.static(__dirname + '/public'));

// Middleware that enables CORS
app.use(cors());

app.post('/images/upload', upload.single('image'), function handleRequest(request, response) {
  
  // Filename available in: request.file.filename

  response.json({
    success: true,
    file: request.file
  });
});

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listening at http://%s:%s', host, port);
});