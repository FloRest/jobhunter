viewModule
    .controller('OffersController', ['$scope', '$routeParams', 'offersService', 'toastService',
        function($scope, $routeParams, offersService, toastService) {
            $scope.offer = {};
            $scope.offer.company = {};
            $scope.offer.requirements = [];
            $scope.loading = true;
            $scope.offers = [];
            $scope.updateOffer = false;

            $scope.sendOffer = function() {
                console.log($scope.offer);
                if ($scope.updateOffer == false) {
                    offersService.create($scope.offer).then(function(data, err) {
                        $scope.offers.push(data.data);
                    });
                } else {
                    offersService.update($scope.offer.id, $scope.offer).then(function(data,err) {

                    });
                }


            };

            $scope.pushOffRequirements = function(index) {
                $scope.offer.requirements.splice(index, 1);
            };

            offersService.getAll().then(function(data, err) {
                console.log(data);
                $scope.offers = $scope.offers.concat(data.data.hits);
                console.log($scope.offers);
                $scope.loading=false;
            })

            $scope.updateClick = function(offer) {
                $scope.isOfferFormOpen = true;
                $scope.updateOffer = true;
                $scope.offer= offer;
            }

        }]
    )
;