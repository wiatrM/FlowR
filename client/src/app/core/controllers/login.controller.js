'use strict';

angular.module('flr.core')
    .controller('loginController',
        function ($auth, $state, $log, $rootScope) {
            var vm = this;

            vm.user = {};
            vm.rememberMe = false;
            vm.errorMessage = null;

            vm.emailLogin = emailLogin;
            //vm.authenticate = authenticate;

            function emailLogin() {
                vm.errorMessage = null;

                var user = {
                    email: vm.user.email,
                    password: vm.user.password
                };

                $auth.login({email: user.email, password: user.password})
                    .then(function (response) {
                        var user = JSON.stringify(response);

                        console.log("login: ", response);
                    })
                    .catch(function (response) {
                        vm.errorMessage = 'Invalid email or password.';
                        vm.user.password = '';
                        console.log("error: ", response.data.error.message);
                    });
            }

            // function authenticate(provider) {
            //     $auth.authenticate(provider);
            // };

        });
