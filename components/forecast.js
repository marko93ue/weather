angular.module("app").component('forecast',{
  bindings: { forecast: '<'},
  template: 
"<h1>{{$ctrl.forecast.city.name}},{{$ctrl.forecast.city.country}}</h1>"+
"<span ng-if='$ctrl.forecast.error'> {{$ctrl.forecast.error}}</span>"+
"<div ng-repeat='item in $ctrl.forecast.list'>"+
"  <span>{{ toUnixDate(item.dt_txt) | date:'MMM, d hh a'  }} {{(item.main.temp-273).toFixed()}}C {{item.weather[0].description}}</span>"+
"</div>"+
"<button ui-sref='home'>Close</button>",

  controller: function($scope){
    
    $scope.toUnixDate = function( jsonDate)
    {
      return ( new Date(jsonDate).getTime());
    }
    console.log($scope);
  }
  
 
  
})