'use strict';

viewModule
    .controller('RecipeController', ['$scope', '$routeParams', 'authService', 'recipesService', 'usersService',
        function($scope, $routeParams,authService, recipesService, usersService) {
            $scope.loading = true;
            $scope.loadingComment = true;
            $scope.user = authService.currentUser();
            $scope.comments = [];

            recipesService.getRecipe($routeParams.id).success(function(data) {
                $scope.recipe = data;
                $scope.getComments();
                usersService.get($scope.recipe.createdBy).success(function(data) {
                    $scope.loading = false;
                    $scope.recipe.createdBy = data;
                })
            });
            $scope.getComments =  function () {
                recipesService.getComments($routeParams.id).success(function(data) {
                    $scope.comments = data;
                    $scope.loadingComment = false;
                });
            };

            $scope.sendComment = function(comment) {
                $scope.loadingComment = true;
                recipesService.comment($scope.recipe.id, comment).success(function(data) {
                    data.createdBy = $scope.user;
                    $scope.comments.push(data);
                    $scope.loadingComment = false;
                })
            }
    }])
;
