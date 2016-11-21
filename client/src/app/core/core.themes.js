'use strict';

angular.module('flr.core')
    
    .config(['$mdThemingProvider',
        function ($mdThemingProvider) {

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

        }
    ]);
