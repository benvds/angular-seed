'use strict';

angular.module('myApp.company', [
    'ui.router'
])
.config(function($stateProvider,
                 $urlRouterProvider)
{
    $stateProvider
    .state('root.companies', {
        'abstract': true,
        url: 'companies/',
        template: '<ui-view />'
    })
    .state('root.companies.index', {
        url: '',
        resolve: {
            companies: function($state, CompanyService, SessionService) {
                return CompanyService.all(SessionService.resourceParams($state.nextState.name));
            }
        },
        views: {
            '@': {
                controller: 'CompaniesIndexController',
                templateUrl: 'templates/companies-index.html'
            }
        }
    })
    .state('root.companies.show', {
        url: ':id',
        resolve: {
            company: function($stateParams, CompanyService, SessionService) {
                return CompanyService.get(Number($stateParams.id),
                                          SessionService.resourceParams());
            },
            users: function($state, SessionService, UserService) {
                return UserService.all(SessionService.resourceParams($state.nextState.name));
            }
        },
        views: {
            '@': {
                controller: 'CompaniesShowController',
                templateUrl: 'templates/companies-show.html'
            }
        }
    });

    $urlRouterProvider
        .when('', '/companies/')
        .when('/', '/companies/');
})
.service('CompanyService', function($timeout) {

    var collection = [
        { id: 1, name: 'Karate Corp.' },
        { id: 3, name: 'Sonny & Sons' },
        { id: 2, name: 'Indigo Industries' }
    ];
    var FILTER_KEYS = [];

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
.controller('CompaniesIndexController', function($scope,
                                                 $state,
                                                 SessionService,
                                                 companies)
{
    $scope.companies = companies;

    $scope.sort = function(attribute) {
        SessionService.sort($state.current.name, attribute);
    };
})
.controller('CompaniesShowController', function($scope,
                                                 SessionService,
                                                 company,
                                                 users)
{
    $scope.company = company;
    $scope.users = users;
})
;
