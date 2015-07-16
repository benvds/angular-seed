'use strict';

angular.module('myApp.company.user', [
    'ui.router',
    'bmi.collection'
])
.config(function($stateProvider,
                 $urlRouterProvider)
{
    $stateProvider
    .state('root.companies.show.users', {
        'abstract': true,
        resolve: {
            users: function(UserService, company) {
                return UserService.all({
                    company: company
                });
            }
        },
        url: 'users/',
        template: '<ui-view />'
    })
    .state('root.users.index', {
        url: '',
        views: {
            '@': {
                controller: 'UsersIndexController',
                templateUrl: 'templates/users-index.html'
            }
        }
    });
})
.service('UserService', function(CollectionResource) {
    var RESOURCE_BASE_PATH = '/users/';
    var RESOURCE = new CollectionResource(RESOURCE_BASE_PATH);

    function all() {
        return RESOURCE.get();
    }

    return {
        all: all
    };
})
.controller('UsersIndexController', function($scope, users) {
    $scope.users = users;
})
;
