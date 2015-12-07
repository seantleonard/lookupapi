var express = require('express');
var fs      = require('fs');
var kroq    = require('./app/kroq.js');
var telephony    = require('./app/telephony.js');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var q       = require('q');

app.use(express.static(__dirname + '/public'));

app.get('/scrape', function(req, res){

    var contestPromises = [];
    var urlArray =['http://streetteam.kroq.radio.com/Contest/9BAQLF',
    'http://streetteam.kroq.radio.com/Contest/6VURAH', 'http://streetteam.kroq.radio.com/Contest/AGCBBL',
'http://streetteam.kroq.radio.com/Contest/AWCDQT','http://streetteam.kroq.radio.com/Contest/5DNAKD',
'http://streetteam.kroq.radio.com/Contest/8FBFBY','http://streetteam.kroq.radio.com/Contest/ANDTAS'];
    for(var i =0; i< urlArray.length; i++){
        var promise = kroq.getPage(urlArray[i]);
        contestPromises.push(promise);
        console.log(contestPromises);
    }
    console.log(contestPromises);
    q.all(contestPromises).then(function(results) {
        var page1Results = results[0];
        var page2Results = results[1]
        console.log(page1Results);
        console.log(page2Results);
        res.json([page1Results, page2Results])
    })
    //var url = 'http://streetteam.kroq.radio.com/Contest/9BAQLF';

});

// TO TEST: use URL http://localhost:xxxx/lookup?number=
//After the equals sign , write an artist you want to search for.
//my search: http://localhost:xxxx/lookup?number=6263792629

app.get('/lookup', function(req, res) {
    telephony.getLookupResults(req.query.number, function(result){
        res.json(result);
    });

});

// TO TEST: use URL http://localhost:xxxx/clean?number=
//After the equals sign , write an artist you want to search for.
//my search: http://localhost:xxxx/clean?number=6263792629
app.get('/numberclean', function (req, res){
    telephony.getFormatted(req.query.number, function(result){
        res.json(result);
    });
});

// TO TEST: use URL http://localhost:xxxx/station?dial=
//After the equals sign , write an artist you want to search for.
//my search: http://localhost:xxxx/station?dial=106.7
// app.get('/station', function(req, res) {
//     tation.getLookupResults(req.query.dial, function(result){
//         res.json(result);
//     });
//
// });



app.listen(process.env.PORT || 5000);
console.log('Magic happens on port 8000');
exports = module.exports = app;
