'use strict';

viewModule
    .controller('FeedController', ['$scope', '$routeParams', '$location', 'authService', 'usersService',
        function($scope, $routeParams,$location, authService, usersService) {
            $scope.loading = true;
            $scope.user = authService.currentUser();

            usersService.getCurrentUserFeed().success(function(data){
                $scope.feedItems = data;
                $scope.loading = false;
            });

            $scope.goToRessource = function(ressourceType, ressourceId){
                $location.path('/'+ ressourceType + '/' + ressourceId);
            }
        }])
;