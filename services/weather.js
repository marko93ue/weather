angular.module("app").factory('WeatherService', function($http){
  var service = {
    getCurrentWeather: function (zipCode){
      
      zipCode.weather = undefined;
      zipCode.error = undefined;
      return $http({
        method: 'GET',
        url: 'http://api.openweathermap.org/data/2.5/weather',
        params: {'zip': zipCode.value, 'appid': 'bd5e378503939ddaee76f12ad7a97608'}
      }).then(function(response){
        
        zipCode.weather = response.data;
        return response.data;
      },
      
      function(){
        
       zipCode.error = "Error"
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
        return {error: 'Something went wrong'};
      } );
      
      
    }
  };
  
  return service;
});