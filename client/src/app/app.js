(function() {
    'use strict';

    angular.module('flr', [
            'ui.router',
            'ngResource',
            'ngAnimate',
            'ngMaterial',
            'satellizer',

            //shared modules
            'flr.config',
            'flr.core'

            // other modules will be lazy-loaded from router (fe. flr.admin if user is admin)
        ])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$provide', '$httpProvider', '$authProvider', '$mdThemingProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider, $provide, $httpProvider, $authProvider, $mdThemingProvider) {

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

                /**
                 * Themes
                 */
                $mdThemingProvider.definePalette('app-blue', $mdThemingProvider.extendPalette('blue', {
                    '50': '#DCEFFF',
                    '100': '#AAD1F9',
                    '200': '#7BB8F5',
                    '300': '#4C9EF1',
                    '400': '#1C85ED',
                    '500': '#106CC8',
                    '600': '#0159A2',
                    '700': '#025EE9',
                    '800': '#014AB6',
                    '900': '#013583',
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': '50 100 200 A100',
                    'contrastStrongLightColors': '300 400 A200 A400'
                }));
                $mdThemingProvider.definePalette('app-light-blue', $mdThemingProvider.extendPalette('indigo', {
                    'A200': '#40C4FF'
                }));
                $mdThemingProvider.theme('default')
                    .primaryPalette('app-blue')
                    .accentPalette('app-light-blue');

                $authProvider.baseUrl = '/';
                $authProvider.loginUrl =  'api/Users/login';
                $authProvider.signupUrl = 'api/Users';
                $authProvider.tokenName = 'id';

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
