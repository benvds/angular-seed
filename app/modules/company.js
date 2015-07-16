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
            companies: function(CompanyService, SessionService) {
                return CompanyService.all(SessionService.resourceParams());
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

    function all(params) {
        return $timeout(function() {
            if (!params) {
                return collection;
            } else {
                return _.sortBy(collection, params.sort);
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
                                                 SessionService,
                                                 companies)
{
    $scope.companies = companies;

    $scope.sort = function(attribute) {
        SessionService.sort(attribute);
    };
})
.controller('CompaniesShowController', function($scope,
                                                 SessionService,
                                                 company)
{
    $scope.company = company;
})
;
