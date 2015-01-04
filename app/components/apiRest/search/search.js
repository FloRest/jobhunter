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
;