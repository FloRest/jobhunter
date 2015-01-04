viewModule
    .controller('ResumesController', ['$scope', '$routeParams', 'resumesService', 'toastService', '$location', 'searchService',
        function($scope, $routeParams, resumesService, toastService, $location, searchService) {

            $scope.loading = true;
            $scope.resumes=[];

            $scope.pushOff = function(name, index) {
                $scope.resume[name].splice(index, 1);
            };


            $scope.initResume = function() {
                $scope.resume = {};
                $scope.resume.language = [''];
                $scope.resume.skills = [''];
                $scope.resume.experiences = [''];
                $scope.resume.hobbies = [''];
                $scope.resume.studies = [''];
                $scope.resume.diploms = [''];
                $scope.resume.cities = [''];
            };

            $scope.initResume();
            $scope.sendResume = function() {
                resumesService.create($scope.resume).success(function(data, err) {
                    $scope.resumes.push(data);
                    toastService.toast('You successfully created your resume !');
                    $scope.isResumeFormOpen = false;
                    $scope.initResume();
                }).error(function() {
                    toastService.toast('Something is wrong. Check the fields.');
                });
            };

            $scope.$on('search', function(event, search) {
                if (!search)
                    return;
                if (search.type == 'resumes') {
                    $scope.loading = true;
                    searchService.basicSearch(search.type, search.text).success(function(data) {
                        $scope.resumes = data.hits;
                        $scope.loading = false;
                    });
                }
            });

            $scope.$on('resumes', function(event, args) {
                $scope.loading = true;
                resumesService.getAll().success(function(data){
                    $scope.resumes = data.hits;
                    $scope.loading = false;
                });
            });

            var search = searchService.getSearch();
            if (search) {
                searchService.basicSearch(search.type, search.text).success(function(data) {
                    $scope.resumes = data.hits;
                    $scope.loading = false;
                });
                searchService.setSearch(null);
            }else {
                resumesService.getAll().success(function(data){
                    $scope.resumes = $scope.resumes.concat(data.hits);
                    $scope.loading = false;
                });
            }

            $scope.routeTo = function(route) {
                $location.path('/'+route);
                return false;
            };

        }]
    )
;