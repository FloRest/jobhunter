viewModule
    .controller('OfferController', ['$scope', '$routeParams', 'offersService', 'toastService', '$location',
        function($scope, $routeParams, offersService, toastService, $location) {

            $scope.loading = true;

            offersService.get($routeParams.id).then(function(data) {
                $scope.offer = data.data;
                $scope.loading = false;

            });

            $scope.cancelOffer = function() {
                $scope.isOfferFormOpen = false;
            };

            $scope.updateClick = function() {
                $scope.isOfferFormOpen = true;
            };

            var firstDelete = true;
            $scope.deleteOffer = function(offer) {
                if (firstDelete) {
                    firstDelete = false;
                } else {
                    offersService.delete($scope.offer.id, $scope.offer.secret).success(function() {
                        toastService.toast('Job offer deleted.');
                        $location.path('/offers');
                    }).error(function() {
                        toastService.toast('Can not delete. Did you forgot the secret ?')
                    });
                    firstDelete = true;
                }
            };

            $scope.pushOffRequirements = function(index) {
                $scope.offer.requirements.splice(index, 1);
            };

            $scope.sendOffer = function() {
                offersService.update($scope.offer.id, $scope.offer).success(function(data,err) {
                    toastService.toast('Job offer updated.');
                    $scope.isOfferFormOpen = false;
                }).error(function() {
                    toastService.toast('Something is wrong. Did you forgot the secret ?');
                })
            }
        }]
    )
;