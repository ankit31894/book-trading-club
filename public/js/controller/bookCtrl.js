var mainApp=angular.module('BookCtrl', []);
mainApp.controller('BookController',['$scope','$http','$routeParams','myhttp','$location', function($scope,$http,$routeParams,myhttp,$location) {
  $scope.wishbook = $routeParams.string;
  $scope.myBooks=[];
  ($scope.getBook=function(){
      $scope.books=[];
      $scope._getBook=true;  //start from _ means loading flag for that function name
      $scope.E_getBook="";  //start from E_ means error string for that function name
      myhttp.fetch({
          url:'/getsinglebook',method:'POST',data:{bookId:$scope.wishbook}
      }).then(function(d){
          $scope.book=d;
      },function(err){
          $scope.E_getBook=err;
      }).finally(function(){
          $scope._getBook=false;
      });
  })();
  ($scope.getMyBook=function(){
      $scope.books=[];
      $scope._getBook=true;  //start from _ means loading flag for that function name
      $scope.E_getBook="";  //start from E_ means error string for that function name
      myhttp.fetch({
          url:'/getmybooks'
      }).then(function(d){
          $scope.myBooks=d;
      },function(error){
          $scope.E_getMyBook=error;
      }).finally(function(){
          $scope._getMyBook=false;
      });
  })();
  $scope.proposeTrade=function(mybook){
      $scope.mybook=mybook;
      $scope._getBook=true;  //start from _ means loading flag for that function name
      $scope.E_getBook="";  //start from E_ means error string for that function name
      myhttp.fetch({
          url:'/maketrade',method:'POST',data:{wishbook:$scope.wishbook,mybook:mybook}
      }).then(function(d){
          $location.path("/sent");
      },function(err){

          $scope.E_proposeTrade=err;
      }).finally(function(){
          $scope._proposeTrade=false;
      });
  };

}]);
