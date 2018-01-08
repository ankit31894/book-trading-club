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
                    deferred.reject(err.data);
                });
            return deferred.promise;

        }
   }
});
