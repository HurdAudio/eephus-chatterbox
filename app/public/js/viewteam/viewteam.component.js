(function() {
  'use strict';


  function spokenOutput (str) {
    var u = new SpeechSynthesisUtterance();
    var synth = window.speechSynthesis;
    u.text = str;
    u.lang = 'en-US';
    u.rate = 0.81;
    //  u.voice = voices[0];
    u.onend = function(event) {
     setTimeout(function() {
       console.log(str);
     });
   };
    speechSynthesis.speak(u);
  }

  function determindPositionEligibility (player) {
    let positions = {};
    let strPos = '(';
    positions.first_name = player.first_name;
    positions.last_name = player.last_name;
    if (player.eligible_C) {
      strPos += 'C, ';
    }
    if (player.eligible_1B) {
      strPos += '1B, ';
    }
    if (player.eligible_2B) {
      strPos += '2B, ';
    }
    if (player.eligible_3B) {
      strPos += '3B, ';
    }
    if (player.eligible_SS) {
      strPos += 'SS, ';
    }
    if (player.eligible_OF) {
      strPos += 'OF, ';
    }
    if (player.eligible_util) {
      strPos += 'Util, ';
    }
    if (player.eligible_SP) {
      strPos += 'SP, ';
    }
    if (player.eligible_RP) {
      strPos += 'RP, ';
    }
    if (player.eligible_P) {
      strPos += 'P, ';
    }
    strPos = strPos.slice(0, (strPos.length - 2)) + ')';
    positions.eligible = strPos;


    return (positions);
  }




  angular.module('app')
    .component('viewteam', {
      controller: ViewTeamController,
      templateUrl: '/js/viewteam/viewteam.template.html'
    });

    ViewTeamController.$inject = ['$http', '$state', '$stateParams'];


    function ViewTeamController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;



      function onInit() {
        console.log('team!');
        $http.get(`/fantasyteams/${$stateParams.id}`)
        .then(userTeam=>{
          vm.userTeam = userTeam.data;
          var teamNameBar = document.getElementById('hometeam');
          teamNameBar.setAttribute("style", "background-color: " + vm.userTeam.team_color_1 + "; border: solid 8px " + vm.userTeam.team_color_2 + "; color: " + vm.userTeam.team_color_3 +";");
          $http.get(`/players/${vm.userTeam.outfield_1}`)
          .then(userTeamOF1=>{
            vm.userTeamOF1 = userTeamOF1.data;
            $http.get(`/teams/${vm.userTeamOF1.team_id}`)
            .then(userTeamOF1Team=>{
              vm.userTeamOF1Team = userTeamOF1Team.data;
              $http.get(`/players/${vm.userTeam.sp_2}`)
              .then(userTeamSP2=>{
                vm.userTeamSP2 = userTeamSP2.data;
                $http.get(`/teams/${vm.userTeamSP2.team_id}`)
                .then(userTeamSP2Team=>{
                  vm.userTeamSP2Team = userTeamSP2Team.data;
                  $http.get(`/players/${vm.userTeam.outfield_2}`)
                  .then(userTeamOF2=>{
                    vm.userTeamOF2 = userTeamOF2.data;
                    $http.get(`/teams/${vm.userTeamOF2.team_id}`)
                    .then(userTeamOF2Team=>{
                      vm.userTeamOF2Team = userTeamOF2Team.data;
                      $http.get(`/players/${vm.userTeam.rp_1}`)
                      .then(userTeamRP1=>{
                        vm.userTeamRP1 = userTeamRP1.data;
                        $http.get(`/teams/${vm.userTeamRP1.team_id}`)
                        .then(userTeamRP1Team=>{
                          vm.userTeamRP1Team = userTeamRP1Team.data;
                          $http.get(`/players/${vm.userTeam.rp_2}`)
                          .then(userTeamRP2=>{
                            vm.userTeamRP2 = userTeamRP2.data;
                            $http.get(`/teams/${vm.userTeamRP2.team_id}`)
                            .then(userTeamRP2Team=>{
                              vm.userTeamRP2Team = userTeamRP2Team.data;
                              $http.get(`/players/${vm.userTeam.third_base}`)
                              .then(userTeam3B=>{
                                vm.userTeam3B = userTeam3B.data;
                                $http.get(`/teams/${vm.userTeam3B.team_id}`)
                                .then(userTeam3BTeam=>{
                                  vm.userTeam3BTeam = userTeam3BTeam.data;
                                  $http.get(`/players/${vm.userTeam.short_stop}`)
                                  .then(userTeamSS=>{
                                    vm.userTeamSS = userTeamSS.data;
                                    $http.get(`/teams/${vm.userTeamSS.team_id}`)
                                    .then(userTeamSSTeam=>{
                                      vm.userTeamSSTeam = userTeamSSTeam.data;
                                    });
                                    $http.get(`/players/${vm.userTeam.p_1}`)
                                    .then(userTeamP1=>{
                                      vm.userTeamP1 = userTeamP1.data;
                                      $http.get(`/teams/${vm.userTeamP1.team_id}`)
                                      .then(userTeamP1Team=>{
                                        vm.userTeamP1Team = userTeamP1Team.data;
                                        $http.get(`/players/${vm.userTeam.p_2}`)
                                        .then(userTeamP2=>{
                                          vm.userTeamP2 = userTeamP2.data;
                                          $http.get(`/teams/${vm.userTeamP2.team_id}`)
                                          .then(userTeamP2Team=>{
                                            vm.userTeamP2Team = userTeamP2Team.data;
                                            $http.get(`/players/${vm.userTeam.second_base}`)
                                            .then(userTeam2B=>{
                                              vm.userTeam2B = userTeam2B.data;
                                              $http.get(`/teams/${vm.userTeam2B.team_id}`)
                                              .then(userTeam2BTeam=>{
                                                vm.userTeam2BTeam = userTeam2BTeam.data;
                                                $http.get(`/players/${vm.userTeam.p_3}`)
                                                .then(userTeamP3=>{
                                                  vm.userTeamP3 = userTeamP3.data;
                                                  $http.get(`/teams/${vm.userTeamP3.team_id}`)
                                                  .then(userTeamP3Team=>{
                                                    vm.userTeamP3Team = userTeamP3Team.data;
                                                    $http.get(`/players/${vm.userTeam.p_4}`)
                                                    .then(userTeamP4=>{
                                                      vm.userTeamP4 = userTeamP4.data;
                                                      $http.get(`/teams/${vm.userTeamP4.team_id}`)
                                                      .then(userTeamP4Team=>{
                                                        vm.userTeamP4Team = userTeamP4Team.data;
    $http.get(`/players/${vm.userTeam.sp_1}`)
    .then(userTeamSP1=>{
      vm.userTeamSP1 = userTeamSP1.data;
      $http.get(`/teams/${vm.userTeamSP1.team_id}`)
      .then(userTeamSP1Team=>{
        vm.userTeamSP1Team = userTeamSP1Team.data;
        $http.get(`/players/${vm.userTeam.outfield_3}`)
        .then(userTeamOF3=>{
          vm.userTeamOF3 = userTeamOF3.data;
          $http.get(`/teams/${vm.userTeamOF3.team_id}`)
          .then(userTeamOF3Team=>{
            vm.userTeamOF3Team = userTeamOF3Team.data;
            $http.get(`/players/${vm.userTeam.util_1}`)
            .then(userTeamU1=>{
              vm.userTeamU1 = userTeamU1.data;
              $http.get(`/teams/${vm.userTeamU1.team_id}`)
              .then(userTeamU1Team=>{
                vm.userTeamU1Team = userTeamU1Team.data;
                $http.get(`/players/${vm.userTeam.first_base}`)
                .then(userTeam1B=>{
                  vm.userTeam1B = userTeam1B.data;
                  $http.get(`/teams/${vm.userTeam1B.team_id}`)
                  .then(userTeam1BTeam=>{
                    vm.userTeam1BTeam = userTeam1BTeam.data;
                    $http.get(`/players/${vm.userTeam.catcher}`)
                    .then(userTeamCatcher=>{
                      vm.userTeamCatcher = userTeamCatcher.data;
                      $http.get(`/teams/${vm.userTeamCatcher.team_id}`)
                      .then(userTeamCatcherTeam=>{
                        vm.userTeamCatcherTeam = userTeamCatcherTeam.data;
                        $http.get(`/players/${vm.userTeam.util_2}`)
                        .then(userTeamU2=>{
                          vm.userTeamU2 = userTeamU2.data;
                          $http.get(`/teams/${vm.userTeamU2.team_id}`)
                          .then(userTeamU2Team=>{
                            vm.userTeamU2Team = userTeamU2Team.data;
                            $http.get(`/players/${vm.userTeam.bench_1}`)
                            .then(userTeamB1=>{
                              vm.userTeamB1 = userTeamB1.data;
                              $http.get(`/teams/${vm.userTeamB1.team_id}`)
                              .then(userTeamB1Team=>{
                                vm.userTeamB1Team = userTeamB1Team.data;
                                vm.userTeamB1Positions = determindPositionEligibility(vm.userTeamB1);
                                $http.get(`/players/${vm.userTeam.bench_2}`)
                                .then(userTeamB2=>{
                                  vm.userTeamB2 = userTeamB2.data;
                                  $http.get(`/teams/${vm.userTeamB2.team_id}`)
                                  .then(userTeamB2Team=>{
                                    vm.userTeamB2Team = userTeamB2Team.data;
                                    vm.userTeamB2Positions = determindPositionEligibility(vm.userTeamB2);
                                    $http.get(`/players/${vm.userTeam.bench_3}`)
                                    .then(userTeamB3=>{
                                      vm.userTeamB3 = userTeamB3.data;
                                      $http.get(`/teams/${vm.userTeamB3.team_id}`)
                                      .then(userTeamB3Team=>{
                                        vm.userTeamB3Team = userTeamB3Team.data;
                                        vm.userTeamB3Positions = determindPositionEligibility(vm.userTeamB3);
                                        $http.get(`/players/${vm.userTeam.bench_4}`)
                                        .then(userTeamB4=>{
                                          vm.userTeamB4 = userTeamB4.data;
                                          $http.get(`/teams/${vm.userTeamB4.team_id}`)
                                          .then(userTeamB4Team=>{
                                            vm.userTeamB4Team = userTeamB4Team.data;
                                            vm.userTeamB4Positions = determindPositionEligibility(vm.userTeamB4);
                                            $http.get(`/players/${vm.userTeam.bench_5}`)
                                            .then(userTeamB5=>{
                                              vm.userTeamB5 = userTeamB5.data;
                                              $http.get(`/teams/${vm.userTeamB5.team_id}`)
                                              .then(userTeamB5Team=>{
                                                vm.userTeamB5Team = userTeamB5Team.data;
                                                vm.userTeamB5Positions = determindPositionEligibility(vm.userTeamB5);
                                              });
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
                                                      });
                                                    });
                                                  });
                                                });
                                              });
                                            });
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
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
