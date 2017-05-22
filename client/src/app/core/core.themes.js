'use strict';

angular.module('flr.core')

    .config(['$mdThemingProvider',
        function ($mdThemingProvider) {

            $mdThemingProvider.definePalette('app-blue', {
                '50': 'e8eaf6',
                '100': 'c5cbe9',
                '200': '9fa8da',
                '300': '7985cb',
                '400': '5c6bc0',
                '500': '3f51b5',
                '600': '394aae',
                '700': '3140a5',
                '800': '29379d',
                '900': '1b278d',
                'A100': 'c6cbff',
                'A200': '939dff',
                'A400': '606eff',
                'A700': '4757ff',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': [
                    '50',
                    '100',
                    '200',
                    '300',
                    'A100',
                    'A200'
                ],
                'contrastLightColors': [
                    '400',
                    '500',
                    '600',
                    '700',
                    '800',
                    '900',
                    'A400',
                    'A700'
                ]
            });

            $mdThemingProvider.definePalette('app-blueGrey', {
                '50': 'e9ebec',
                '100': 'c7ced1',
                '200': 'a2adb2',
                '300': '7d8c93',
                '400': '61737b',
                '500': '455a64',
                '600': '3e525c',
                '700': '364852',
                '800': '2e3f48',
                '900': '1f2e36',
                'A100': '7dcdff',
                'A200': '4abaff',
                'A400': '17a7ff',
                'A700': '009cfc',
                'contrastDefaultColor': 'light',
                'contrastDarkColors': [
                    '50',
                    '100',
                    '200',
                    '300',
                    'A100',
                    'A200',
                    'A400'
                ],
                'contrastLightColors': [
                    '400',
                    '500',
                    '600',
                    '700',
                    '800',
                    '900',
                    'A700'
                ]
            });

            $mdThemingProvider.theme('default')
                .primaryPalette('app-blue')
                .accentPalette('app-blueGrey');

        }
    ]);
