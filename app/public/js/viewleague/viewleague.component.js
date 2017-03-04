(function() {
  'use strict';

  function determineUserTeam (userData, awayData) {
    var team;
    if (awayData.owner === userData.id) {
      team = "away"
    } else {
      team = "home"
    }

    return (team);
  }



  angular.module('app')
    .component('viewleague', {
      controller: ViewLeagueController,
      templateUrl: '/js/viewleague/viewleague.template.html'
    });

    ViewLeagueController.$inject = ['$http', '$state', '$stateParams'];


    function ViewLeagueController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;



      function onInit() {
        console.log('league!');
        $http.get(`/headtoheadmatchups/${$stateParams.id}`)
        .then(response =>{
          vm.league = response.data;
          $http.get(`/users/2`)
          .then(user=>{
            vm.user = user.data;
            var away = vm.league.away_team;
            var home = vm.league.home_team;
            $http.get(`/fantasyteams/${away}`)
            .then(theAwayTeam=>{
              vm.away = theAwayTeam.data;
              $http.get(`/fantasyteams/${home}`)
              .then(theHomeTeam=>{
                vm.home = theHomeTeam.data;
                var userTeam = determineUserTeam(vm.user, vm.away);
                if (userTeam === "away") {
                  vm.userTeam = vm.away;
                  vm.eephusTeam = vm.home;
                } else {
                  vm.userTeam = vm.home;
                  vm.eephusTeam = vm.away;
                }
                $http.get(`/players/${vm.userTeam.catcher}`)
                .then(userTeamCatcher=>{
                  vm.userTeamCatcher = userTeamCatcher.data;
                  $http.get(`/players/${vm.eephusTeam.catcher}`)
                  .then(eephusTeamCatcher=>{
                    vm.eephusTeamCatcher = eephusTeamCatcher.data;
                    $http.get(`/teams/${vm.userTeamCatcher.team_id}`)
                    .then(userTeamCatcherTeam=>{
                      vm.userTeamCatcherTeam = userTeamCatcherTeam.data;
                      $http.get(`/teams/${vm.eephusTeamCatcher.team_id}`)
                      .then(eephusTeamCatcherTeam=>{
                        vm.eephusTeamCatcherTeam = eephusTeamCatcherTeam.data;
                        $http.get(`/players/${vm.userTeam.first_base}`)
                        .then(userTeam1B=>{
                          vm.userTeam1B = userTeam1B.data;
                          $http.get(`/players/${vm.eephusTeam.first_base}`)
                          .then(eephusTeam1B=>{
                            vm.eephusTeam1B = eephusTeam1B.data;
                            $http.get(`/teams/${vm.userTeam1B.team_id}`)
                            .then(userTeam1BTeam=>{
                              vm.userTeam1BTeam = userTeam1BTeam.data;
                              $http.get(`/teams/${vm.eephusTeam1B.team_id}`)
                              .then(eephusTeam1BTeam=>{
                                vm.eephusTeam1BTeam = eephusTeam1BTeam.data;
                                $http.get(`/players/${vm.userTeam.second_base}`)
                                .then(userTeam2B=>{
                                  vm.userTeam2B = userTeam2B.data;
                                  $http.get(`/players/${vm.eephusTeam.second_base}`)
                                  .then(eephusTeam2B=>{
                                    vm.eephusTeam2B = eephusTeam2B.data;
                                    $http.get(`/teams/${vm.userTeam2B.team_id}`)
                                    .then(userTeam2BTeam=>{
                                      vm.userTeam2BTeam = userTeam2BTeam.data;
                                      $http.get(`/teams/${vm.eephusTeam2B.team_id}`)
                                      .then(eephusTeam2BTeam=>{
                                        vm.eephusTeam2BTeam = eephusTeam2BTeam.data;
                                        $http.get(`/players/${vm.userTeam.third_base}`)
                                        .then(userTeam3B=>{
                                          vm.userTeam3B = userTeam3B.data;
                                          $http.get(`/players/${vm.eephusTeam.third_base}`)
                                          .then(eephusTeam3B=>{
                                            vm.eephusTeam3B = eephusTeam3B.data;
                                            $http.get(`/teams/${vm.userTeam3B.team_id}`)
                                            .then(userTeam3BTeam=>{
                                              vm.userTeam3BTeam = userTeam3BTeam.data;
                                              $http.get(`/teams/${vm.eephusTeam3B.team_id}`)
                                              .then(eephusTeam3BTeam=>{
                                                vm.eephusTeam3BTeam = eephusTeam3BTeam.data;
                                                $http.get(`/players/${vm.userTeam.short_stop}`)
                                                .then(userTeamSS=>{
                                                  vm.userTeamSS = userTeamSS.data;
                                                  $http.get(`/players/${vm.eephusTeam.short_stop}`)
                                                  .then(eephusTeamSS=>{
                                                    vm.eephusTeamSS = eephusTeamSS.data;
                                                    $http.get(`/teams/${vm.userTeamSS.team_id}`)
                                                    .then(userTeamSSTeam=>{
                                                      vm.userTeamSSTeam = userTeamSSTeam.data;
                                                      $http.get(`/teams/${vm.eephusTeamSS.team_id}`)
                                                      .then(eephusTeamSSTeam=> {
                                                        vm.eephusTeamSSTeam = eephusTeamSSTeam.data;
                                                        $http.get(`/players/${vm.userTeam.outfield_1}`)
                                                        .then(userTeamOF1=>{
                                                          vm.userTeamOF1 = userTeamOF1.data;
                                                          $http.get(`/players/${vm.eephusTeam.outfield_1}`)
                                                          .then(eephusTeamOF1=>{
                                                            vm.eephusTeamOF1 = eephusTeamOF1.data;
                                                            $http.get(`/teams/${vm.userTeamOF1.team_id}`)
                                                            .then(userTeamOF1Team=>{
                                                              vm.userTeamOF1Team = userTeamOF1Team.data;
                                                              $http.get(`/teams/${vm.eephusTeamOF1.team_id}`)
                                                              .then(eephusTeamOF1Team=>{
                                                                vm.eephusTeamOF1Team = eephusTeamOF1Team.data;
                                                                $http.get(`/players/${vm.userTeam.outfield_2}`)
                                                                .then(userTeamOF2=>{
                                                                  vm.userTeamOF2 = userTeamOF2.data;
                                                                  $http.get(`/players/${vm.eephusTeam.outfield_2}`)
                                                                  .then(eephusTeamOF2=>{
                                                                    vm.eephusTeamOF2 = eephusTeamOF2.data;
                                                                    $http.get(`/teams/${vm.userTeamOF2.team_id}`)
                                                                    .then(userTeamOF2Team=>{
                                                                      vm.userTeamOF2Team = userTeamOF2Team.data;
                                                                      $http.get(`/teams/${vm.eephusTeamOF2.team_id}`)
                                                                      .then(eephusTeamOF2Team=>{
                                                                        vm.eephusTeamOF2Team = eephusTeamOF2Team.data;
    $http.get(`/players/${vm.userTeam.outfield_3}`)
    .then(userTeamOF3=>{
      vm.userTeamOF3 = userTeamOF3.data;
      $http.get(`/players/${vm.eephusTeam.outfield_3}`)
      .then(eephusTeamOF3=>{
        vm.eephusTeamOF3 = eephusTeamOF3.data;
        $http.get(`/teams/${vm.userTeamOF3.team_id}`)
        .then(userTeamOF3Team=>{
          vm.userTeamOF3Team = userTeamOF3Team.data;
          $http.get(`teams/${vm.eephusTeamOF3.team_id}`)
          .then(eephusTeamOF3Team=>{
            vm.eephusTeamOF3Team = eephusTeamOF3Team.data;
            $http.get(`/players/${vm.userTeam.util_1}`)
            .then(userTeamU1=>{
              vm.userTeamU1 = userTeamU1.data;
              $http.get(`/players/${vm.eephusTeam.util_1}`)
              .then(eephusTeamU1=>{
                vm.eephusTeamU1 = eephusTeamU1.data;
                $http.get(`teams/${vm.userTeamU1.team_id}`)
                .then(userTeamU1Team=>{
                  vm.userTeamU1Team = userTeamU1Team.data;
                  $http.get(`/teams/${vm.eephusTeamU1.team_id}`)
                  .then(eephusTeamU1Team=>{
                    vm.eephusTeamU1Team = eephusTeamU1Team.data;
                    $http.get(`/players/${vm.userTeam.util_2}`)
                    .then(userTeamU2=>{
                      vm.userTeamU2 = userTeamU2.data;
                      $http.get(`/players/${vm.eephusTeam.util_2}`)
                      .then(eephusTeamU2=>{
                        vm.eephusTeamU2 = eephusTeamU2.data;
                        $http.get(`/teams/${vm.userTeamU2.team_id}`)
                        .then(userTeamU2Team=>{
                          vm.userTeamU2Team = userTeamU2Team.data;
                          $http.get(`/teams/${vm.eephusTeamU2.team_id}`)
                          .then(eephusTeamU2Team=>{
                            vm.eephusTeamU2Team = eephusTeamU2Team.data;
                            $http.get(`/players/${vm.userTeam.sp_1}`)
                            .then(userTeamSP1=>{
                              vm.userTeamSP1 = userTeamSP1.data;
                              $http.get(`/players/${vm.eephusTeam.sp_1}`)
                              .then(eephusTeamSP1=>{
                                vm.eephusTeamSP1 = eephusTeamSP1.data;
                                $http.get(`/teams/${vm.userTeamSP1.team_id}`)
                                .then(userTeamSP1Team=>{
                                  vm.userTeamSP1Team = userTeamSP1Team.data;
                                  $http.get(`/teams/${vm.eephusTeamSP1.team_id}`)
                                  .then(eephusTeamSP1Team=>{
                                    vm.eephusTeamSP1Team = eephusTeamSP1Team.data;
                                    $http.get(`/players/${vm.userTeam.sp_2}`)
                                    .then(userTeamSP2=>{
                                      vm.userTeamSP2 = userTeamSP2.data;
                                      $http.get(`/players/${vm.eephusTeam.sp_2}`)
                                      .then(eephusTeamSP2=>{
                                        vm.eephusTeamSP2 = eephusTeamSP2.data;
                                        $http.get(`/teams/${vm.userTeamSP2.team_id}`)
                                        .then(userTeamSP2Team=>{
                                          vm.userTeamSP2Team = userTeamSP2Team.data;
                                          $http.get(`/teams/${vm.eephusTeamSP2.team_id}`)
                                          .then(eephusTeamSP2Team=>{
                                            vm.eephusTeamSP2Team = eephusTeamSP2Team.data;
                                            $http.get(`/players/${vm.userTeam.rp_1}`)
                                            .then(userTeamRP1=>{
                                              vm.userTeamRP1 = userTeamRP1.data;
                                              $http.get(`players/${vm.eephusTeam.rp_1}`)
                                              .then(eephusTeamRP1=>{
                                                vm.eephusTeamRP1 = eephusTeamRP1.data;
                                                $http.get(`/teams/${vm.userTeamRP1.team_id}`)
                                                .then(userTeamRP1Team=>{
                                                  vm.userTeamRP1Team = userTeamRP1Team.data;
                                                  $http.get(`/teams/${vm.eephusTeamRP1.team_id}`)
                                                  .then(eephusTeamRP1Team=>{
                                                    vm.eephusTeamRP1Team = eephusTeamRP1Team.data;
    $http.get(`/players/${vm.userTeam.rp_2}`)
    .then(userTeamRP2=>{
      vm.userTeamRP2 = userTeamRP2.data;
      $http.get(`/players/${vm.eephusTeam.rp_2}`)
      .then(eephusTeamRP2=>{
        vm.eephusTeamRP2 = eephusTeamRP2.data;
        $http.get(`/teams/${vm.userTeamRP2.team_id}`)
        .then(userTeamRP2Team=>{
          vm.userTeamRP2Team = userTeamRP2Team.data;
          $http.get(`/teams/${vm.eephusTeamRP2.team_id}`)
          .then(eephusTeamRP2Team=>{
            vm.eephusTeamRP2Team = eephusTeamRP2Team.data;
            $http.get(`/players/${vm.userTeam.p_1}`)
            .then(userTeamP1=>{
              vm.userTeamP1 = userTeamP1.data;
              $http.get(`/players/${vm.eephusTeam.p_1}`)
              .then(eephusTeamP1=>{
                vm.eephusTeamP1 = eephusTeamP1.data;
                $http.get(`/teams/${vm.userTeamP1.team_id}`)
                .then(userTeamP1Team=>{
                  vm.userTeamP1Team = userTeamP1Team.data;
                  $http.get(`/teams/${vm.eephusTeamP1.team_id}`)
                  .then(eephusTeamP1Team=>{
                    vm.eephusTeamP1Team = eephusTeamP1Team.data;
                    $http.get(`/players/${vm.userTeam.p_2}`)
                    .then(userTeamP2=>{
                      vm.userTeamP2 = userTeamP2.data;
                      $http.get(`/players/${vm.eephusTeam.p_2}`)
                      .then(eephusTeamP2=>{
                        vm.eephusTeamP2 = eephusTeamP2.data;
                        $http.get(`/teams/${vm.userTeamP2.team_id}`)
                        .then(userTeamP2Team=>{
                          vm.userTeamP2Team = userTeamP2Team.data;
                          $http.get(`/teams/${vm.eephusTeamP2.team_id}`)
                          .then(eephusTeamP2Team=>{
                            vm.eephusTeamP2Team = eephusTeamP2Team.data;
                            $http.get(`/players/${vm.userTeam.p_3}`)
                            .then(userTeamP3=>{
                              vm.userTeamP3 = userTeamP3.data;
                              $http.get(`/players/${vm.eephusTeam.p_3}`)
                              .then(eephusTeamP3=>{
                                vm.eephusTeamP3 = eephusTeamP3.data;
                                $http.get(`/teams/${vm.userTeamP3.team_id}`)
                                .then(userTeamP3Team=>{
                                  vm.userTeamP3Team = userTeamP3Team.data;
                                  $http.get(`/teams/${vm.eephusTeamP3.team_id}`)
                                  .then(eephusTeamP3Team=>{
                                    vm.eephusTeamP3Team = eephusTeamP3Team.data;
                                    $http.get(`/players/${vm.userTeam.p_4}`)
                                    .then(userTeamP4=>{
                                      vm.userTeamP4 = userTeamP4.data;
                                      $http.get(`/players/${vm.eephusTeam.p_4}`)
                                      .then(eephusTeamP4=>{
                                        vm.eephusTeamP4 = eephusTeamP4.data;
                                        $http.get(`/teams/${vm.userTeamP4.team_id}`)
                                        .then(userTeamP4Team=>{
                                          vm.userTeamP4Team = userTeamP4Team.data;
                                          $http.get(`/teams/${vm.eephusTeamP4.team_id}`)
                                          .then(eephusTeamP4Team=>{
                                            vm.eephusTeamP4Team = eephusTeamP4Team.data;
                                            $http.get(`/players/${vm.userTeam.bench_1}`)
                                            .then(userTeamB1=>{
                                              vm.userTeamB1 = userTeamB1.data;
                                              $http.get(`/players/${vm.eephusTeam.bench_1}`)
                                              .then(eephusTeamB1=>{
                                                vm.eephusTeamB1 = eephusTeamB1.data;
                                                $http.get(`/teams/${vm.userTeamB1.team_id}`)
                                                .then(userTeamB1Team=>{
                                                  vm.userTeamB1Team = userTeamB1Team.data;
                                                  $http.get(`/teams/${vm.eephusTeamB1.team_id}`)
                                                  .then(eephusTeamB1Team=>{
                                                    vm.eephusTeamB1Team = eephusTeamB1Team.data;
  $http.get(`/players/${vm.userTeam.bench_2}`)
  .then(userTeamB2=>{
    vm.userTeamB2 = userTeamB2.data;
    $http.get(`/players/${vm.eephusTeam.bench_2}`)
    .then(eephusTeamB2=>{
      vm.eephusTeamB2 = eephusTeamB2.data;
      $http.get(`/teams/${vm.userTeamB2.team_id}`)
      .then(userTeamB2Team=>{
        vm.userTeamB2Team = userTeamB2Team.data;
        $http.get(`/teams/${vm.eephusTeamB2.team_id}`)
        .then(eephusTeamB2Team=>{
          vm.eephusTeamB2Team = eephusTeamB2Team.data;
          $http.get(`/players/${vm.userTeam.bench_3}`)
          .then(userTeamB3=>{
            vm.userTeamB3 = userTeamB3.data;
            $http.get(`/players/${vm.eephusTeam.bench_3}`)
            .then(eephusTeamB3=>{
              vm.eephusTeamB3 = eephusTeamB3.data;
              $http.get(`/teams/${vm.userTeamB3.team_id}`)
              .then(userTeamB3Team=>{
                vm.userTeamB3Team = userTeamB3Team.data;
                $http.get(`/teams/${vm.eephusTeamB3.team_id}`)
                .then(eephusTeamB3Team=>{
                  vm.eephusTeamB3Team = eephusTeamB3Team.data;
                  $http.get(`/players/${vm.userTeam.bench_4}`)
                  .then(userTeamB4=>{
                    vm.userTeamB4 = userTeamB4.data;
                    $http.get(`/players/${vm.eephusTeam.bench_4}`)
                    .then(eephusTeamB4=>{
                      vm.eephusTeamB4 = eephusTeamB4.data;
                      $http.get(`/teams/${vm.userTeamB4.team_id}`)
                      .then(userTeamB4Team=>{
                        vm.userTeamB4Team = userTeamB4Team.data;
                        $http.get(`/teams/${vm.eephusTeamB4.team_id}`)
                        .then(eephusTeamB4Team=>{
                          vm.eephusTeamB4Team = eephusTeamB4Team.data;
                          $http.get(`/players/${vm.userTeam.bench_5}`)
                          .then(userTeamB5=>{
                            vm.userTeamB5 = userTeamB5.data;
                            $http.get(`/players/${vm.eephusTeam.bench_5}`)
                            .then(eephusTeamB5=>{
                              vm.eephusTeamB5 = eephusTeamB5.data;
                              $http.get(`/teams/${vm.userTeamB5.team_id}`)
                              .then(userTeamB5Team=>{
                                vm.userTeamB5Team = userTeamB5Team.data;
                                $http.get(`/teams/${vm.eephusTeamB5.team_id}`)
                                .then(eephusTeamB5Team=>{
                                  vm.eephusTeamB5Team = eephusTeamB5Team.data;
                                  $http.get(`/players/${vm.userTeam.dl_1}`)
                                  .then(userTeamDL1=>{
                                    vm.userTeamDL1 = userTeamDL1.data;
                                    $http.get(`/players/${vm.eephusTeam.dl_1}`)
                                    .then(eephusTeamDL1=>{
                                      vm.eephusTeamDL1 = eephusTeamDL1.data;
                                      $http.get(`/teams/${vm.userTeamDL1.team_id}`)
                                      .then(userTeamDL1Team=>{
                                        vm.userTeamDL1Team = userTeamDL1Team.data;
                                        $http.get(`/teams/${vm.eephusTeamDL1.team_id}`)
                                        .then(eephusTeamDL1Team=>{
                                          vm.eephusTeamDL1Team = eephusTeamDL1Team.data;
                                          $http.get(`/players/${vm.userTeam.dl_2}`)
                                          .then(userTeamDL2=>{
                                            vm.userTeamDL2 = userTeamDL2.data;
                                            $http.get(`/players/${vm.eephusTeam.dl_2}`)
                                            .then(eephusTeamDL2=>{
                                              vm.eephusTeamDL2 = eephusTeamDL2.data;
                                              $http.get(`/teams/${vm.userTeamDL2.team_id}`)
                                              .then(userTeamDL2Team=>{
                                                vm.userTeamDL2Team = userTeamDL2Team.data;
                                                $http.get(`/teams/${vm.eephusTeamDL2.team_id}`)
                                                .then(eephusTeamDL2Team=>{
                                                  vm.eephusTeamDL2Team = eephusTeamDL2Team.data;
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
