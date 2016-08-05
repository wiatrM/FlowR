'use strict';

angular.module('flr.core')

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'AccessLevels', 'APP_NAME',
    function($stateProvider, $urlRouterProvider, $locationProvider, AccessLevels, AppName) {

        $stateProvider

            .state('app.anon', {
                abstract: true,
                // ui view will provide nested-views function - better than ng-view
                template: '<ui-view/>',
                data: {
                    // Check with access service
                    access: AccessLevels.anon
                }
            })
            .state('app.anon.home', {
                url: "/",
                templateUrl: "app/core/views/test.html",
                data: {
                    access: AccessLevels.anon,
                    pageTitle: AppName
                }
            })

        .state('app.anon.404', {
            url: '/404',
            //templateUrl: "app/core/views/404.html",
            data: {
                access: AccessLevels.anon,
                pageTitle: '404'
            }
        });
    }
]);
