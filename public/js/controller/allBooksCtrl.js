var mainApp=angular.module('AllBooksCtrl', []);
mainApp.controller('AllBooksController', function($scope,$http,$location,myhttp) {
  $scope.formData={};
  ($scope.getAllBooks=function(){
      $scope.books=[];
      $scope._getAllBooks=true;  //start from _ means loading flag for that function name
      $scope.E_getAllBooks="";  //start from E_ means error string for that function name
      myhttp.fetch({
          url:'/getallbooks',method:'GET'
      }).then(function(d){
          $scope.books=d;
      },function(err){
          $scope.E_getAllBooks=err;
      }).finally(function(){
          $scope._getAllBooks=false;
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
