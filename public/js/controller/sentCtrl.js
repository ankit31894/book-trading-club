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
            console.log(d);
          $scope.books=d;
      },function(err){
          $scope.E_getWishBooks=err;
      }).finally(function(){
          $scope._getWishBooks=false;
      });
  })();

  ($scope.getLoggedStatus=function(){
      $scope._getLoggedStatus=true;
      $scope.E_getLoggedStatus="";
      myhttp.fetch({
          url:'/checklogged',method:'GET'
      }).then(function(d){
          if(d=="1")
            $scope.logged=true;
      },function(err){
        if(err.code!==401)$scope.E_getLoggedStatus="Can't Check whether you are logged In";
      }).finally(function(){
          $scope._getLoggedStatus=false;
      });
  })();

});


mainApp.factory('myhttp', function($http,$q) {

   return {
        fetch: function(req) {
            var deferred = $q.defer();
             //return the promise directly.
             $http(req)
               .then(function(result) {
                    deferred.resolve(result.data)
                },function(err){
                    deferred.reject(err.data)
                });
            return deferred.promise;

        }
   }
});
