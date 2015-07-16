'use strict';

angular.module('myApp.session', [])
.service('SessionStorageAdapter', function($window) {

    var store = $window.sessionStorage;

    function get(key) {
        return store.getItem(key);
    }

    function set(key, value) {
        return store.setItem(key, value);
    }

    return {
        get: get,
        set: set
    };
})
.service('SessionService', function($state,
                                    $stateParams,
                                    SessionStorageAdapter)
{
    function reloadState() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    function resourceParams(stateName) {

        var sorts = angular.fromJson(SessionStorageAdapter.get('sorts') || '{}');
        var filters = angular.fromJson(SessionStorageAdapter.get('filters') || '{}');

        return {
            sort: sorts[stateName],
            filters: filters
        };
    }

    function sort(stateName, attribute) {
        var sorts = angular.fromJson(SessionStorageAdapter.get('sorts') || '{}')
        sorts[stateName] = attribute;
        SessionStorageAdapter.set('sorts', angular.toJson(sorts));

        reloadState();
    }

    function filters(filters) {
        // TODO overwrite filters
        SessionStorageAdapter.set('filters', angular.toJson(filters));
        reloadState();
    }

    return {
        resourceParams: resourceParams,
        sort: sort,
        filters: filters
    };
})
.controller('SessionPanelController', function($scope,
                                               SessionService,
                                               companies,
                                               company)
{
    $scope.companies = companies;
    $scope.company = company;

    $scope.updateCompany = function(company) {
        console.log('company selected', company);
        SessionService.filters({
            companyId: company.id
        });
    };
})
;
