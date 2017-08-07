'use strict';

angular.module('flr.core')

    .config(['$mdThemingProvider',
        function ($mdThemingProvider) {

            /* Default Indigo-Pink theme*/
            $mdThemingProvider.theme('default')
                .primaryPalette('indigo')
                .accentPalette('pink')
                .warnPalette('red')
                .backgroundPalette('grey');

            $mdThemingProvider.theme('purple-green')
                .primaryPalette('purple')
                .accentPalette('green')
                .warnPalette('red')
                .backgroundPalette('grey');

            $mdThemingProvider.theme('home')
                .primaryPalette('green')
                .accentPalette('amber')
                .warnPalette('red')
                .backgroundPalette('grey');

            $mdThemingProvider.theme('indigo-blue-grey')
                .primaryPalette('indigo')
                .accentPalette('blue-grey')
                .warnPalette('red')
                .backgroundPalette('grey');

            $mdThemingProvider.setDefaultTheme('default');
            $mdThemingProvider.alwaysWatchTheme(true);
        }
    ]);
