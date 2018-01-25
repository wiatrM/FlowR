'use strict';

angular.module('flr.core')
    .run(['$rootScope', '$state',
        function ($rootScope, $state) {

            $rootScope.state = $state;

        }
    ]);
