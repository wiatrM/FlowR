'use strict';

angular.module('flr.core')
    .controller('loginController',
        function ($scope, $mdDialog, $auth, $log, $resource, $location, $http) {

            /**
             * Method showing Dialog Box with Sign Up form.
             * @param ev
             */
            $scope.showRegister = function(ev) {
                $mdDialog.show({
                    controller: 'signupController',
                    templateUrl: 'app/core/views/signup.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                });
            };

            $scope.showRemind = function(ev) {
                
            };

            // $scope.emailLogin = function() {
            //     $auth.login({ email: $scope.loginEmail, password: $scope.loginPassword })
            //         .then(function(response) {
            //             $window.localStorage.currentUser = JSON.stringify(response.data.user);
            //             $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
            //         })
            //         .catch(function(response) {
            //             $scope.errorMsg = response.data.message;
            //         });
            // };

            // $scope.facebookLogin = function() {
            //
            // };

        });
