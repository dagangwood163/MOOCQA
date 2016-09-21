'use strict';

angular.module('moocApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/?keyword',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'QuestionsIndexCtrl',
        resolve: {
          query: function(){return {};}
        },
      })
      .state('follwingQuestionsIndex', {
        url: '/users/:userId/following',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'QuestionsIndexCtrl',
        resolve: {
          query: function($stateParams){
            return {
              $or: [
                {'follows': $stateParams.userId},
                {'answers.follows': $stateParams.userId},
                {'comments.follows': $stateParams.userId},
                {'answers.comments.follows': $stateParams.userId},
              ]
            };
          }
        },
      })
      .state('userQuestionsIndex', {
        url: '/users/:userId',
        templateUrl: 'app/questionsIndex/questionsIndex.html',
        controller: 'QuestionsIndexCtrl',
        resolve: {
          query: function($stateParams){
            return {user: $stateParams.userId};
          }
        },
      });

  });
