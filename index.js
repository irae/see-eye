var bouncy = require('bouncy');
var url = require('url');

var server = bouncy(function (req, res, bounce) {
    var query;
    try {
        query = url.parse(req.url, true).query;
    } catch(e) {}

    if(query && query.url) {
        return bounce(query.url);
    }

    res.statusCode = 404;
    res.end('no such host');
});
server.listen(6352);
