'use strict';

angular.module('moocApp')
  .controller('QuestionsShowCtrl', function ($scope, $http, $stateParams, Auth, $location,$window,ngDialog) {
    var loadQuestions = function(){
      //$scope.question={};        
      $http.get('/api/questions/' + $stateParams.id).success(function(question) {
        $scope.question = question;
          console.log(question);
      });
    };
    
    loadQuestions();    
    
    $scope.openModal = function(){
      ngDialog.open({
        template: '<p>Text in Modal Dialog</p>',
        plain: true,
        className: 'ngdialog-theme-default',
        closeByEscape: false,
        closeByDocument: false
      });
    }
    
    $scope.openConfirmDialog = function(){
      ngDialog.openConfirm({
        template: '<div class="ngdialog-message"><h3>Are you sure to delete this item?</h3></div><div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog()">Cancel</button><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(OK)">Confirm</button></div>',
        plain: true,
        className: 'ngdialog-theme-default'
      }).then(
        function(value){
          console.log('confirmed, value - ', value);
          //return true;
        },
        function(reason){
          console.log('rejected, reason - ', reason);
          //return false;
        }
      );
    } 
    

    $scope.deleteConfirmDialog = function(){
      var Val = ngDialog.openConfirm({
        template: '<div class="ngdialog-message"><h3>Are you sure to delete this item?</h3></div><div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0)">Cancel</button><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Confirm</button></div>',
        plain: true,
        className: 'ngdialog-theme-default'
      });
      return Val;
    }     
    
    
    $scope.newAnswer = {};
    
    $scope.submitAnswer = function() {
      $http.post('/api/questions/' + $stateParams.id + '/answers', $scope.newAnswer).success(function(){
        loadQuestions();
        $scope.newAnswer = {};
      });
    };

    $scope.cancelsubmitAnswer = function() {
        loadQuestions();
        $scope.newAnswer = {};
    };

    
    $scope.testQuestion = function() {
        
        
    }
    
    $scope.deleteQuestion = function() {
    
    //ngDialog.open({ template: 'popupTmpl.html', className: 'ngdialog-theme-default' });
    
    ngDialog.openConfirm({
        template: '<div class="ngdialog-message"><h3>Are you sure to delete this question?</h3></div><div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0)">Cancel</button><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Confirm</button></div>',
        plain: true,
        className: 'ngdialog-theme-default'
        }).then(
        function(value){
            //console.log('confirmed, value - ', value);
            $http.delete('/api/questions/' + $stateParams.id).success(function(){
                $location.path('/');
                });
        },
        function(reason){
          //console.log('rejected, reason - ', reason);
        }
      );
       
    
    /*
    var deleteconfirm=$window.confirm('Are you sure to delete?');
        
    if (deleteconfirm)    
    {
    $http.delete('/api/questions/' + $stateParams.id).success(function(){
                $location.path('/');
                });
    }
    */

    };
    
    $scope.deleteAnswer = function(answer) {
        
        
    ngDialog.openConfirm({
        template: '<div class="ngdialog-message"><h3>Are you sure to delete this answer?</h3></div><div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0)">Cancel</button><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Confirm</button></div>',
        plain: true,
        className: 'ngdialog-theme-default'
        }).then(
        function(value){
        //console.log('confirmed, value - ', value);
         $http.delete('/api/questions/' + $stateParams.id + '/answers/' + answer._id).success(function(){
                loadQuestions();
                    });
        },
        function(reason){
          //console.log('rejected, reason - ', reason);
        }
      );
        
      /*var deleteconfirm=$window.confirm('Are you sure to delete?');
        if (deleteconfirm) 
        {      $http.delete('/api/questions/' + $stateParams.id + '/answers/' + answer._id).success(function(){
        loadQuestions();
            });
        }*/
    };
    
    $scope.updateQuestion = function() {
      $http.put('/api/questions/' + $stateParams.id, $scope.question).success(function(){
        loadQuestions();
      });
    };

    $scope.cancelupdateQuestion = function() {      
        loadQuestions();      
    };

    
    $scope.updateAnswer = function(answer) {
      $http.put('/api/questions/' + $stateParams.id + '/answers/' + answer._id, answer).success(function(){
        loadQuestions();
      });
    };
    
    $scope.cancelupdateAnswer = function() {
        loadQuestions();
    };    
    
    $scope.isOwner = function(obj){
      return Auth.isLoggedIn() && obj && obj.user && obj.user._id === Auth.getCurrentUser()._id;
    };

    $scope.isUserLogIn = function(){
      return Auth.isLoggedIn();
    };
    
    $scope.newComment = {};
    
    $scope.submitComment = function() {
      $http.post('/api/questions/' + $stateParams.id + '/comments', $scope.newComment).success(function(){
        loadQuestions();
        $scope.newComment = {};
        $scope.editNewComment = false;
      });
    };
    
    $scope.cancelsubmitComment = function() {
        loadQuestions();
        $scope.newComment = {};
        $scope.editNewComment = false;
    };

    
    $scope.submitAnswerComment = function(answer) {
      $http.post('/api/questions/' + $stateParams.id + '/answers/' + answer._id + '/comments', answer.newAnswerComment).success(function(){          
        loadQuestions();
      });
    };
    
    $scope.cancelsubmitAnswerComment = function() {
        loadQuestions();
    };    
    
    $scope.deleteComment = function(comment) {

        
    ngDialog.openConfirm({
        template: '<div class="ngdialog-message"><h3>Are you sure to delete this comment?</h3></div><div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0)">Cancel</button><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Confirm</button></div>',
        plain: true,
        className: 'ngdialog-theme-default'
        }).then(
        function(value){
        //console.log('confirmed, value - ', value);
        $http.delete('/api/questions/' + $stateParams.id + '/comments/' + comment._id).success(function(){
                loadQuestions();
                    });
        },
        function(reason){
          //console.log('rejected, reason - ', reason);
        }
      );
        
        /*var deleteconfirm=$window.confirm('Are you sure to delete?');
        if (deleteconfirm) 
        {   
        $http.delete('/api/questions/' + $stateParams.id + '/comments/' + comment._id).success(function(){
        loadQuestions();
      });
        }*/
    };
    
    $scope.deleteAnswerComment = function(answer, answerComment) {
        
        ngDialog.openConfirm({
        template: '<div class="ngdialog-message"><h3>Are you sure to delete this comment?</h3></div><div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0)">Cancel</button><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Confirm</button></div>',
        plain: true,
        className: 'ngdialog-theme-default'
        }).then(
        function(value){
        //console.log('confirmed, value - ', value);
        $http.delete('/api/questions/' + $stateParams.id + '/answers/' + answer._id + '/comments/' + answerComment._id).success(function(){
            loadQuestions();
                    });
        },
        function(reason){
          //console.log('rejected, reason - ', reason);
        }
      );
        
        /*var deleteconfirm=$window.confirm('Are you sure to delete?');
        if (deleteconfirm) 
        {   
      $http.delete('/api/questions/' + $stateParams.id + '/answers/' + answer._id + '/comments/' + answerComment._id).success(function(){
        loadQuestions();
      });
        }*/
        
    };
    
    $scope.updateComment = function(comment) {
      $http.put('/api/questions/' + $stateParams.id + '/comments/' + comment._id, comment).success(function(){
        loadQuestions();
      });
    };
    
    
    $scope.cancelupdateComment = function() {
        loadQuestions();
    };
    
    $scope.updateAnswerComment = function(answer, answerComment) {
      $http.put('/api/questions/' + $stateParams.id + '/answers/' + answer._id + '/comments/' + answerComment._id, answerComment).success(function(){
        loadQuestions();
      });
    };

    $scope.cancelupdateAnswerComment = function(answer, answerComment) {
        loadQuestions();
    };
    
    $scope.isFollow = function(obj){
      return Auth.isLoggedIn() && obj && obj.follows && obj.follows.indexOf(Auth.getCurrentUser()._id)!==-1;
    };
    $scope.follow = function(subpath) {
      $http.put('/api/questions/' + $scope.question._id + subpath + '/follows').success(function(){
        loadQuestions();
      });
    };
    $scope.unfollow = function(subpath) {
      $http.delete('/api/questions/' + $scope.question._id + subpath + '/follows').success(function(){
        loadQuestions();
      });
    };
  });

