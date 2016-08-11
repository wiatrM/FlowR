'use strict';

angular.module('flr.core')
    .controller('loginController',
        function ($scope, $uibModal, $log, $resource, $location, $http) {

            $scope.errorMsg = null; //error message - null to hide
            $scope.divShow = 'login'; //default show login

            //test function
            $scope.klik = function() {
                console.log("motion personified alpha ");

                $scope.errorMsg = 'Wrong username or password!'; //for login error
            };

            $scope.remindOpen = function () {
                $scope.divShow = 'remind';
            };

            $scope.registerOpen = function () {
                $scope.divShow = 'register';
            };

            $scope.loginOpen = function () {
                $scope.divShow = 'login';
            };

    });
