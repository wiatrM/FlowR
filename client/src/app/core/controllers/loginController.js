'use strict';

angular.module('flr.core')
    .controller('loginController',
        function ($scope, AuthService, $window, $rootScope, $auth, $log, $resource, $location, $http) {

            $scope.errorMsg = null; //error message - null to hide
            $scope.divShow = 'login'; //default show login

            $scope.remindOpen = function () {
                $scope.divShow = 'remind';
            };

            $scope.registerOpen = function () {
                $scope.divShow = 'register';
            };

            $scope.loginOpen = function () {
                $scope.divShow = 'login';
            };

            $scope.emailLogin = function() {
                // $auth.login({ email: $scope.loginEmail, password: $scope.loginPassword })
                //     .then(function(response) {
                //         $window.localStorage.currentUser = JSON.stringify(response.data.user);
                //         $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                //     })
                //     .catch(function(response) {
                //         $scope.errorMsg =  response.data.message;
                //     });
            };
            
    });
