viewModule
    .controller('OffersController', ['$scope', '$routeParams', 'offersService', 'toastService', '$location',
        function($scope, $routeParams, offersService, toastService, $location) {
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

            offersService.getAll().then(function(data, err) {
                $scope.offers = $scope.offers.concat(data.data.hits);
                $scope.loading=false;
            });



            $scope.routeTo = function(route) {
                $location.path('/'+route);
                return false;
            };

        }]
    )
;

