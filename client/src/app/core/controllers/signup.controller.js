'use strict';

angular.module('flr.core')
    .controller('signupController',
        function ($auth, $state, $mdToast, $log, $location, $http) {
            var vm = this;

            vm.user = {};

            vm.signupForm = {};
            vm.errorMessage = {};
            vm.errorMessage.email = '';
            vm.errorMessage.username = '';

            vm.signUp = signUp;

            function signUp() {
                var user = {
                    username: vm.user.name,
                    email: vm.user.email,
                    password: vm.user.password
                };
                vm.errorMessage = {};

                $auth.signup(user)
                    .then(function (response) {
                        //show simple toast
                        $mdToast.show($mdToast.simple().hideDelay(10000).action('Ok').textContent('Registration successful!'));
                        //after successful register go to /login
                        $state.go('app.anon.login');
                    })
                    .catch(function (response) {
                        var errorMessage = {};
                        //check for errors messages
                        angular.forEach(response.data.error.details.messages, function(message, field) {
                            vm.signupForm[field].$setValidity('server', false);
                            errorMessage[field] = message.toString() + '.';
                        });
                        vm.errorMessage = errorMessage;
                    })
            }

        });
