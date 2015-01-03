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
});