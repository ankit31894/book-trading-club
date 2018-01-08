var mainApp=angular.module('AccCtrl', []);
mainApp.controller('AccountController',['$scope','myhttp', function($scope,myhttp) {
  $scope.formdata={
    name:'',
    city:'',
    state:''
  };
  $scope._update=false;
  ($scope.update=function(){
      $scope._update=true;  //start from _ means loading flag for that function name
      $scope.E_update="";  //start from E_ means error string for that function name
      myhttp.fetch({
          url:'/updateprofile',method:'POST',data:{info:$scope.formdata}
      }).then(function(d){
        $scope.formdata=d;
      },function(err){
          $scope.E_update=err;
      }).finally(function(){
          $scope._update=false;
      });
  })();
}]);
