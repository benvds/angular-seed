'use strict';

angular.module('myApp.user', [
    'ui.router',
    'bmi.collection'
])
.config(function($stateProvider,
                 $urlRouterProvider)
{
    $stateProvider
    .state('root.users', {
        'abstract': true,
        url: 'users/',
        template: '<ui-view />'
    })
    .state('root.users.index', {
        url: '',
        resolve: {
            users: function($state, SessionService, UserService) {
                return UserService.all(SessionService.resourceParams($state.nextState.name));
            }
        },
        views: {
            '@': {
                controller: 'UsersIndexController',
                templateUrl: 'templates/users-index.html'
            }
        }
    })
    .state('root.users.show', {
        url: ':id',
        resolve: {
            user: function($stateParams, UserService, SessionService) {
                return UserService.get(Number($stateParams.id),
                    SessionService.resourceParams());
            }
        },
        views: {
            '@': {
                controller: 'UsersShowController',
                templateUrl: 'templates/users-show.html'
            }
        }
    });
})
.service('UserService', function($timeout) {
    var collection = [
        { id: 3, name: 'Bas', companyId: 1 },
        { id: 2, name: 'Bob', companyId: 2 },
        { id: 1, name: 'Ben', companyId: 1 }
    ];
    var FILTER_KEYS = ['companyId'];

    function all(params) {
        return $timeout(function() {
            if (!params) {
                return collection;
            } else {
                var queried = _.cloneDeep(collection);

                var filters = _.pick(params.filters || [], FILTER_KEYS);
                queried = _.filter(queried, filters);

                if (params.sort) {
                    queried = _.sortBy(queried, params.sort);
                }

                return queried;
            }
        }, 50);
    }

    function get(id, params) {
        return $timeout(function() {
            return _.find(collection, { id: id });
        }, 50);
    }

    return {
        all: all,
        get: get
    };
})
.controller('UsersIndexController', function($scope, $state, SessionService, users) {
    $scope.users = users;

    $scope.sort = function(attribute) {
        SessionService.sort($state.current.name, attribute);
    };
})
.controller('UsersShowController', function($scope,
                                                 SessionService,
                                                 user)
{
    $scope.user = user;
})
;
