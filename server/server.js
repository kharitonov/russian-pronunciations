var request = require('request');
const cheerio = require('cheerio')
var express = require('express');
var app = express();


var port = process.env.PORT || 8080;
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
})


function getContent(options, res) {
    request(options,
        function (error, response, body) {
            attemptParse(body, res);
        });

}

function attemptParse(body, res) {
    let Words = [];
    const $ = cheerio.load(body);
    $('td').find('span.Cyrl').map(function (i, el) {
        $(this).each(function (i, element) {
            var test = $(this).text();
            Words.push(test);
        })
    }).get().join(' ');
    res.send(Words);

}




function main() {
    app.get('/word/:reqWord', function (req, res) {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var options = {
            url: 'https://en.wiktionary.org/wiki/' + encodeURIComponent(req.params.reqWord),
            headers: {
                'User-Agent': 'request',
            }
        };

        getContent(options, res);


    })

    app.get('/forvo/:reqLink', function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        var wordParam = req.params.reqLink;
        var options = {
            url: 'https://api.forvo.com/demo',
            headers: {
                'User-Agent': "'Mozilla/5.0 (Windows NT 6.1; rv:31.0) Gecko/20100101 Firefox/31.0",
                'Referer': 'https://api.forvo.com/demo'
            }
        };
        fetchSoundID(options, res, wordParam);
    });
}



function fetchSoundID(options, res, wordParam) {
    var r = request.post('https://api.forvo.com/demo',
        function (error, response, body) {
            parseForID(body, res);
        });


    var form = r.form();
    form.append('action', 'word-pronunciations');
    form.append('format', 'json');
    form.append('word', wordParam);
    form.append('id_lang_speak', '138');
    form.append('username', '');
    form.append('rate', '');
    form.append('id_order', '');
    form.append('limit', '');
    form.append('send', '');
}

function parseForID(body, res) {
    const $ = cheerio.load(body);
    var ID = [];

    $('div.intro').map(function (i, el) {
        res.send($(this).text());
    });
}

main();