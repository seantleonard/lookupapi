angular
.module('radioTool')
.factory('PastLookups', function($http) {
    return {
        checkEntry: function(numberParameter, arrayNum) {
            var numToSearch = numberParameter;
            var formattedNumber;
            return  $http.get('/numberclean?number='+numToSearch).then(function(response) {
                formattedNumber= response.data;
                console.log(formattedNumber);

                var Data_Numbers_Obj = Parse.Object.extend("Lookups");
                var query = new Parse.Query(Data_Numbers_Obj);
                query.equalTo("number", formattedNumber);
                console.log(query);
                return query.find().then(
                    function(results){
                        if( results.length > 0){
                            console.log("Found a match in database.");
                            //Number already in database so return that entry

                            var NumberObject = Parse.Object.extend("Lookups");
                            var testNumber = new NumberObject();
                            testNumber = results[0];

                            console.log(testNumber.get('number'));
                            alert("Notice: Number already in history");
                                //arrayNum.reverse();
                            // arrayNum.push(
                            //     {"display_num":testNumber.get('number'),
                            //     "carrier":testNumber.get('carrier'),
                            //     "type":testNumber.get('type')});
                            return results[0].save();
                        }
                        else {
                            //number not in database so we have to
                            // do twilio search
                            return $http.get('/lookup?number='+formattedNumber).then(function(response) {
                                // display
                                var LookupResult = Parse.Object.extend("Lookups");
                                var lookupObj = new LookupResult();
                                var displayNum = response.data.phone_number.substr(0,8);
                                displayNum += "****";

                                lookupObj.save({number: response.data.phone_number,
                                    carrier: response.data.carrier.name,
                                    type: response.data.carrier.type,
                                    display_num: displayNum
                                }).then(function(object) {
                                    //alert("yay! it worked");
                                });
                                //
                                arrayNum.push(
                                    {"display_num":displayNum,
                                    "carrier":response.data.carrier.name,
                                    "type":response.data.carrier.type});

                                //arrayNum.reverse();
                                return response.data;
                                // store back in parse.

                            },function(error) {
                                alert("Error: " + error.code + " " + error.message);
                            });
                        }

                    });
                });
            }
        }
    });
