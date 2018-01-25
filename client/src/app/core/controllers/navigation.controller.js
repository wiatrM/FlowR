'use strict';

angular.module('flr.core')
    .controller('navigationController',
        function ($mdSidenav) {
            var vm = this;

            var originatorEv;

            vm.openMenu = openMenu;
            vm.openSideMenu = openSideMenu;

            function openSideMenu() {
                return function () {
                    $mdSidenav("navigation").toggle();
                };
            }

            function openMenu($mdMenu, ev) {
                originatorEv = ev;
                $mdMenu.open(ev);
            }

        });
