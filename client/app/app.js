'use strict';

angular.module('moocApp', [
  'moocApp.auth',
  'moocApp.admin',
  'moocApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ui.pagedown',
  'ngTagsInput',
  'ngMessages',
  'infinite-scroll',
  'ngDialog'    
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
