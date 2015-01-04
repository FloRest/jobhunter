'use strict';

var CONFIG = {};
CONFIG.api = {
  endpoint : "http://172.30.2.73",
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
controller('LayoutController', function($scope, $mdSidenav, $location,searchService, $rootScope) {
  $scope.openLeftMenu = function() {
    if (!$mdSidenav('left').isOpen())
      $mdSidenav('left').open();
  };
  $scope.routeTo = function(route) {
    $rootScope.$broadcast(route);
    $location.path('/'+route);
      $mdSidenav('left').close();
    $scope.search.text = '';
  };

  $scope.openSideNav = function(bool) {
    var isOpen = $mdSidenav('left').isOpen();
    if (bool == !isOpen) {
      $mdSidenav('left').toggle(bool);
    }
  };

  $scope.search = {};
  $scope.search.type = 'offers';
  $scope.searchAction = function() {
    searchService.setSearch($scope.search);
    $rootScope.$broadcast('search', $scope.search);
    $location.path('/'+$scope.search.type);
  }
}).
run(['$rootScope', function($rootScope) {
      $rootScope.$on('$routeChangeStart', function (event, next, current) {

      });
    }])
;
