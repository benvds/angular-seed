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

    function sort(attribute) {
        SessionStorageAdapter.set('sort', attribute);
        reloadState();
    }

    function resourceParams() {
        return {
            sort: SessionStorageAdapter.get('sort')
        };
    }

    return {
        sort: sort,
        resourceParams: resourceParams
    };
})
.controller('SessionPanelController', function($scope, companies) {
    $scope.companies = companies;
    $scope.company = undefined;
})
;
