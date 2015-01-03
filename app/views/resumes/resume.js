viewModule
    .controller('ResumeController', ['$scope', '$routeParams', 'resumesService', 'toastService',
        function($scope, $routeParams, resumesService, toastService) {
            $scope.loading = true;

            resumesService.get($routeParams.id).then(function(data) {
                $scope.resume = data.data;
                $scope.loading = false;
            });

            $scope.cancelResume = function() {
                $scope.isResumeFormOpen = false;
            };

            $scope.updateClick = function() {
                $scope.isResumeFormOpen = true;
            };

            $scope.pushOff = function(name, index) {
                $scope.resume[name].splice(index, 1);
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

            $scope.sendResume = function() {
                resumesService.update($scope.resume.id, $scope.resume).success(function(data,err) {
                    toastService.toast('Resume updated.');
                    $scope.isOfferFormOpen = false;
                }).error(function() {
                    toastService.toast('Something is wrong. Did you forgot the secret ?');
                })
            }
        }]
    )
;
