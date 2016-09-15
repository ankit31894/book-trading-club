var mainApp=angular.module('ReceivedCtrl', []);
mainApp.controller('ReceivedController', function($scope,$http,$location,myhttp) {
  $scope.formData={};
  
  ($scope.getComingBooks=function(){
      $scope.books=[];
      $scope._getComingBooks=true;  //start from _ means loading flag for that function name
      $scope.E_getComingBooks="";  //start from E_ means error string for that function name
      myhttp.fetch({
          url:'/getcomingbooks',method:'GET'
      }).then(function(d){
            console.log(d);
          $scope.books=d;
      },function(err){
          $scope.E_getComingBooks=err;
      }).finally(function(){
          $scope._getComingBooks=false;
      });
  })();
  $scope.acceptTrade=function(mybook,comingbook){
      $scope.books=[];
      $scope._acceptTrade=true;  //start from _ means loading flag for that function name
      $scope.E_acceptTrade="";  //start from E_ means error string for that function name
      myhttp.fetch({
          url:'/accepttrade',method:'POST',data:{mybook:mybook,comingbook:comingbook}
      }).then(function(d){
          $location.path("/mybooks");
      },function(err){
          $scope.E_acceptTrade=err;
      }).finally(function(){
          $scope._acceptTrade=false;
      });
  };

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
