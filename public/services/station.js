angular
  .module('radioTool')
  .factory('Station', function($http) {
    return {
      getStation: function(dialFrequency) {
          var stationDial = dialFrequency;
            // return $http({
            //     method: 'GET',
            //     url: 'https://api.parse.com/1/classes/data_stations',
            //     headers: {'X-Parse-Application-Id':'iPC7uO2qejs6r0eh1hE7oeRB1NHH68wd7wsOSqUk',
            //             'X-Parse-REST-API-Key':'m0ifbEktUor2IxjGNL5mvdevuWlDg0cyS4a2mqs7'    },
            //     params: {
            //         where : encodeURIcomponent(angular.toJson( {"freq":dialFrequency} ));
            //     }
            // }).success(function(data){
            //     return data;
            // }).error(function(){
            //     alert("error");
            // });

            var Data_Stations_Obj = Parse.Object.extend("data_stations");
            var query = new Parse.Query(Data_Stations_Obj);
            query.equalTo("freq", parseFloat(stationDial));
            console.log(query);
            return query.find().then(
                function(results){
                    //alert("Successfully retrieved " + results.length + " results.");
                    return results[0];
                },function(error) {
                    alert("Error: " + error.code + " " + error.message);
                });



        }
    }
});
