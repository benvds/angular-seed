'use strict';

angular
.module('bmi.session', [])
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
.service('SessionService', function(SessionStorageAdapter) {

    function sort(attribute) {
        SessionStorageAdapter.set('sort', attribute);

    }

    return {
        sort: sort
    };
})
;
