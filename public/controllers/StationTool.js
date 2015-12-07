
angular
.module('radioTool')
.controller('StationToolController', function(Contest,Station,PastLookups,$scope) {
    var vm = this;

    console.log('searching...');
    vm.loading = true;

    Contest.retrieveAll().then(function(contests) {
        console.log("Retrieving Contests");
        vm.contests = contests;
        vm.loading = false;
        console.log(vm.contests);

        // testObject.save({RadioData: vm.contests}).then(function(object) {
        //     //alert("yay! it worked");
        //     //vm.lookupSearchTool();
        // });
    });

    vm.radioStationData = [];
    vm.stationLookup = function() {


        var StationObject = Parse.Object.extend("data_stations");
        var testStation = new StationObject();

        Station.getStation(vm.stationDial).then(function(result) {
            testStation = result;
            vm.radioStationData = [];
            $scope.$apply(function () {



            $scope.vm.radioStationData.push(
                {
                    "call_letters":testStation.get("call_letters"),
                    format:testStation.get("format"),
                    freq:testStation.get("freq"),
                    owner:testStation.get("owner"),
                    phone_number:testStation.get("phone_number"),
                    station_name:testStation.get("station_name"),
                    logo:testStation.get("logo")
                }
            );
            });

            console.log(vm.radioStationData[0]);
        });

        vm.radioStationData.reverse();
    }


    /*
    #     Query to Parse to Retrieve all the Previous Lookups.
    */
    vm.previousSearches = [];
    vm.phoneNumberLookup = function(){
        //User submits a number to look up
        //We query our database for the number to see if already inside
        //if so , display that data.
        //else, we set up new lookup query, display that data and store it in our database
        //then we call refresh previous entry database call.

        PastLookups.checkEntry(vm.phoneNumber, vm.previousSearches).then(function(result){
            //we don't do anything with the result because we passed in the previousSearches array
            // where we pushed objects in from the function. This is because depending on the result of
            // if the number had been searched previously, either a json object or a parse object was returned
            // which caused errors with two differnt types.
                //vm.prevSearchRefresh();
                //vm.previousSearches.reverse();
        });
    }

    vm.prevSearchRefresh = function() {
        //here we retrieve all previous results and populate our array.
        var Data_Numbers_Obj = Parse.Object.extend("Lookups");
        var tempObj = new Data_Numbers_Obj();
        var query = new Parse.Query(Data_Numbers_Obj);
        vm.previousSearches = [];
        return query.find().then(
            function(results){
                console.log(results.length);
                for (var i = results.length-1; i>-1; i--){
                    tempObj=results[i];
                    vm.previousSearches.push(
                        {"display_num":tempObj.get('display_num'),
                        "carrier":tempObj.get('carrier'),
                        "type":tempObj.get('type')}
                    );
                }
                //vm.previousSearches.reverse();
                console.log(vm.previousSearches);
            });
        }

        vm.prevSearchRefresh();



    });
//});
