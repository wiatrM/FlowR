'use strict';

angular.module('flr.core')
    .directive('splashScreen',
        function ($animate) {
            return {
                restrict: 'E',
                link: function (scope, iElement) {
                    var splashScreenRemoveEvent = scope.$on('splashScreen::remove', function () {
                        $animate.leave(iElement).then(function () {
                            splashScreenRemoveEvent();
                            scope = iElement = null;
                        });
                    });
                }
            };
        });
