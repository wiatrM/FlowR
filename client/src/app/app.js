(function() {
    'use strict';

    angular.module('flr', [
            'ui.bootstrap',
            'ui.router',
            'ngResource',
            'ngAnimate',
            'satellizer',

            //shared modules
            'flr.config',
            'flr.core'

            // other modules will be lazy-loaded from router (fe. flr.admin if user is admin)
        ])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$provide', '$httpProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider, $provide, $httpProvider) {

                // Now set up the states
                $stateProvider
                    // NESTED VIEWS! all states in different modules with app. prefix will include this abstract state with layout.html
                    .state('app', {
                        abstract: true,
                        templateUrl: '/app/core/views/layout.html' // layout template
                    });
                $urlRouterProvider.otherwise("/404");
                $locationProvider.html5Mode(true);

                // error handling

                $provide.factory('ErrorInterceptor', ['$q', function($q) {
                    return {
                        responseError: function(rejection) {
                            console.error(rejection.data.code + ': ' + rejection.data.message);
                            return $q.reject(rejection);
                        }
                    };
                }]);

                $httpProvider.interceptors.push('ErrorInterceptor');
            }
        ]);
})();
