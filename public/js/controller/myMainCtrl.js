var mainApp=angular.module('MyMainCtrl', []);
mainApp.controller('MyMainController', function($scope,$http,myhttp) {
  ($scope.getMyBooks=function(){
      $scope.books=[];
      $scope._getMyBooks=true;  //start from _ means loading flag for that function name
      $scope.E_getMyBooks="";  //start from E_ means error string for that function name
      myhttp.fetch({
          url:'/getmybooks',method:'GET'
      }).then(function(d){
          console.log(d);
          $scope.books=d;
      },function(err){
          $scope.E_getMyBooks=err;
      }).finally(function(){
          $scope._getMyBooks=false;
      });
  })();
  $scope.insertBook=function(){
      $scope._insertBook=true;
      $scope.E_insertBook="";
      myhttp.fetch({
          url:'/insertbook',method:'POST',data:$scope.formData
      }).then(function(d){
        console.log(d);
          $scope.books.unshift(d);
      },function(err){
          $scope.E_insertBook=err;
      }).finally(function(){
          $scope._insertBook=false;
      });
  };

});
