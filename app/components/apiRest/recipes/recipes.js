'use strict';

apiService
    .factory('recipesService', function($http, authService) {
        var url = CONFIG.api.route + '/recipes';
        var currentUser = authService.currentUser();

        return {
            create: function (data) {
                return $http.post(url, data, {
                    headers: {
                        'X-API-user': currentUser.id,
                        'X-API-token': currentUser.token
                    }
                });
            },
            getRecipe: function (id) {
                return $http.get(url+'/'+id);
            },
            getRecipes: function() {
                return $http.get(url);
            },
            update: function (id, data) {
                return $http.put(url+'/'+id, data);
            },
            comment: function (idRecipe, data) {
                return $http.post(url+'/'+idRecipe+'/comment?limit=150', data, {
                    headers: {
                        'X-API-user': currentUser.id,
                        'X-API-token': currentUser.token
                    }
                });
            },
            getComments: function (idRecipe) {
                return $http.get(url+'/'+idRecipe+'/comments');
            }
        };
    })
;