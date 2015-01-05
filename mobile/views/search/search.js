viewModule
    .controller('SearchController', ['$scope', '$routeParams', '$rootScope', '$location', 'searchService',
        function($scope, $routeParams, $rootScope, $location, searchService) {
            $scope.search = {};
            $scope.search.type = 'offers';

            $scope.searchAction = function() {
                searchService.setSearch($scope.search);
                $location.path('/'+$scope.search.type);
                $rootScope.$broadcast('search', $scope.search);
            }
        }])
;