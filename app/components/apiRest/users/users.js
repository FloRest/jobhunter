'use strict';

apiService
    .factory('usersService', function($http, authService) {
        var url = CONFIG.api.route + '/users';
        var urlUser = CONFIG.api.route + '/user';

        return {
            create: function (data) {
                return $http.post(url, data);
            },
            get: function (id) {
                return $http.get(url+'/'+id);
            },
            follow: function (idToFollow) {
                var currentUser = authService.currentUser();
                return $http.post(url+'/'+idToFollow+'/follow', {}, {
                    headers: {
                        'X-API-user' : currentUser.id,
                        'X-API-token' : currentUser.token
                    }
                });
            },
            unfollow: function (idToUnfollow) {
                var currentUser = authService.currentUser();
                return $http.post(url+'/'+idToUnfollow+'/unfollow', {}, {
                    headers: {
                        'X-API-user' : currentUser.id,
                        'X-API-token' : currentUser.token
                    }
                });
            },
            getFollowers: function (idUser, param) {
                var params = {};
                if (param)
                    params = param;
                return $http.get(url+'/'+idUser+'/followers', {
                    params: params
                });
            },
            getFollowing: function (idUser, param) {
                var params = {};
                if (param)
                    params = param;
                return $http.get(url+'/'+idUser+'/following', {
                    params: params
                });
            },
            getCurrentUserFeed: function () {
                var currentUser = authService.currentUser();
                return $http.get(urlUser + '/feed', {
                    headers: {
                        'X-API-user': currentUser.id,
                        'X-API-token': currentUser.token
                    }
                });
            },
            getUserFeed: function (id, param) {
                var params = {};
                if (param)
                    params = param;
                return $http.get(urlUser+'/'+id+'/feed', {
                    params: param
                });
            }
        };
    })
;
