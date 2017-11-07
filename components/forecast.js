angular.module("app").component('forecast',{
  bindings: { forecast: '<'},
  template: 
"<h1>{{$ctrl.forecast.city.name + ', ' +$ctrl.forecast.city.country}}</h1>"+
"<span ng-if='$ctrl.forecast.error'> {{$ctrl.forecast.error}}</span>"+
"<div class='row align-items-start'>"+
"  <div ng-repeat='day in days' >"+
"    <div class='col'>"+
"      <h6 >{{day}}</h6>"+
"      <div ng-repeat='item in $parent.$ctrl.forecast.list'  >"+
"        <span ng-if='item.day === day' >"+
"          {{toUnixDate(item.dt_txt) | date: 'hh a'}} {{(item.main.temp-273).toFixed()}} {{item.weather.description}}C"+
"        </span>"+
"      </div>"+
"    </div>"+
"  </div>"+
"</div>"+
"<button ui-sref='home'>Close</button>",

  controller: function($scope,$filter){
    
    $scope.$ctrl.forecast = {};
    $scope.days = [];
    $scope.$watchCollection('$ctrl.forecast.list', function(newValue, oldValue){
      //console.log(newValue);
      if(newValue)
        $scope.parseDays(newValue);
 
    });
    
    $scope.toUnixDate = function( jsonDate)
    {
      return ( new Date(jsonDate.split("-").join("/")).getTime());
    }
    
     $scope.parseDays = function (list)
    {
      $scope.days = [];
      for(let i = 0; i < list.length; i++)
      {
        var currentDay =  $filter('date')($scope.toUnixDate(list[i].dt_txt),'EEEE');
        list[i].day = currentDay;
        if($scope.days.indexOf(currentDay) < 0)
          $scope.days.push(currentDay);
      }
      
    }
 
  }
  
 
  
})