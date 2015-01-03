'use strict';

viewModule
    .controller('RecipeFormController', ['$scope', '$routeParams', '$mdSidenav', '$location', 'authService', 'recipesService', 'ingredientsService',
        function($scope, $routeParams, $mdSidenav, $location, authService, recipesService, ingredientsService) {
            $scope.user = authService.currentUser();

            $scope.recipe = {
                steps: [""],
                ingredients: []
            };

            //send recipe
            $scope.createRecipe = function(recipe) {
                for (var i =0; i < recipe.ingredients.length; i++) {
                    recipe.ingredients[i] = {
                        id:recipe.ingredients[i].id,
                        quantity:recipe.ingredients[i].quantity
                    };
                }
                console.log(recipe);
                recipesService.create(recipe).success(function (data) {
                    $location.path('/recipe/'+data.id);
                })
            };

            //steps
            $scope.steps = [];
            $scope.addStep = function() {
                $scope.steps.push($scope.steps.length);
            };

            //ingredients
            ingredientsService.getAll().success(function(data) {
                $scope.ingredients = data.hits;
            });
            $scope.toggleIngredientsList = function() {
                $mdSidenav('right').toggle();
            };
            $scope.addIngredient = function(ingredient) {
                var pos = -1;
                for (var i =0; i < $scope.ingredients.length; i++) {
                    if (_.isEqual($scope.ingredients[i],ingredient)) {
                        pos = i;
                    }
                }
                if (pos != -1) {
                    $scope.ingredients.splice(pos, 1);
                }
                ingredient.quantity="10g";
                $scope.recipe.ingredients.push(ingredient);
            }
        }])
;
