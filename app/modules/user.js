'use strict';

angular.module('myApp.user', [
    'ui.router'
])
.config(function($stateProvider,
                 $urlRouterProvider)
{
    $stateProvider
    .state('root.users', {
        'abstract': true,
        resolve: {
            users: function(UserService) {
                return UserService.all();
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
.service('UserService', function($timeout) {
    function all() {
        return $timeout(function() {
            return [
                { id: 1, name: 'Bas' },
                { id: 2, name: 'Ben' },
                { id: 3, name: 'Bob' }
            ];
        }, 50);
    }

    return {
        all: all
    };
})
.controller('UsersIndexController', function($scope, users) {
    $scope.users = users;
})
;

