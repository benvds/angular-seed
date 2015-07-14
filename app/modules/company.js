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
        views: {
            '@': {
                controller: 'CompaniesIndexController',
                templateUrl: 'templates/companies-index.html'
            }
        }
    });
})
.service('CompanyService', function($timeout) {
    function all() {
        return $timeout(function() {
            return [
                { id: 1, name: 'Karate Corp.' },
                { id: 2, name: 'Indigo Industries' },
                { id: 3, name: 'Sonny & Sons' }
            ];
        }, 50);
    }

    return {
        all: all
    };
})
.controller('CompaniesIndexController', function($scope, companies) {
    $scope.companies = companies;
})
;


