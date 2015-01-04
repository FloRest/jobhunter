viewModule
    .controller('OffersController', ['$scope', '$routeParams', 'offersService', 'toastService', '$location', 'searchService',
        function($scope, $routeParams, offersService, toastService, $location, searchService) {
            $scope.offer = {};
            $scope.offer.company = {};
            $scope.offer.requirements = [];
            $scope.loading = true;
            $scope.offers = [];

            $scope.sendOffer = function() {
                offersService.create($scope.offer).success(function(data, err) {
                    $scope.offers.push(data);
                    toastService.toast('You successfully created a job offer !');
                    $scope.isOfferFormOpen = false;
                }).error(function() {
                    toastService.toast('Something is wrong. Check the fields.');
                });
            };

            $scope.cancelOffer = function() {
                $scope.offer={};
                $scope.offer.requirements=[];
                $scope.offer.company={};
                $scope.isOfferFormOpen = false;
            };

            $scope.pushOffRequirements = function(index) {
                $scope.offer.requirements.splice(index, 1);
            };

            var search = searchService.getSearch();
            if (search) {
                searchService.basicSearch(search.type, search.text).success(function(data) {
                    $scope.offers = data.hits;
                    $scope.loading = false;
                });
                searchService.setSearch(null);
            }else {
                offersService.getAll().success(function(data){
                    $scope.offers = $scope.offers.concat(data.hits);
                    $scope.loading = false;
                });
            }

            $scope.$on('search', function(event, search) {
               if (search.type == 'offers') {
                   $scope.loading = true;
                   searchService.basicSearch(search.type, search.text).success(function(data) {
                       $scope.offers = data.hits;
                       $scope.loading = false;
                   });
               }
            });

            $scope.routeTo = function(route) {
                $location.path('/'+route);
                return false;
            };

        }]
    )
;

