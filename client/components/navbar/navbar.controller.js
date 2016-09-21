'use strict';

class NavbarController {
  //start-non-standard


  isCollapsed = true;
  //end-non-standard

  constructor(Auth, $state) {
    this.menu = [
      {
        'title': 'All Questions',
        'link': function(){return '/';},
        'show': function(){return true;},
      },
      {
        'title': 'My Questions',
        'link': function(){return '/users/' + Auth.getCurrentUser()._id;},
        'show': Auth.isLoggedIn,
      },
      {
        'title': 'My Follows',
        'link': function(){return '/users/' + Auth.getCurrentUser()._id + '/following';},
        'show': Auth.isLoggedIn,
      },
    ];
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    this.search = function(keyword) {
      $state.go('main', {keyword: keyword}, {reload: true});
    };
  }
}

angular.module('moocApp')
  .controller('NavbarController', NavbarController);
