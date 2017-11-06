angular.module("app").factory('WeatherService', function($http){
  var service = {
    getCurrentWeather: function (zipCode){
      
      $http({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/weather',
        params: {'zip': zipCode.value, 'appid': 'bd5e378503939ddaee76f12ad7a97608'}
      }).then(function(response){
        console.log(response.data);
        zipCode.weather = response.data;
      },
      function(){
        console.log("Error")
      });

    },
    
    getForecast : function( zipCode)
    {
      
      return $http({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/forecast',
        params: {'zip': zipCode, 'appid': 'bd5e378503939ddaee76f12ad7a97608'}
      }).then( function(response){
        return response.data;
      }, function(){
        console.log("Error");
      } );
      
      
    }
  };
  
  return service;
});