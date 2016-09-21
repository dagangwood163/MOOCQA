'use strict';

angular.module('moocApp.auth', [
  'moocApp.constants',
  'moocApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
