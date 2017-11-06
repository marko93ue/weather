angular.module("app").component('forecast',{
  bindings: { forecast: '<'},
  template: 
"{{$ctrl.forecast.city.name}}"+
"<div ng-repeat='item in $ctrl.forecast.list'>"+
"  <span>{{item.dt_txt}} {{(item.main.temp-273).toFixed()}}C {{item.weather.description}}</span>"+
"</div>"+
"<button ui-sref='home'>Close</button>",

  controller: function($scope){
    
  }
  
 
  
})