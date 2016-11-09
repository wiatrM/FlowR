'use strict';

angular.module('flr.core')
    .controller('loginController',
        function ($auth, $log, $rootScope) {

            var vm = this;

            vm.user = {};

            vm.emailLogin = function () {
                $auth.login({email: vm.user.email, password: vm.user.password})
                    .then(function (response) {
                        var user = JSON.stringify(response);
                        
                        console.log("login", response);
                    })
                    .catch(function (response) {
                        console.log("error response", response);
                    });
            };

            // $scope.authenticate = function(provider) {
            //     $auth.authenticate(provider);
            // };

        });
