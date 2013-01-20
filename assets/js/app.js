'use strict';

/* App Module */
angular.module('osmosis', ['ngResource']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/login', {templateUrl: 'login.html',   controller: LoginCtrl}).
      when('/user_type', {templateUrl: 'user_type.html', controller: UserCtrl}).
      when('/home', {templateUrl: 'home.html', controller: ProfileCtrl}).
      when('/profile', {templateUrl: 'profile.html', controller: ProfileCtrl}).
      otherwise({redirectTo: '/login'});
}]);