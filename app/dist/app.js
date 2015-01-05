'use strict';

angular.module('huntaxuiba.authService', [])

.factory('authService', function($http, $rootScope) {
    var rank = {
        auth : [
            {
                name:'Profile',
                route:'profile'
            },
            {
                name:'Feed',
                route:'feed'
            },
            {
                name:'Recipes',
                route:'recipes'
            },
            {
                name:'Parameters',
                route:'parameters'
            },
            {
                name:'Sign Out',
                route:'signout',
                action:'signout'
            }
        ],
        anonym : [
            {
                name:'SignIn',
                route:'signin'
            },
            {
                name:'SignUp',
                route:'signup'
            }
        ]
    };
    var currentUser = {};
    currentUser.routes = _.clone(rank.anonym);

    return {
        login: function(email, password) {
            var data = {
                email:email,
                password:password
            };

            var http = $http({ method: 'POST', url: CONFIG.api.route+'/login', data:data });
            http.
                success(function (data, status, headers, config) {
                    for(var key in data) {
                        if(data.hasOwnProperty(key)) {
                            currentUser[key] = _.clone(data[key]);
                        }
                    }
                    currentUser.routes.splice(0,currentUser.routes.length);
                    currentUser.routes = _.clone(rank.auth);
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                })
            ;
            return http;
        },
        logout: function() {
            for (var key in currentUser) {
                if(currentUser.hasOwnProperty(key))
                    delete currentUser[key];
            }
            currentUser.routes = _.clone(rank.anonym);
        },
        isLoggedIn: function() {
            return !_.isEmpty(currentUser);
        },
        currentUser: function() {
            return currentUser;
        },
        getToken: function() {
            return currentUser.token;
        },
        getRanks: function() {
            return rank;
        },
        getRank: function(name) {
            return rank[name];
        },
        refreshUser: function() {
            $http.get(CONFIG.api.route + '/user',{
                headers: {
                    'X-API-user': currentUser.id,
                    'X-API-token': currentUser.token
                }
            }).success(function (data) {
                for(var key in data) {
                    if(data.hasOwnProperty(key)) {
                        currentUser[key] = _.clone(data[key]);
                    }
                }
            })
        }
    };
});;
'use strict';

var apiService = angular.module('huntaxuiba.apiService', ['huntaxuiba.authService']);;
apiService
    .factory('offersService', function($http) {
        var url = CONFIG.api.route + '/offers';

        return {
            create: function (data) {
                return $http.post(url, data);
            },
            get: function (id) {
                return $http.get(url+'/'+id);
            },
            update: function (id, data) {
                return $http.put(url+'/'+id, data);
            },
            getAll: function (param) {
                var params = {};
                if (param)
                    params = param;
                return $http.get(url, {
                    params: params
                });
            },
            delete: function (id, secret) {
                return $http.delete(url+'/'+id+'?secret='+secret)
            }
        };
    })
;;
apiService
    .factory('resumesService', function($http) {
        var url = CONFIG.api.route + '/resumes';

        return {
            create: function (data) {
                return $http.post(url, data);
            },
            get: function (id) {
                return $http.get(url+'/'+id);
            },
            update: function (id, data) {
                return $http.put(url+'/'+id, data);
            },
            getAll: function (param) {
                var params = {};
                if (param)
                    params = param;
                return $http.get(url, {
                    params: params
                });
            },
            delete: function (id, secret) {
                return $http.delete(url+'/'+id+'?secret='+secret)
            }
        };
    })
;;
apiService
    .factory('searchService', function($http, $rootScope) {

        var url = CONFIG.api.route + '/';
        var lastSearch = [];
        var search = null;

        return {
            basicSearch: function(where, query) {
                var http = $http.get(url + where+'?q='+query);
                http.success(function(data) {
                    lastSearch[where] = data;
                });
                return http;
            },
            getLastSearch:function(name) {
                return lastSearch[name];
            },
            setSearch:function(s){
                search = s;
            },
            getSearch:function() {
                return search;
            }
        }
    })
;;
angular.module("toggle-switch",["ng"]).directive("toggleSwitch",function(){return{restrict:"EA",replace:!0,require:"ngModel",scope:{disabled:"@",onLabel:"@",offLabel:"@",knobLabel:"@"},template:'<div role="radio" class="toggle-switch" ng-class="{ \'disabled\': disabled }"><div class="toggle-switch-animate" ng-class="{\'switch-off\': !model, \'switch-on\': model}"><span class="switch-left" ng-bind="onLabel"></span><span class="knob" ng-bind="knobLabel"></span><span class="switch-right" ng-bind="offLabel"></span></div></div>',link:function(scope,element,attrs,ngModelCtrl){attrs.onLabel||(attrs.onLabel="On"),attrs.offLabel||(attrs.offLabel=""),attrs.knobLabel||(attrs.knobLabel=" "),attrs.disabled||(attrs.disabled=!1),element.on("click",function(){scope.$apply(scope.toggle)}),ngModelCtrl.$formatters.push(function(modelValue){return modelValue}),ngModelCtrl.$parsers.push(function(viewValue){return viewValue}),ngModelCtrl.$render=function(){scope.model=ngModelCtrl.$viewValue},scope.toggle=function(){scope.disabled||(scope.model=!scope.model,ngModelCtrl.$setViewValue(scope.model))}}}});;
angular.module('huntaxuiba.toastService', ['ngMaterial'])
    .factory('toastService', function($http, $mdToast) {
        return {
            toast : function(text) {
                $mdToast.show({template:"<md-toast>"+text+"</md-toast>", position:'top right'});
            }
        }
    });
;
'use strict';

var CONFIG = {};
CONFIG.api = {
  endpoint : "http://huntaxuiba.biz.tm",
  port : "1338"
};
CONFIG.api.route = CONFIG.api.endpoint + ':' + CONFIG.api.port;


// Declare app level module which depends on views, and components
angular.module('huntaxuiba', [
  'ngRoute',
  'ngResource',
  'ngMaterial',
  'ngFx',
  'huntaxuiba.authService',
  'huntaxuiba.apiService',
  'huntaxuiba.toastService',
  'huntaxuiba.views',
  'ui.bootstrap'
]).
controller('LayoutController', function($scope, $mdSidenav, $location,searchService, $rootScope) {
  $scope.openLeftMenu = function() {
    if (!$mdSidenav('left').isOpen())
      $mdSidenav('left').open();
  };
  $scope.routeTo = function(route) {
    $rootScope.$broadcast(route);
    $location.path('/'+route);
      $mdSidenav('left').close();
    $scope.search.text = '';
  };

  $scope.openSideNav = function(bool) {
    var isOpen = $mdSidenav('left').isOpen();
    if (bool == !isOpen) {
      $mdSidenav('left').toggle(bool);
    }
  };

  $scope.search = {};
  $scope.search.type = 'offers';
  $scope.searchAction = function() {
    searchService.setSearch($scope.search);
    $rootScope.$broadcast('search', $scope.search);
    $location.path('/'+$scope.search.type);
  }
}).
run(['$rootScope', function($rootScope) {
      $rootScope.$on('$routeChangeStart', function (event, next, current) {

      });
      $rootScope.$on('$viewContentLoaded', function (event, next, current) {
        var el = document.getElementById("mainHeader-wrapper");
        
        if (!el || el.style.background)
          return;
        el.style.background = "url(http://lorempixel.com/" + el.clientWidth + "/" + el.clientHeight + ")";
        var child = document.getElementById("mainHeader");
        console.log(document.documentElement.clientHeight, (child.clientHeight + 64))
        if (document.documentElement.clientHeight < (child.clientHeight + 64))
          return;
        el.style.paddingTop = (+(el.clientHeight) / 2 - (+(child.clientHeight) / 2)) + "px";
      });
    }])
;
;
'use strict';

var viewModule = angular.module('huntaxuiba.views', ['ngRoute', 'ngMaterial', 'huntaxuiba.apiService'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'views/search/search.html',
            controller: 'SearchController'
        });

        $routeProvider.when('/resumes', {
            templateUrl: 'views/resumes/resumes.html',
            controller: 'ResumesController'
        });

        $routeProvider.when('/offers', {
            templateUrl: 'views/offers/offers.html',
            controller: 'OffersController'
        });

        $routeProvider.when('/offer/:id', {
            templateUrl: 'views/offers/offer.html',
            controller: 'OfferController'
        });


        $routeProvider.when('/resume/:id', {
            templateUrl: 'views/resumes/resume.html',
            controller: 'ResumeController'
        });

        $routeProvider.when('/parameters', {

        });

        $routeProvider.otherwise({redirectTo: '/search'});
    }])
;;
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
;;
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
;;
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
;
viewModule
    .controller('OffersController', ['$scope', '$routeParams', 'offersService', 'toastService', '$location', 'searchService',
        function($scope, $routeParams, offersService, toastService, $location, searchService) {
            $scope.offer = {};
            $scope.offer.company = {};
            $scope.offer.requirements = [''];
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

            $scope.$on('offers', function(event, args) {
                $scope.loading = true;
                offersService.getAll().success(function(data){
                    $scope.offers = data.hits;
                    $scope.loading = false;
                });
            });

            $scope.$on('search', function(event, search) {
                if (!search)
                return;
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

;
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