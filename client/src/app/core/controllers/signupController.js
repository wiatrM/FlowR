'use strict';

angular.module('flr.core')
    .controller('signupController',
        function ($scope, $mdDialog) {

            $scope.cancelRegister = function() {
                $mdDialog.cancel();
            };
            
        });
