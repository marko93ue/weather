var app = angular.module("app", ['ui.router'])

app.config(function($stateProvider){
  var states = [
    {
      name: 'home',
      url: '/',
      component: 'home'
    },
  
    {
      name: 'home.forecast',
      url: 'zip/{zipCode}',
      component: 'forecast',
      resolve: {
        forecast: function($stateParams, WeatherService)
        {
          return WeatherService.getForecast($stateParams.zipCode);
        }
      }
    }
  ];
  
  states.forEach( function(state){
    $stateProvider.state(state);
  });
});

app.config( function( $urlRouterProvider){
   $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/');
});

