'use strict';

angular.module('flr.core')

    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'AccessLevels', 'APP_NAME',
        function ($stateProvider, $urlRouterProvider, $locationProvider, AccessLevels, AppName) {

            // Now set up the states
            $stateProvider
            // NESTED VIEWS! all states in different modules with app.
                .state('app', {
                    abstract: true,
                    // ui view will provide nested-views function - better than ng-view
                    template: '<ui-view/>'
                })
                // prefix will include this abstract state with layout.html
                .state('app.anon', {
                    abstract: true,
                    data: {
                        // Check with access service
                        access: AccessLevels.anon
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/core/views/layout-anon.html',
                            controller: 'mainController as mVM'
                        },
                        'navbar@app.anon': {
                            templateUrl: 'app/core/views/partials/anon.navbar.html',
                            controller: 'navbarController as navVM'
                        },
                        'footer@app.anon': {
                            templateUrl: 'app/core/views/partials/anon.footer.html',
                            controller: 'footerController as footerVM'
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
                        'content@app.anon': {
                            templateUrl: 'app/core/views/home.html',
                            controller: 'homeController as homeVm'
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
                        'content@app.anon': {
                            templateUrl: 'app/core/views/login.html',
                            controller: 'loginController as loginVm'
                        },
                        'navbar@app.anon': {}
                    }
                })
                .state('app.anon.signup', {
                    url: '/signup',
                    data: {
                        access: AccessLevels.anon,
                        pageTitle: AppName
                    },
                    views: {
                        'content@app.anon': {
                            templateUrl: 'app/core/views/signup.html',
                            controller: 'signupController as signVm'
                        },
                        'navbar@app.anon': {}
                    }
                })
                .state('app.anon.404', {
                    url: '/404',
                    data: {
                        access: AccessLevels.anon,
                        pageTitle: '404'
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/core/views/404.html',
                            controller: 'mainController as mVM'
                        }
                    }
                })
                .state('app.user', {
                    abstract: true,
                    data: {
                        access: AccessLevels.user
                    },
                    views: {
                        '@': {
                            templateUrl: 'app/core/views/layout-user.html',
                            controller: 'mainController as mVM'
                        },
                        'navbar@app.user': {
                            templateUrl: 'app/core/views/partials/user.navbar.html',
                            controller: 'navigationController as navVM'
                        },
                        'sidebar@app.user': {
                            templateUrl: 'app/core/views/partials/user.sidebar.html',
                            controller: 'sidebarController as sideVM'
                        }
                    }
                })
                .state('app.user.home', {
                    url: '/test', //temporary
                    data: {
                        access: AccessLevels.user,
                        pageTitle: AppName
                    },
                    views: {
                        'content@app.user': {
                            templateUrl: 'app/core/views/test.html'
                        }
                    }
                });
        }
    ]);
