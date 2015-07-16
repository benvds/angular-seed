'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.company',
  'myApp.user',
  'myApp.session'
])
.config(function($stateProvider,
                 $urlRouterProvider)
{
    $stateProvider
    .state('root', {
        'abstract': true,
        resolve: {
            companies: function(CompanyService) {
                return CompanyService.all();
            }
        },
        url: '/',
        views: {
            'session-panel': {
                controller: 'SessionPanelController',
                templateUrl: 'templates/session-panel.html'
            }
        }
    });
})
.run(function($rootScope, $window) {
    $rootScope.$on('$stateChangeError',
                   $window.console.error.bind($window.console));
})
;
