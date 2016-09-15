var mainApp=angular.module('SentCtrl', []);
mainApp.controller('SentController', function($scope,$http,$location,myhttp) {
  $scope.formData={};
  ($scope.getWishBooks=function(){
      $scope.books=[];
      $scope._getWishBooks=true;  //start from _ means loading flag for that function name
      $scope.E_getWishBooks="";  //start from E_ means error string for that function name
      myhttp.fetch({
          url:'/getwishbooks',method:'GET'
      }).then(function(d){
          $scope.books=d;
      },function(err){
          $scope.E_getWishBooks=err;
      }).finally(function(){
          $scope._getWishBooks=false;
      });
  })();


});
