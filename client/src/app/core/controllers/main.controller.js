'use strict';

angular.module('flr.core')
    .controller('mainController',
        function ($scope, $rootScope) {

            // Remove the splash screen
            $scope.$on('$viewContentAnimationEnded', function (event) {
                if (event.targetScope.$id === $scope.$id) {
                    $rootScope.$broadcast('splashScreen::remove');
                }
            });
        });
