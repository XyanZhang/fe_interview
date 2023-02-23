
// 在http中的应用
var zlib = require('zlib');
var fs = require('fs');
var http = require('http');
http.createServer(function (request, response) {
    var raw = fs.createReadStream('.' + request.url);
    var acceptEncoding = request.headers['accept-encoding'];
    if (!acceptEncoding) {
        acceptEncoding = '';
    }
    if (acceptEncoding.match(/\bdeflate\b/)) {
        response.setHeader('Content-Encoding','deflate');
        raw.pipe(zlib.createDeflate()).pipe(response);
    } else if (acceptEncoding.match(/\bgzip\b/)) {
        response.setHeader('Content-Encoding','gzip');
        raw.pipe(zlib.createGzip()).pipe(response);
    } else {
        raw.pipe(response);
    }
}).listen(9090)
var zlib = require('zlib');
var fs = require('fs');
var http = require('http');

var request = http.get({
    host: 'localhost',
    path: '/index.html',
    port: 9090,
    headers: {
        'accept-encoding': 'gzip,deflate'
    }
})

request.on('response', function (response) {
    var output = fs.createWriteStream('test.txt');
    switch (response.headers['content-encoding']) {
        case 'gzip':
            response.pipe(zlib.createGunzip()).pipe(output);
            break;
        case 'deflate':
            response.pipe(zlib.createInflate()).pipe(output);
            break;
        default:
            response.pipe(output);
            break;
    }
});
request.end();

// 5. 方法调用 #
var zlib = require('zlib');
var fs = require('fs');

var out = fs.createWriteStream('input.log');
var input = 'input';
zlib.gzip(input, function (err, buffer) {
    if (!err) {
        zlib.unzip(buffer, function (err, buffer) {
            if (!err) {
                console.log(buffer.toString());
                out.end(buffer);
            }
        })
    }
})