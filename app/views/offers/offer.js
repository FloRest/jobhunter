viewModule
    .controller('OfferController', ['$scope', '$routeParams', 'offersService', 'toastService',
        function($scope, $routeParams, offersService, toastService) {

            $scope.loading = true;

            offersService.get($routeParams.id).then(function(data) {
                $scope.offer = data.data;
                $scope.loading = false;

            });

            $scope.updateClick = function() {
                $scope.isOfferFormOpen = true;
            };

            var firstDelete = true;
            $scope.deleteOffer = function() {
                if (firstDelete) {
                    firstDelete = false;
                } else {
                    $scope.offer.secret = $scope.secretDelete;
                    offersService.delete($scope.offer.id, $scope.offer).success(function() {

                    }).error(function() {

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