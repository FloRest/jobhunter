viewModule
    .controller('OffersController', ['$scope', '$routeParams', 'offersService', 'toastService', '$location',
        function($scope, $routeParams, offersService, toastService, $location) {
            $scope.offer = {};
            $scope.offer.company = {};
            $scope.offer.requirements = [];
            $scope.loading = true;
            $scope.offers = [];
            $scope.updateOffer = false;

            $scope.sendOffer = function() {
                if ($scope.updateOffer == false) {
                    offersService.create($scope.offer).success(function(data, err) {
                        $scope.offers.push(data);
                        toastService.toast('You successfully created a job offer !');
                        $scope.isOfferFormOpen = false;
                    }).error(function() {
                        toastService.toast('Something is wrong. Check the fields.');
                    });
                } else {
                    offersService.update($scope.offer.id, $scope.offer).success(function(data,err) {
                        $scope.updateOffer = false;
                        $scope.offer = {};
                        $scope.offer.company = {};
                        $scope.offer.requirements = [];
                        toastService.toast('Job offer updated.');
                        $scope.isOfferFormOpen = false;
                    }).error(function() {
                        toastService.toast('Something is wrong. Did you forgot the secret ?');
                    })
                }
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

