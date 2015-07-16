'use strict';

angular.module('myApp.session', [])
.service('SessionStorageAdapter', function($window) {

    var store = $window.sessionStorage;

    function get(key) {
        return angular.fromJson(store.getItem(key));
    }

    function set(key, value) {
        return store.setItem(key, angular.toJson(value));
    }

    function clear() {
        return store.clear();
    }

    return {
        get: get,
        set: set,
        clear: clear
    };
})
.service('SessionService', function($state,
                                    $stateParams,
                                    SessionStorageAdapter)
{
    // TODO(benvds): make distinction between sessionFilters & route params

    function reloadState() {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    // falls back to empty object
    function getStorageObject(key) {
        return SessionStorageAdapter.get(key) || {};
    }


    function resourceParams(stateName) {
        var sorts = getStorageObject('sorts');
        var globalFilters = getStorageObject('globalFilters');
        var routeFilters = getStorageObject('routeFilters');

        return {
            sort: sorts[stateName],
            filters: _.merge({}, globalFilters, routeFilters[stateName])
        };
    }

    function sort(stateName, attribute) {
        var sorts = getStorageObject('sorts');
        sorts[stateName] = attribute;
        SessionStorageAdapter.set('sorts', sorts);

        reloadState();
    }

    function setGlobalFilters(globalFilters) {
        var filters = getStorageObject('globalFilters');

        SessionStorageAdapter.set('globalFilters',
            _.merge(filters, globalFilters));
        reloadState();
    }

    function setRouteFilters(route, routeFilters) {
        var filters = getStorageObject('routeFilters');
        filters[route] = routeFilters;

        SessionStorageAdapter.set('routeFilters', filters);
        reloadState();
    }

    function clearGlobalFilters() {
        // clears both global & route filters
        SessionStorageAdapter.clear();
        reloadState();
    }

    function clearRouteFilters(route) {
        return function() {
            setRouteFilters(route, {});
        }
    }

    return {
        resourceParams: resourceParams,
        sort: sort,
        globalFilters: setGlobalFilters,
        routeFilters: setRouteFilters,
        clearGlobalFilters: clearGlobalFilters,
        clearRouteFilters: clearRouteFilters
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
        SessionService.globalFilters({
            companyId: company.id
        });
    };

    $scope.clear = SessionService.clearGlobalFilters;
})
;
