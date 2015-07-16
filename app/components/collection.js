'use strict';

function resolvedPromise() {
    var deferred =  $q.defer();
    deferred.resolve();
    return deferred.promise;
}


angular
.module('bmi.collection', [])
.factory('CollectionResource', function($timeout) {
    var users = [
        { id: 1, name: 'Bas', companyId: 1 },
        { id: 2, name: 'Ben', companyId: 1 },
        { id: 3, name: 'Bob', companyId: 2 }
    ];
    var basePath;

    function get(collectionParams) {
        if (basePath === '/users/') {
            return $timeout(function() {
                return users;
            }, 50);
        } else {
            resolvedPromise();
        }
    }

    return function(_basePath) {
        basePath = _basePath;

        return {
            get: get
        }
    };
})
// .service('CollectionService', function(CollectionResource) {
//
//     function resource(basePath) {
//         return new CollectionResource(basePath);
//     }
//
//     return {
//         resource: resource
//     };
// })
;
