'use strict';

viewModule
    .controller('ProfileController', ['$scope', '$routeParams', 'toastService','authService', 'usersService',
        function($scope, $routeParams,toastService, authService, usersService) {
        $scope.user = authService.currentUser();
        $scope.loading = true;
        var id = $routeParams.id ? $routeParams.id : $scope.user.id;

        usersService.get(id).success(function(data, err) {
            $scope.profile = data;
            $scope.loading = false;
            usersService.getFollowers($scope.profile.id).success(function(data) {
                $scope.followers = data;
            });

            usersService.getFollowing($scope.profile.id).success(function (data) {
                $scope.following = data;
            });
        });

        $scope.follow = function(id) {
            usersService.follow(id).success(function (data) {
                $scope.profile.followers += 1;
                toastService.toast('You are now following '+$scope.profile.name+'.');
                authService.refreshUser();
            });
        };

        $scope.unfollow = function(id) {
            usersService.unfollow(id).success(function (data) {
                $scope.profile.followers -= 1;
                toastService.toast('You say goodbye to '+$scope.profile.name+'.');
                authService.refreshUser();
            });
        };

        $scope.following = false;
        for (var i = 0; i < $scope.user.following.length; i++) {
            if ($scope.user.following[i] == $scope.profile.id) {
                $scope.following = true;
                break;
            }
        }

    }])
;
