'use strict';

var CONFIG = {};
CONFIG.api = {
  endpoint : "http://172.28.16.12",
  port : "1338"
};
CONFIG.api.route = CONFIG.api.endpoint + ':' + CONFIG.api.port;


// Declare app level module which depends on views, and components
angular.module('huntaxuiba', [
  'ngRoute',
  'ngResource',
  'ngMaterial',
  'ngFx',
  'huntaxuiba.authService',
  'huntaxuiba.apiService',
  'huntaxuiba.toastService',
  'huntaxuiba.views'
]).
controller('LayoutController', function($scope, $mdSidenav, $location,toastService) {
  $scope.openLeftMenu = function() {
    if (!$mdSidenav('left').isOpen())
      $mdSidenav('left').open();
  };
  $scope.routeTo = function(route) {
    $location.path('/'+route);
      $mdSidenav('left').close();
  };

  $scope.openSideNav = function(bool) {
    var isOpen = $mdSidenav('left').isOpen();
    if (bool == !isOpen) {
      $mdSidenav('left').toggle(bool);
    }
  };

  $scope.search = {};
  $scope.search.type = 'offers';
}).
run(['$rootScope', function($rootScope) {
      $rootScope.$on('$routeChangeStart', function (event, next, current) {

      });
    }])
;
