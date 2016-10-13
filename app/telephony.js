var twilio = require('twilio');
var request = require('request');
var qs = require('qs');

module.exports = {
    // Download the Node helper library from twilio.com/docs/node/install
    // These vars are your accountSid and authToken from twilio.com/user/account

    getLookupResults: function (searchParam, callback){
        var accountSid = '';// Your key here
        var authToken = '';//your key here
        var LookupsClient = require('twilio').LookupsClient;
        var client = new LookupsClient(accountSid, authToken);

        client.phoneNumbers(searchParam).get({
            type: 'carrier'
        },function(error, number) {
            console.log(number);
            console.log(number.carrier.name);
            callback(number);
        });
    },

    getFormatted: function (searchParam, callback){
        var accountSid = 'AC3e19a815d95d334d0f5fc6da13dfdde3';
        var authToken = '52ad68fbfbfe8abf808269de74119405';
        var LookupsClient = require('twilio').LookupsClient;
        var client = new LookupsClient(accountSid, authToken);

        client.phoneNumbers(searchParam).get(
            function(error, number) {
                console.log(number);
                callback(number.phone_number);
        });
    }


};
