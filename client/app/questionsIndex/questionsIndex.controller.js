'use strict';

angular.module('moocApp')
  .controller('QuestionsIndexCtrl', function ($scope, $http, $location, Auth, query) {
    
    var keyword = $location.search().keyword;
    
    if(keyword){
      query = _.merge(query, {$text: {$search: keyword}});
    }
    
    $scope.busy = true;
    
    $scope.noMoreData = false;

    $http.get('/api/questions', {params: {query: query}}).success(function(questions) {
    console.log(query);    
      $scope.questions = questions;
      if($scope.questions.length < 20){
        $scope.noMoreData = true;
      }
      $scope.busy = false;
    });
    
    $scope.isUserLogIn = function(){
      return Auth.isLoggedIn();
    };
    
    $scope.nextPage = function(){
      if($scope.busy){ return; }
      $scope.busy = true;
      var lastId = $scope.questions[$scope.questions.length-1]._id;
      var pageQuery = _.merge(query, {_id: {$lt: lastId}});
      $http.get('/api/questions', {params: {query: pageQuery}}).success(function(questions){
        $scope.questions = $scope.questions.concat(questions);
        $scope.busy = false;
        if(questions.length === 0){
          $scope.noMoreData = true;
        }
      });
    };
    
    $scope.isFollow = function(obj){
      return Auth.isLoggedIn() && obj && obj.follows && obj.follows.indexOf(Auth.getCurrentUser()._id)!==-1;
    }
    ;
    
  });
