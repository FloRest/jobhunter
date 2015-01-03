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
;