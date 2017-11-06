angular.module("app").component('home',{
  bindings: { forecast: '<'},
  template: 
  
'      <div class="row mt-5"  >'+
'      <div  class="col-8" >'+
'        <input type="button" ng-click="addZipCode()" value="Add zip code" />'+
'        <input type="button" ng-click="checkWeather()" value="Check current weather" />'+
'        <br><br>'+
'        <div ng-repeat="x in zipCodes" >'+       
'          <div ng-if="x.show" class="alert alert-danger" >'+
'            <span>Zip code: </span>'+
'            <input type="text" ng-model="x.value" />'+
'            <span ng-if="x.weather.dt" ui-sref="home.forecast({zipCode: x.value })" >'+
'              {{x.weather.name}} {{ (x.weather.main.temp-273).toFixed()}}C {{x.weather.weather[0].description}}'+
'            </span>'+
'          </div>'+          
'        </div>'+
'        <br>'+
'        <input type="button" ng-if="zipCodes[0].show" ng-click="removeZipCode()"'+
'          value="Remove zip last code" />'+
'        <br>'+        
'      </div>'+
'      <ui-view></ui-view>'+
'    </div>',
            
  controller: function($scope,WeatherService){
  $scope.maxSize = 10;
  $scope.zipCodes = [];

  for(let i = 0; i < $scope.maxSize; i++)
  {
    if( i === 0)
      $scope.zipCodes.push( {id: i, show: true, value: ""} );
      
    else
      $scope.zipCodes.push( {id: i, show: false, value: ""} );
  }
    
  $scope.addZipCode = function addZipCodeFn()
  {

    for(let i = 0; i < $scope.maxSize; i++)
    {
      if( !$scope.zipCodes[i].show)
      {
        $scope.zipCodes[i].show = true;
        break;
      }
    }
  }
    
  $scope.removeZipCode = function removeZipCodeFn()
  {
    for(let i = 1; i < $scope.maxSize; i++)
    {
      if( !$scope.zipCodes[i].show && $scope.zipCodes[i-1].show )
      {
        $scope.zipCodes[i-1].show = false;
        $scope.zipCodes[i-1].value = "";
        return;
      }
    }
      
    if( $scope.zipCodes[$scope.maxSize - 1].show )
    {
      $scope.zipCodes[$scope.maxSize-1].show = false;
      $scope.zipCodes[$scope.maxSize-1].value = "";
    }
  }
  
  $scope.checkWeather = function checkWeatherFn()
  {
    for(let i = 0; i < $scope.zipCodes.length; i++)
    {
      (function(j){
        if($scope.zipCodes[j].show && $scope.zipCodes[j].value)
        {
          $scope.zipCodes[j].weather = WeatherService.getCurrentWeather($scope.zipCodes[j]);
        }
      }(i));
    }
  }
}
  
 
  
})