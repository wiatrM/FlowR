'use strict';

angular.module('flr.core')
    .controller('loginController',
        function ($auth, $log, $rootScope) {

            var vm = this;

            vm.user = {};
            vm.errorMessage = null;

            vm.emailLogin = function () {
                vm.errorMessage = null;
                $auth.login({email: vm.user.email, password: vm.user.password})
                    .then(function (response) {
                        var user = JSON.stringify(response);

                        console.log("login", response);
                    })
                    .catch(function (response) {
                        vm.errorMessage = 'Invalid email or password.';
                        console.log("error response", response);
                    });
            };

            // vm.authenticate = function(provider) {
            //     $auth.authenticate(provider);
            // };

        });
