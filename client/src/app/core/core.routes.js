'use strict';

angular.module('flr.core')

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'AccessLevels', 'APP_NAME',
        function ($stateProvider, $urlRouterProvider, $locationProvider, AccessLevels, AppName) {

            $stateProvider
                .state('app.anon', {
                    abstract: true,
                    // ui view will provide nested-views function - better than ng-view
                    data: {
                        // Check with access service
                        access: AccessLevels.anon
                    },
                    views: {
                        'main@': {
                            templateUrl: 'app/core/views/layout.html'
                        },
                        'navbar@app': {
                            templateUrl: 'app/core/views/partials/anon.navbar.html',
                            controller: 'navbarController'
                        },
                        'sidebar@app': {
                            templateUrl: 'app/core/views/partials/anon.sidebar.html',
                            controller: 'sidebarController'
                        },
                        'footer@app': {
                            templateUrl: 'app/core/views/partials/anon.footer.html',
                            controller: 'footerController'
                        }
                    }
                })
                .state('app.anon.home', {
                    url: '/',
                    data: {
                        access: AccessLevels.anon,
                        pageTitle: AppName
                    },
                    views: {
                        'content@app': {
                            templateUrl: 'app/core/views/test.html'
                        }
                    }
                })
                .state('app.anon.login', {
                    url: '/login',
                    data: {
                        access: AccessLevels.anon,
                        pageTitle: AppName
                    },
                    views: {
                        'content@app': {
                            templateUrl: 'app/core/views/login.html',
                            controller: 'loginController as loginVm'
                        }
                    }
                })
                .state('app.anon.signup', {
                    url: '/signup',
                    data: {
                        access: AccessLevels.anon,
                        pageTitle: AppName
                    },
                    views: {
                        'content@app': {
                            templateUrl: 'app/core/views/signup.html',
                            controller: 'signupController as signVm'
                        }
                    }
                })
                .state('app.anon.404', {
                    url: '/404',
                    preload: true,
                    data: {
                        access: AccessLevels.anon,
                        pageTitle: '404'
                    },
                    views: {
                        'content@app': {
                            templateUrl: 'app/core/views/404.html'
                        }
                    }
                });
        }
    ]);
