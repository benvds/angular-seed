'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.company',
  'myApp.user',
  'myApp.session'
])
.config(function($provide,
                 $stateProvider,
                 $urlRouterProvider)
{
    // allows resolves to request the next state
    $provide.decorator('$state', function($delegate, $rootScope) {
        $rootScope.$on('$stateChangeStart', function(event, state, params) {
            console.log('state change start', arguments);
            $delegate.nextState = state;
            $delegate.nextParams = params;
        });
        return $delegate;
    });

    $stateProvider
    .state('root', {
        'abstract': true,
        resolve: {
            companies: function(CompanyService) {
                return CompanyService.all();
            },
            company: function(SessionService, companies) {
                var resourceParams = SessionService.resourceParams();
                return _.find(companies,
                    { id: resourceParams.filters.companyId });
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
