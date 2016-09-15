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
