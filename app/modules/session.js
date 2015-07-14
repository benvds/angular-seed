'use strict';

angular.module('myApp.session', [])
.controller('SessionPanelController', function($scope, companies) {
    $scope.companies = companies;
    $scope.company = undefined;
})
;
