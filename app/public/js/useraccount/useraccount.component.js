(function() {
  'use strict';

  function userH2HLeagues(arrOfHeadMatchups, arrOfFantasyTeams, userId, teamArr) {
    let leagues = [];
    let tempAwayTeam = 0;
    let tempHomeTeam = 0;

    for (let i = 0; i < arrOfHeadMatchups.length; i++) {
      tempAwayTeam = arrOfHeadMatchups[i].away_team;
      tempHomeTeam = arrOfHeadMatchups[i].home_team;
      for (let j = 0; j < arrOfFantasyTeams.length; j++) {
        if ((arrOfFantasyTeams[j].id === tempAwayTeam) || (arrOfFantasyTeams[j].id === tempHomeTeam)) {
          if (arrOfFantasyTeams[j].owner === userId) {
            leagues.push(arrOfHeadMatchups[i]);
            teamArr.push(arrOfFantasyTeams[j]);
          }
        }
      }
    }

    return (leagues);
  }

  function userRotisserieLeagues(arrOfRotos, arrOfFantasies, userId, teamArr) {
    var leagues = [];
    var tempTeam01 = 0;
    var tempTeam02 = 0;
    var tempTeam03 = 0;
    var tempTeam04 = 0;
    var tempTeam05 = 0;
    var tempTeam06 = 0;
    var tempTeam07 = 0;
    var tempTeam08 = 0;
    var tempTeam09 = 0;
    var tempTeam10 = 0;
    var tempTeam11 = 0;
    var tempTeam12 = 0;
    var fantasyTeam = 0;

    for (let i = 0; i < arrOfRotos.length; i++) {
      tempTeam01 = arrOfRotos[i].team01;
      tempTeam02 = arrOfRotos[i].team02;
      tempTeam03 = arrOfRotos[i].team03;
      tempTeam04 = arrOfRotos[i].team04;
      tempTeam05 = arrOfRotos[i].team05;
      tempTeam06 = arrOfRotos[i].team06;
      tempTeam07 = arrOfRotos[i].team07;
      tempTeam08 = arrOfRotos[i].team08;
      tempTeam09 = arrOfRotos[i].team09;
      tempTeam10 = arrOfRotos[i].team10;
      tempTeam11 = arrOfRotos[i].team11;
      tempTeam12 = arrOfRotos[i].team12;
      for (let j = 0; j < arrOfFantasies.length; j++) {
        fantasyTeam = arrOfFantasies[j].id;
        if ((tempTeam01 === fantasyTeam)||(tempTeam02 === fantasyTeam)||(tempTeam03 === fantasyTeam)||(tempTeam04 === fantasyTeam)||(tempTeam05 === fantasyTeam)||(tempTeam06 === fantasyTeam)||(tempTeam07 === fantasyTeam)||(tempTeam08 === fantasyTeam)||(tempTeam09 === fantasyTeam)||(tempTeam10 === fantasyTeam)||(tempTeam11 === fantasyTeam)||(tempTeam12 === fantasyTeam)) {
          if (arrOfFantasies[j].owner === userId) {
            leagues.push(arrOfRotos[i]);
            teamArr.push(arrOfFantasies[j]);
          }
        }
      }
    }

    return (leagues);
  }

  angular.module('app')
    .component('useraccount', {
      controller: UserAccountController,
      templateUrl: '/js/useraccount/useraccount.template.html'
    });

    UserAccountController.$inject = ['$http', '$state', '$stateParams'];


    function UserAccountController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;
      vm.userLeagues = userLeagues;

      function userLeagues() {

      }

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
                $http.get(`/teams/${vm.user.fourth_favorite_team}`)
                .then(faveTeam4 => {
                  vm.team4 = faveTeam4.data;
                  var initDraftBar = document.getElementById('initiateDraft');
                  var fourthColor1 = vm.team4.team_color_1;
                  var fourthColor2 = vm.team4.team_color_2;
                  var fourthColor3 = vm.team4.team_color_3;
                  initDraftBar.setAttribute("style", "background:" + fourthColor1 + "; border: solid " + fourthColor2 + " 11px;" + "color:" + fourthColor3 + "; opacity: 0.9;");
                  $http.get(`/teams/${vm.user.fifth_favorite_team}`)
                  .then(faveTeam5 => {
                    vm.team5 = faveTeam5.data;
                    var adminBar = document.getElementById('adminBar');
                    var fifthColor1 = vm.team5.team_color_1;
                    var fifthColor2 = vm.team5.team_color_2;
                    var fifthColor3 = vm.team5.team_color_3;
                    adminBar.setAttribute("style", "background:" + fifthColor1 + "; border: solid " + fifthColor2 + " 11px;" + "color:" + fifthColor3 + "; opacity: 0.9;");
                    $http.get('/headtoheadmatchups')
                    .then(headToHeads => {
                      var heads = headToHeads.data;
                      $http.get('/fantasyteams')
                      .then(fantasyPool => {
                        var fantasies = fantasyPool.data;
                        var teams = [];
                        vm.playerHeadToHeadLeagues = userH2HLeagues(heads, fantasies, 2, teams);
                        vm.playerH2HFantasyTeams = teams;
                        $http.get('/rotisseriematchups')
                        .then(rotisseries =>{
                          var rotos = rotisseries.data;
                          var rotoTeams = [];
                          vm.playerRotisserieLeagues = userRotisserieLeagues(rotos, fantasies, 2, rotoTeams);
                          vm.playerRotoTeams = rotoTeams;
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });

      }
    }

}());
