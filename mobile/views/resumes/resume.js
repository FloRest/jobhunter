viewModule
    .controller('ResumeController', ['$scope', '$routeParams', 'resumesService', 'toastService', '$location',
        function($scope, $routeParams, resumesService, toastService, $location) {
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
            $scope.deleteResume = function() {
                if (firstDelete) {
                    firstDelete = false;
                } else {
                    console.log($scope.resume)
                    resumesService.delete($scope.resume.id, $scope.resume.secret).success(function() {
                        toastService.toast('Resume deleted.');
                        $location.path('/resumes');
                    }).error(function() {
                        toastService.toast('Can not delete. Did you forgot the secret ?')
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
