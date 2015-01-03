angular.module('huntaxuiba.toastService', ['ngMaterial'])
    .factory('toastService', function($http, $mdToast) {
        return {
            toast : function(text) {
                $mdToast.show({template:"<md-toast>"+text+"</md-toast>", position:'top right'});
            }
        }
    });
