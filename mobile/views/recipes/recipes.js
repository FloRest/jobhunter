'use strict';

viewModule
    .controller('RecipesController', ['$scope', '$routeParams', '$location', 'authService', 'recipesService',
        function($scope, $routeParams, $location, authService, recipesService) {
        $scope.user = authService.currentUser();
        $scope.loading = true;

        recipesService.getRecipes().success(function (data) {
            $scope.loading = false;
            $scope.recipes = data.hits;
        });

        $scope.routeToRecipe = function(id) {
            $location.path('/recipe/'+id);
        };

        $scope.routeTo = function(route) {
            $location.path('/'+route);
        };
    }])
;