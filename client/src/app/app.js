(function() {
    'use strict';

    angular.module('flr', [
            'ui.router',
            'ngResource',
            'ngAnimate',
            'ngMessages',
            'ngMaterial',
            'satellizer',

            //shared modules
            'flr.config',
            'flr.core'

            // other modules will be lazy-loaded from router (fe. flr.admin if user is admin)
        ])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$provide', '$httpProvider', '$authProvider', 
            function($stateProvider, $urlRouterProvider, $locationProvider, $provide, $httpProvider, $authProvider) {

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
                
                // Satellizer config
                $authProvider.baseUrl = '/';
                $authProvider.loginUrl =  'api/Users/login';
                $authProvider.signupUrl = 'api/Users';
                $authProvider.tokenName = 'id';
                $authProvider.loginOnSignup = false; //turn off automatically login after register

                // // Facebook
                // $authProvider.facebook({
                //     name: 'facebook',
                //     url: '/auth/facebook',
                //     authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
                //     redirectUri: window.location.origin + '/',
                //     requiredUrlParams: ['display', 'scope'],
                //     scope: ['email'],
                //     scopeDelimiter: ',',
                //     display: 'popup',
                //     oauthType: '2.0',
                //     popupOptions: { width: 580, height: 400 }
                // });
            }
        ]);
})();
