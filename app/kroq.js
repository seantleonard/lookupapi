var request = require('request');
var q = require('q');
var express = require('express');
var cheerio = require('cheerio');

module.exports = {
    getPage: function(url) {
        var deferred = q.defer()

		request(url, function(error, response, html) {
			//munge data here
            var $ = cheerio.load(html);

            var name, age, arv, start_date, end_date;
            var sendme = [];
            var json = { name : "", eligibility : "", arv : "", start_date: "", end_date :""};

            $('#popup-rules').filter(function(){
                var data = $(this);

                /** GET THE NAME OF THE CONTEST **/
                name = data.children().first().children().first().text();
                console.log(name);
                json.name = name;

                //** GET THE DATE OF THE CONTEST **/
                //get the end date of the contest.
                var tempDates = data.children().first().children().text();
                var beginDateIndex = tempDates.indexOf("begins on");
                var endDateIndex = tempDates.indexOf("Promotion Dates");
                endDateIndex-=7; //shifts back to last date.
                var middleShiftIndex = tempDates.indexOf("and ends on");
                //start date
                json.start_date = tempDates.substring(beginDateIndex+10,middleShiftIndex-1);
                //end date
                json.end_date = tempDates.substring(middleShiftIndex+12,endDateIndex);


                //** GET THE ELIBILITY AGE **/
                var textData = data.children().first().children().text();
                var beginIndex = textData.indexOf("U.S. residents ")
                console.log(beginIndex);
                beginIndex+=15;
                json.eligibility = textData.substring(beginIndex,beginIndex+2);


                //** GET THE ARV **/
                var beginARVIndex = textData.indexOf("ARV")+25;
                console.log(beginARVIndex);
                var dollarAmount = textData.substring(beginARVIndex, beginARVIndex+10);
                console.log(dollarAmount);
                var r = /[$][0-9]+\.[0-9][0-9]/
                dollarAmount = dollarAmount.match(r);
                json.arv = dollarAmount[0];
                sendme.push(json);

            })


            deferred.resolve(json)
		})

		return deferred.promise;

    }
};
