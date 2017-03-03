(function() {
  'use strict';

  angular.module('app')
    .component('useraccount', {
      controller: UserAccountController,
      templateUrl: '/js/useraccount/useraccount.template.html'
    });

    controller.$inject = ['$http', '$state', '$stateParams'];


    function UserAccountController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;

      function onInit() {
        $http.get('/users/2')
        .then(response => {
          vm.user = response.data;
          $http.get(`/teams/${vm.user.first_favorite_team}`)
          .then(faveTeam => {
            vm.team = faveTeam.data;
            var nameBar = document.getElementById('namebar');
            var color1 = vm.team.team_color_1;
            var color2 = vm.team.team_color_2;
            var color3 = vm.team.team_color_3;
            nameBar.setAttribute("style", "background:" + color1 + "; border: solid " + color2 + " 11px;" + "color:" + color3 + "; opacity: 0.9;");
            $http.get(`/teams/${vm.user.second_favorite_team}`)
            .then(faveTeam2 => {
              vm.team2 = faveTeam2.data;
              var headToHeadBar = document.getElementById('head-to-headLeagues');
              var secondColor1 = vm.team2.team_color_1;
              var secondColor2 = vm.team2.team_color_2;
              var secondColor3 = vm.team2.team_color_3;
              headToHeadBar.setAttribute("style", "background:" + secondColor1 + "; border: solid " + secondColor2 + " 11px;" + "color:" + secondColor3 + "; opacity: 0.9;");
              $http.get(`/teams/${vm.user.third_favorite_team}`)
              .then(faveTeam3 => {
                vm.team3 = faveTeam3.data;
                var rotisserieLeagueBar = document.getElementById('rotisserieLeagues');
                var thirdColor1 = vm.team3.team_color_1;
                var thirdColor2 = vm.team3.team_color_2;
                var thirdColor3 = vm.team3.team_color_3;
                rotisserieLeagueBar.setAttribute("style", "background:" + thirdColor1 + "; border: solid " + thirdColor2 + " 11px;" + "color:" + thirdColor3 + "; opacity: 0.9;");
              });
            });
          });
        });

      }
    }

}());
