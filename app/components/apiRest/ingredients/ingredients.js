'use strict';

apiService
    .factory('ingredientsService', function($http) {
        var url = CONFIG.api.route + '/ingredients';

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
            }
        };
    })
;