viewModule
    .controller('SearchController', ['$scope', '$routeParams',
        function($scope, $routeParams) {
            $scope.search = {};
            $scope.search.type = 'offers';

            $scope.searchAction = function() {
                console.log("lol")
            }
        }])
;