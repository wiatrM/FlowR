'use strict';

angular.module('flr.core')
    .controller('signupController',
        function ($scope, $auth, $log, $resource, $location, $http) {

            var vm = this;

            vm.user = {};

            vm.signUp = function () {
                $auth.signup({username: vm.user.name, email: vm.user.email, password: vm.user.password})
                    .then(function (response) {

                    })
                    .catch(function (response) {
                        console.log("error response", response);
                    })
            };

        });
