(function() {
  'use strict';

  var playerArray = [];
  var playerArrayIndex = 0;
  var playerRibbonSlots = [];
  var inputOn = true;
  var draftStagePlayer;

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

  function getName (baseballJargon) {
    var jargonArr = baseballJargon.split(' ');
    var leagueName = '';
    var numberOfWords = Math.floor(Math.random()*3) + 2;
    var startingPoint = Math.floor(Math.random()*(jargonArr.length - numberOfWords)) + 1;
    let tempWord = '';

    for (let i = 0; i < numberOfWords; i++) {
      tempWord = jargonArr[startingPoint + i];
      // tempWord[0] = tempWord[0].toUpperCase();
      tempWord = tempWord[0].toUpperCase() + tempWord.slice(1);
      if (i === 0) {
        leagueName = tempWord;
      } else {
        leagueName += " " + tempWord;
      }
    }

    return(leagueName);
  }

  function getPositionsString (player) {
    var positionsAvail = "";

    if (player.eligible_C) {
      positionsAvail += "C ";
    }
    if (player.eligible_1B) {
      positionsAvail += "1B ";
    }
    if (player.eligible_2B) {
      positionsAvail += "2B ";
    }
    if (player.eligible_3B) {
      positionsAvail += "3B ";
    }
    if (player.eligible_SS) {
      positionsAvail += "SS ";
    }
    if (player.eligible_OF) {
      positionsAvail += "OF ";
    }
    if (player.eligible_SP) {
      positionsAvail += "SP ";
    }
    if (player.eligible_RP) {
      positionsAvail += "RP ";
    }

    return(positionsAvail);
  }

  angular.module('app')
    .component('draft', {
      controller: DraftController,
      templateUrl: '/js/draft/draft.template.html'
    });

    DraftController.$inject = ['$http', '$state', '$stateParams'];

    function DraftController($http, $state, $stateParams) {
      const vm = this;

      vm.$onInit = onInit;
      vm.updateUserTeam = updateUserTeam;
      vm.beginDraftBar = beginDraftBar;
      vm.scrollLeft = scrollLeft;
      vm.scrollRight = scrollRight;
      vm.setDraftStage = setDraftStage;
      vm.cancelDraft = cancelDraft;
      vm.draftPlayer = draftPlayer;

      function determinePositions(player, fieldTeam) {
        var positionArr = [];
        var positionPlayer = false;
        var pitcher = false;

        if ((player.eligible_C) && (fieldTeam.catcher === null)) {
          positionArr.push('Catcher');
          positionPlayer = true;
        }
        if ((player.eligible_1B) && (fieldTeam.first_base === null)) {
          positionArr.push('First Base');
          positionPlayer = true;
        }
        if ((player.eligible_2B) && (fieldTeam.second_base === null)) {
          positionArr.push('Second Base');
          positionPlayer = true;
        }
        if ((player.eligible_3B) && (fieldTeam.third_base === null)) {
          positionArr.push('Third Base');
          positionPlayer = true;
        }
        if ((player.eligible_SS) && (fieldTeam.short_stop === null)) {
          positionArr.push('Shortstop');
          positionPlayer = true;
        }
        if (player.eligible_OF) {
          positionPlayer = true;
          if (fieldTeam.outfield_1 === null) {
            positionArr.push('Left Field');
          }
          if (fieldTeam.outfield_2 === null) {
            positionArr.push('Center Field');
          }
          if (fieldTeam.outfield_3 === null) {
            positionArr.push('Right Field');
          }
        }
        if (positionPlayer) {
          if (fieldTeam.util_1 === null) {
            positionArr.push('Utility 1');
          }
          if (fieldTeam.util_2 === null) {
            positionArr.push('Utility 2');
          }
        }
        if (player.eligible_SP) {
          pitcher = true;
          if (fieldTeam.sp_1 === null) {
            positionArr.push('Starting Pitcher 1');
          }
          if (fieldTeam.sp_2 === null) {
            positionArr.push('Starting Pitcher 2');
          }
        }
        if (player.eligible_RP) {
          pitcher = true;
          if (fieldTeam.rp_1 === null) {
            positionArr.push('Relief Pitcher 1');
          }
          if (fieldTeam.rp_2 === null) {
            positionArr.push('Relief Pitcher 2');
          }
        }
        if (pitcher) {
          if (fieldTeam.p_1 === null) {
            positionArr.push('Pitcher 1');
          }
          if (fieldTeam.p_2 === null) {
            positionArr.push('Pitcher 2');
          }
          if (fieldTeam.p_3 === null) {
            positionArr.push('Pitcher 3');
          }
          if (fieldTeam.p_4 === null) {
            positionArr.push('Pitcher 4');
          }
        }
        if (fieldTeam.bench_1 === null) {
          positionArr.push('Bench 1');
        }
        if (fieldTeam.bench_2 === null) {
          positionArr.push('Bench 2');
        }
        if (fieldTeam.bench_3 === null) {
          positionArr.push('Bench 3');
        }
        if (fieldTeam.bench_4 === null) {
          positionArr.push('Bench 4');
        }
        if (fieldTeam.bench_5 === null) {
          positionArr.push('Bench 5');
        }

        return (positionArr);
      }

      function updateLeftField(team) {
        if (team.outfield_1 !== null) {
          $http.get(`/players/${team.outfield_1}`)
          .then(teamOF1=>{
            if (team === vm.userTeam) {
              vm.userTeamOF1 = teamOF1.data;
            } else {
              vm.eephusTeamOF1 = teamOF1.data;
            }
            $http.get(`/teams/${teamOF1.data.team_id}`)
            .then(teamOF1Team=>{
              if (team === vm.userTeam) {
                vm.userTeamOF1Team = teamOF1Team.data;
              } else {
                vm.eephusTeamOF1Team = teamOF1Team.data;
              }
            });
          });
        }
      }

      function updateSP2(team) {
        if (team.sp_2 !== null) {
          $http.get(`/players/${team.sp_2}`)
          .then(teamSP2=>{
            if (team === vm.userTeam) {
              vm.userTeamSP2 = teamSP2.data;
            } else {
              vm.eephusTeamSP2 = teamSP2.data;
            }
            $http.get(`/teams/${teamSP2.data.team_id}`)
            .then(teamSP2Team=>{
              if (team === vm.userTeam) {
                vm.userTeamSP2Team = teamSP2Team.data;
              } else {
                vm.eephusTeamSP2Team = teamSP2Team.data;
              }
            });
          });
        }
      }

      function updateCenterField(team) {
        if (team.outfield_2 !== null) {
          $http.get(`/players/${team.outfield_2}`)
          .then(teamOF2=>{
            if (team === vm.userTeam) {
              vm.userTeamOF2 = teamOF2.data;
            } else {
              vm.eephusTeamOF2 = teamOF2.data;
            }
            $http.get(`/teams/${teamOF2.data.team_id}`)
            .then(teamOF2Team=>{
              if (team === vm.userTeam) {
                vm.userTeamOF2Team = teamOF2Team.data;
              } else {
                vm.eephusTeamOF2Team = teamOF2Team.data;
              }
            });
          });
        }
      }

      function updateThirdBase(team) {
        if (team.third_base !== null) {
          $http.get(`/players/${team.third_base}`)
          .then(team3B=>{
            if (team === vm.userTeam) {
              vm.userTeam3B = team3B.data;
            } else {
              vm.eephusTeam3B = team3B.data;
            }
            $http.get(`/teams/${team3B.data.team_id}`)
            .then(team3BTeam=>{
              if (team === vm.userTeam) {
                vm.userTeam3BTeam = team3BTeam.data;
              } else {
                vm.eephusTeam3BTeam = team3BTeam.data;
              }
            });
          });
        }
      }

      function updateShortstop(team) {
        if (team.short_stop !== null) {
          $http.get(`/players/${team.short_stop}`)
          .then(teamSS=>{
            if (team === vm.userTeam) {
              vm.userTeamSS = teamSS.data;
            } else {
              vm.eephusTeamSS = teamSS.data;
            }
            $http.get(`/teams/${teamSS.data.team_id}`)
            .then(teamSSTeam=>{
              if (team === vm.userTeam) {
                vm.userTeamSSTeam = teamSSTeam.data;
              } else {
                vm.eephusTeamSSTeam = teamSSTeam.data;
              }
            });
          });
        }
      }

      function updatePitcher1(team){
        if (team.p_1 !== null) {
          $http.get(`/players/${team.p_1}`)
          .then(teamP1=>{
            if (team === vm.userTeam) {
              vm.userTeamP1 = teamP1.data;
            } else {
              vm.eephusTeamP1 = teamP1.data;
            }
            $http.get(`/teams/${teamP1.data.team_id}`)
            .then(teamP1Team=>{
              if (team === vm.userTeam) {
                vm.userTeamP1Team = teamP1Team.data;
              } else {
                vm.eephusTeamP1Team = teamP1Team.data;
              }
            });
          });
        }
      }

      function updatePitcher2(team){
        if (team.p_2 !== null) {
          $http.get(`/players/${team.p_2}`)
          .then(teamP2=>{
            if (team === vm.userTeam) {
              vm.userTeamP2 = teamP2.data;
            } else {
              vm.eephusTeamP2 = teamP2.data;
            }
            $http.get(`/teams/${teamP2.data.team_id}`)
            .then(teamP2Team=>{
              if (team === vm.userTeam) {
                vm.userTeamP2Team = teamP2Team.data;
              } else {
                vm.eephusTeamP2Team = teamP2Team.data;
              }
            });
          });
        }
      }

      function updateSecondBase(team) {
        if (team.second_base !== null) {
          $http.get(`/players/${team.second_base}`)
          .then(team2B=>{
            if (team === vm.userTeam) {
              vm.userTeam2B = team2B.data;
            } else {
              vm.eephusTeam2B = team2B.data;
            }
            $http.get(`/teams/${team2B.data.team_id}`)
            .then(team2BTeam=>{
              if (team === vm.userTeam) {
                vm.userTeam2BTeam = team2BTeam.data;
              } else {
                vm.eephusTeam2BTeam = team2BTeam.data;
              }
            });
          });
        }
      }

      function updatePitcher3(team){
        if (team.p_3 !== null) {
          $http.get(`/players/${team.p_3}`)
          .then(teamP3=>{
            if (team === vm.userTeam) {
              vm.userTeamP3 = teamP3.data;
            } else {
              vm.eephusTeamP3 = teamP3.data;
            }
            $http.get(`/teams/${teamP3.data.team_id}`)
            .then(teamP3Team=>{
              if (team === vm.userTeam) {
                vm.userTeamP3Team = teamP3Team.data;
              } else {
                vm.eephusTeamP3Team = teamP3Team.data;
              }
            });
          });
        }
      }

      function updatePitcher4(team){
        if (team.p_4 !== null) {
          $http.get(`/players/${team.p_4}`)
          .then(teamP4=>{
            if (team === vm.userTeam) {
              vm.userTeamP4 = teamP4.data;
            } else {
              vm.eephusTeamP4 = teamP4.data;
            }
            $http.get(`/teams/${teamP4.data.team_id}`)
            .then(teamP4Team=>{
              if (team === vm.userTeam) {
                vm.userTeamP4Team = teamP4Team.data;
              } else {
                vm.eephusTeamP4Team = teamP4Team.data;
              }
            });
          });
        }
      }

      function updateSP1(team) {
        if (team.sp_1 !== null) {
          $http.get(`/players/${team.sp_1}`)
          .then(teamSP1=>{
            if (team === vm.userTeam) {
              vm.userTeamSP1 = teamSP1.data;
            } else {
              vm.eephusTeamSP1 = teamSP1.data;
            }
            $http.get(`/teams/${teamSP1.data.team_id}`)
            .then(teamSP1Team=>{
              if (team === vm.userTeam) {
                vm.userTeamSP1Team = teamSP1Team.data;
              } else {
                vm.eephusTeamSP1Team = teamSP1Team.data;
              }
            });
          });
        }
      }

      function updateRightField(team) {
        if (team.outfield_3 !== null) {
          $http.get(`/players/${team.outfield_3}`)
          .then(teamOF3=>{
            if (team === vm.userTeam) {
              vm.userTeamOF3 = teamOF3.data;
            } else {
              vm.eephusTeamOF3 = teamOF3.data;
            }
            $http.get(`/teams/${teamOF3.data.team_id}`)
            .then(teamOF3Team=>{
              if (team === vm.userTeam) {
                vm.userTeamOF3Team = teamOF3Team.data;
              } else {
                vm.eephusTeamOF3Team = teamOF3Team.data;
              }
            });
          });
        }
      }

      function updateUtility1(team) {
        if (team.util_1 !== null) {
          $http.get(`/players/${team.util_1}`)
          .then(teamU1=>{
            if (team === vm.userTeam) {
              vm.userTeamU1 = teamU1.data;
            } else {
              vm.eephusTeamU1 = teamU1.data;
            }
            $http.get(`/teams/${teamU1.data.team_id}`)
            .then(teamU1Team=>{
              if (team === vm.userTeam) {
                vm.userTeamU1Team = teamU1Team.data;
              } else {
                vm.eephusTeamU1Team = teamU1Team.data;
              }
            });
          });
        }
      }

      function updateFirstBase(team) {
        if (team.first_base !== null) {
          $http.get(`/players/${team.first_base}`)
          .then(team1B=>{
            if (team === vm.userTeam) {
              vm.userTeam1B = team1B.data;
            } else {
              vm.eephusTeam1B = team1B.data;
            }
            $http.get(`/teams/${team1B.data.team_id}`)
            .then(team1BTeam=>{
              if (team === vm.userTeam) {
                vm.userTeam1BTeam = team1BTeam.data;
              } else {
                vm.eephusTeam1BTeam = team1BTeam.data;
              }
            });
          });
        }
      }

      function updateUtility2(team) {
        if (team.util_2 !== null) {
          $http.get(`/players/${team.util_2}`)
          .then(teamU2=>{
            if (team === vm.userTeam) {
              vm.userTeamU2 = teamU2.data;
            } else {
              vm.eephusTeamU2 = teamU2.data;
            }
            $http.get(`/teams/${teamU2.data.team_id}`)
            .then(teamU2Team=>{
              if (team === vm.userTeam) {
                vm.userTeamU2Team = teamU2Team.data;
              } else {
                vm.eephusTeamU2Team = teamU2Team.data;
              }
            });
          });
        }
      }

      function updateBench1(team) {
        if (team.bench_1 !== null) {
          $http.get(`/players/${team.bench_1}`)
          .then(teamB1=>{
            if (team === vm.userTeam) {
              vm.userTeamB1 = teamB1.data;
            } else {
              vm.eephusTeamB1 = teamB1.data;
            }
            $http.get(`/teams/${teamB1.data.team_id}`)
            .then(teamB1Team=>{
              if (team === vm.userTeam) {
                vm.userTeamB1Team = teamB1Team.data;
              } else {
                vm.eephusTeamB1Team = teamB1Team.data;
              }
            });
          });
        }
      }

      function updateBench2(team) {
        if (team.bench_2 !== null) {
          $http.get(`/players/${team.bench_2}`)
          .then(teamB2=>{
            if (team === vm.userTeam) {
              vm.userTeamB2 = teamB2.data;
            } else {
              vm.eephusTeamB2 = teamB2.data;
            }
            $http.get(`/teams/${teamB2.data.team_id}`)
            .then(teamB2Team=>{
              if (team === vm.userTeam) {
                vm.userTeamB2Team = teamB2Team.data;
              } else {
                vm.eephusTeamB2Team = teamB2Team.data;
              }
            });
          });
        }
      }

      function updateBench3(team) {
        if (team.bench_3 !== null) {
          $http.get(`/players/${team.bench_3}`)
          .then(teamB3=>{
            if (team === vm.userTeam) {
              vm.userTeamB3 = teamB3.data;
            } else {
              vm.eephusTeamB3 = teamB3.data;
            }
            $http.get(`/teams/${teamB3.data.team_id}`)
            .then(teamB3Team=>{
              if (team === vm.userTeam) {
                vm.userTeamB3Team = teamB3Team.data;
              } else {
                vm.eephusTeamB3Team = teamB3Team.data;
              }
            });
          });
        }
      }

      function updateBench4(team) {
        if (team.bench_4 !== null) {
          $http.get(`/players/${team.bench_4}`)
          .then(teamB4=>{
            if (team === vm.userTeam) {
              vm.userTeamB4 = teamB4.data;
            } else {
              vm.eephusTeamB4 = teamB4.data;
            }
            $http.get(`/teams/${teamB4.data.team_id}`)
            .then(teamB4Team=>{
              if (team === vm.userTeam) {
                vm.userTeamB4Team = teamB4Team.data;
              } else {
                vm.eephusTeamB4Team = teamB4Team.data;
              }
            });
          });
        }
      }

      function updateBench5(team) {
        if (team.bench_5 !== null) {
          $http.get(`/players/${team.bench_5}`)
          .then(teamB5=>{
            if (team === vm.userTeam) {
              vm.userTeamB5 = teamB5.data;
            } else {
              vm.eephusTeamB5 = teamB5.data;
            }
            $http.get(`/teams/${teamB5.data.team_id}`)
            .then(teamB5Team=>{
              if (team === vm.userTeam) {
                vm.userTeamB5Team = teamB5Team.data;
              } else {
                vm.eephusTeamB5Team = teamB5Team.data;
              }
            });
          });
        }
      }

      function updateCatcher(team) {
        if (team.catcher !== null) {
          $http.get(`/players/${team.catcher}`)
          .then(teamCatcher=>{
            if (team === vm.userTeam) {
              vm.userTeamCatcher = teamCatcher.data;
            } else {
              vm.eephusTeamCatcher = teamCatcher.data;
            }
            $http.get(`/teams/${teamCatcher.data.team_id}`)
            .then(teamCatcherTeam=>{
              if (team === vm.userTeam) {
                vm.userTeamCatcherTeam = teamCatcherTeam.data;
              } else {
                vm.eephusTeamCatcherTeam = teamCatcherTeam.data;
              }
            });
          });
        }
      }

      function updateRP1(team) {
        if (team.rp_1 !== null) {
          $http.get(`/players/${team.rp_1}`)
          .then(teamRP1=>{
            if (team === vm.userTeam) {
              vm.userTeamRP1 = teamRP1.data;
            } else {
              vm.eephusTeamRP1 = teamRP1.data;
            }
            $http.get(`/teams/${teamRP1.data.team_id}`)
            .then(teamRP1Team=>{
              if (team === vm.userTeam) {
                vm.userTeamRP1Team = teamRP1Team.data;
              } else {
                vm.eephusTeamRP1Team = teamRP1Team.data;
              }
            });
          });
        }
      }

      function updateRP2(team) {
        if (team.rp_2 !== null) {
          $http.get(`/players/${team.rp_2}`)
          .then(teamRP2=>{
            if (team === vm.userTeam) {
              vm.userTeamRP2 = teamRP2.data;
            } else {
              vm.eephusTeamRP2 = teamRP2.data;
            }
            $http.get(`/teams/${teamRP2.data.team_id}`)
            .then(teamRP2Team=>{
              if (team === vm.userTeam) {
                vm.userTeamRP2Team = teamRP2Team.data;
              } else {
                vm.eephusTeamRP2Team = teamRP2Team.data;
              }
            });
          });
        }
      }

      function updateField () {
        console.log('update the field!');
        updateLeftField(vm.userTeam);
        updateLeftField(vm.eephusTeam);
        updateSP2(vm.userTeam);
        updateSP2(vm.eephusTeam);
        updateCenterField(vm.userTeam);
        updateCenterField(vm.eephusTeam);
        updateThirdBase(vm.userTeam);
        updateThirdBase(vm.eephusTeam);
        updateShortstop(vm.userTeam);
        updateShortstop(vm.eephusTeam);
        updatePitcher1(vm.userTeam);
        updatePitcher1(vm.eephusTeam);
        updatePitcher2(vm.userTeam);
        updatePitcher2(vm.eephusTeam);
        updateSecondBase(vm.userTeam);
        updateSecondBase(vm.eephusTeam);
        updatePitcher3(vm.userTeam);
        updatePitcher3(vm.eephusTeam);
        updatePitcher4(vm.userTeam);
        updatePitcher4(vm.eephusTeam);
        updateSP1(vm.userTeam);
        updateSP1(vm.eephusTeam);
        updateRightField(vm.userTeam);
        updateRightField(vm.eephusTeam);
        updateUtility1(vm.userTeam);
        updateUtility1(vm.eephusTeam);
        updateFirstBase(vm.userTeam);
        updateFirstBase(vm.eephusTeam);
        updateUtility2(vm.userTeam);
        updateUtility2(vm.eephusTeam);
        updateBench1(vm.userTeam);
        updateBench1(vm.eephusTeam);
        updateBench2(vm.userTeam);
        updateBench2(vm.eephusTeam);
        updateBench3(vm.userTeam);
        updateBench3(vm.eephusTeam);
        updateBench4(vm.userTeam);
        updateBench4(vm.eephusTeam);
        updateBench5(vm.userTeam);
        updateBench5(vm.eephusTeam);
        updateCatcher(vm.userTeam);
        updateCatcher(vm.eephusTeam);
        updateRP1(vm.userTeam);
        updateRP1(vm.eephusTeam);
        updateRP2(vm.userTeam);
        updateRP2(vm.eephusTeam);
      }

      function deleteButtons () {
        // Deletes position buttons generated by draft
        var containingElement = document.getElementById('positionButtons');

        if (containingElement.hasChildNodes()) {
          while (containingElement.hasChildNodes()) {
            containingElement.removeChild(containingElement.firstChild);
          }
        }

      }

      function addPlayerToField (positionString, fieldTeam) {
        console.log("we made it to this sticky logic spot");
        console.log(playerArray.indexOf(vm.playerCard6));
        playerArray.splice(playerArray.indexOf(vm.playerCard6), 1);
        updatePlayerRibbonSlots('noFilter');
        updateDraftBar();
        switch (positionString) {
          case("Catcher"):
            fieldTeam.catcher = vm.playerCard6.id;
            break;
          case("First Base"):
            fieldTeam.first_base = vm.playerCard6.id;
            break;
          case("Second Base"):
          console.log("second base should be go");
            fieldTeam.second_base = vm.playerCard6.id;
            break;
          case("Third Base"):
            fieldTeam.third_base = vm.playerCard6.id;
            break;
          case("Shortstop"):
            fieldTeam.short_stop = vm.playerCard6.id;
            break;
          case("Left Field"):
            fieldTeam.outfield_1 = vm.playerCard6.id;
            break;
          case("Center Field"):
            fieldTeam.outfield_2 = vm.playerCard6.id;
            break;
          case("Right Field"):
            fieldTeam.outfield_3 = vm.playerCard6.id;
            break;
          case("Utility 1"):
            fieldTeam.util_1 = vm.playerCard6.id;
            break;
          case("Utility 2"):
            fieldTeam.util_2 = vm.playerCard6.id;
            break;
          case("Starting Pitcher 1"):
            fieldTeam.sp_1 = vm.playerCard6.id;
            break;
          case("Starting Pitcher 2"):
            fieldTeam.sp_2 = vm.playerCard6.id;
            break;
          case("Relief Pitcher 1"):
            fieldTeam.rp_1 = vm.playerCard6.id;
            break;
          case("Relief Pitcher 2"):
            fieldTeam.rp_2 = vm.playerCard6.id;
            break;
          case("Pitcher 1"):
            fieldTeam.p_1 = vm.playerCard6.id;
            break;
          case("Pitcher 2"):
            fieldTeam.p_2 = vm.playerCard6.id;
            break;
          case("Pitcher 3"):
            fieldTeam.p_3 = vm.playerCard6.id;
            break;
          case("Pitcher 4"):
            fieldTeam.p_4 = vm.playerCard6.id;
            break;
          case("Bench 1"):
            fieldTeam.bench_1 = vm.playerCard6.id;
            break;
          case("Bench 2"):
            fieldTeam.bench_2 = vm.playerCard6.id;
            break;
          case("Bench 3"):
            fieldTeam.bench_3 = vm.playerCard6.id;
            break;
          case("Bench 4"):
            fieldTeam.bench_4 = vm.playerCard6.id;
            break;
          case("Bench 5"):
            fieldTeam.bench_5 = vm.playerCard6.id;
            break;
          default:
            console.log("this condition should not be possible");
        }
        deleteButtons();
        var infoButton = document.getElementById('playerInfoButton');
        var draftButton = document.getElementById('playerDraftButton');
        var cancelButton = document.getElementById('playerCancelButton');
        infoButton.setAttribute("style", "display: inherit;");
        draftButton.setAttribute("style", "display: inherit;");
        cancelButton.setAttribute("style", "display: inherit;");
        $http.patch(`/fantasyteams/${fieldTeam.id}`, fieldTeam)
        .then(updatedTeam=>{
          console.log(updatedTeam);
          updateField();
          inputOn = true;
        });

      }

      function monitorClick (element, positionSetting, fieldTeam) {
        element.addEventListener('click', ()=>{
          addPlayerToField(positionSetting, fieldTeam);
        });
      }

      function generateInputButtonsForPosition(arrOfPositions, fieldTeam) {
        var parentElement = document.getElementById('positionButtons');
        var buttonElement;

        for (let i = 0; i < arrOfPositions.length; i++) {
          buttonElement = document.createElement('button');
          parentElement.appendChild(buttonElement, fieldTeam);
          buttonElement.textContent = arrOfPositions[i];
          monitorClick(buttonElement, arrOfPositions[i], fieldTeam);
        }
      }

      function draftPlayer() {
        var arrOfEligiblePositions = determinePositions(vm.playerCard6, vm.userTeam);
        console.log(arrOfEligiblePositions);
        if (arrOfEligiblePositions.length === 0) {
          spokenOutput("There is no available position for this player. Draft cancelled.");
          cancelDraft();
        } else {
          var infoButton = document.getElementById('playerInfoButton');
          var draftButton = document.getElementById('playerDraftButton');
          var cancelButton = document.getElementById('playerCancelButton');
          infoButton.setAttribute("style", "display: none;");
          draftButton.setAttribute("style", "display: none;");
          cancelButton.setAttribute("style", "display: none;");
          generateInputButtonsForPosition(arrOfEligiblePositions, vm.userTeam);
        }

      }

      function setDraftStage(player) {
        $http.get(`/teams/${player.team_id}`)
        .then(playerTeam=>{
          var team = playerTeam.data;
          inputOn = false;
          var stageLocation = document.getElementById('draftInfo');
          var leftArrow = document.getElementById('prev5');
          var rightArrow = document.getElementById('next5');
          leftArrow.setAttribute("style", "display: none;");
          rightArrow.setAttribute("style", "display: none;");
          stageLocation.setAttribute("style", "display: inherit;");
          vm.playerCard6 = player;
          vm.playerCard6Team = team;
          var stageCard = document.getElementById('playerInfoCard');
          stageCard.setAttribute("style", "background-color: " + vm.playerCard6Team.team_color_2 + "; border: solid 7px " + vm.playerCard6Team.team_color_1 + "; color: " + vm.playerCard6Team.team_color_3 + ";");
        });
      }

      function cancelDraft () {
        var hideStage = document.getElementById('draftInfo');
        hideStage.setAttribute("style", "display: none;");
        var arrow1 = document.getElementById('prev5');
        var arrow2 = document.getElementById('next5');
        arrow1.setAttribute("style", "display: inherit;");
        arrow2.setAttribute("style", "display: inherit;");
        inputOn = true;
      }

      function beginDraftBar() {

        $http.get('/players')
        .then(allPlayers=>{
          playerArray = allPlayers.data;
          var location;
          for (let i = 0; i < 5; i++) {
            location = playerArrayIndex + i;
            if (location >= playerArray.length) {
              location = location - playerArray.length;
            }
            playerRibbonSlots[i] = playerArray[location];

          }
          vm.playerCard1 = playerRibbonSlots[0];
          vm.playerCard1.positions = getPositionsString(vm.playerCard1);
          $http.get(`/teams/${vm.playerCard1.team_id}`)
          .then(playerCard1Team=>{
            vm.playerCard1Team = playerCard1Team.data;
            var firstCard = document.getElementById('playerCardNo1');
            firstCard.setAttribute("style", "background-color: " + vm.playerCard1Team.team_color_2 + "; border: solid 7px " + vm.playerCard1Team.team_color_1 + "; color: " + vm.playerCard1Team.team_color_3 + ";");
            vm.playerCard2 = playerRibbonSlots[1];
            vm.playerCard2.positions = getPositionsString(vm.playerCard2);
            $http.get(`/teams/${vm.playerCard2.team_id}`)
            .then(playerCard2Team=>{
              vm.playerCard2Team = playerCard2Team.data;
              var secondCard = document.getElementById('playerCardNo2');
              secondCard.setAttribute("style", "background-color: " + vm.playerCard2Team.team_color_2 + "; border: solid 7px " + vm.playerCard2Team.team_color_1 + "; color: " + vm.playerCard2Team.team_color_3 + ";");
              vm.playerCard3 = playerRibbonSlots[2];
              vm.playerCard3.positions = getPositionsString(vm.playerCard3);
              $http.get(`/teams/${vm.playerCard3.team_id}`)
              .then(playerCard3Team=>{
                vm.playerCard3Team = playerCard3Team.data;
                var thirdCard = document.getElementById('PlayerCardNo3');
                thirdCard.setAttribute("style", "background-color: " + vm.playerCard3Team.team_color_2 + "; border: solid 7px " + vm.playerCard3Team.team_color_1 + "; color: " + vm.playerCard3Team.team_color_3 + ";");
                vm.playerCard4 = playerRibbonSlots[3];
                vm.playerCard4.positions = getPositionsString(vm.playerCard4);
                $http.get(`/teams/${vm.playerCard4.team_id}`)
                .then(playerCard4Team=>{
                  vm.playerCard4Team = playerCard4Team.data;
                  var fourthCard = document.getElementById('PlayerCardNo4');
                  fourthCard.setAttribute("style", "background-color: " + vm.playerCard4Team.team_color_2 + "; border: solid 7px " + vm.playerCard4Team.team_color_1 + "; color: " + vm.playerCard4Team.team_color_3 + ";");
                  vm.playerCard5 = playerRibbonSlots[4];
                  vm.playerCard5.positions = getPositionsString(vm.playerCard5);
                  $http.get(`/teams/${vm.playerCard5.team_id}`)
                  .then(playerCard5Team=>{
                    vm.playerCard5Team = playerCard5Team.data;
                    var fifthCard = document.getElementById('playerCardNo5');
                    fifthCard.setAttribute("style", "background-color: " + vm.playerCard5Team.team_color_2 + "; border: solid 7px " + vm.playerCard5Team.team_color_1 + "; color: " + vm.playerCard5Team.team_color_3 + ";");
                  });
                });
              });
            });
          });
        });
      }

      function updatePlayerRibbonSlots(filter) {
        var location;
        if (filter === 'noFilter') {
          for (let i = 0; i < 5; i++) {
            location = playerArrayIndex + i;
            if (location >= playerArray.length) {
              location = location - playerArray.length;
            }
            playerRibbonSlots[i] = playerArray[location];

          }
        }
      }

      function updateDraftBar(){
        vm.playerCard1 = playerRibbonSlots[0];
        vm.playerCard1.positions = getPositionsString(vm.playerCard1);
        $http.get(`/teams/${vm.playerCard1.team_id}`)
        .then(playerCard1Team=>{
          vm.playerCard1Team = playerCard1Team.data;
          var firstCard = document.getElementById('playerCardNo1');
          firstCard.setAttribute("style", "background-color: " + vm.playerCard1Team.team_color_2 + "; border: solid 7px " + vm.playerCard1Team.team_color_1 + "; color: " + vm.playerCard1Team.team_color_3 + ";");
          vm.playerCard2 = playerRibbonSlots[1];
          vm.playerCard2.positions = getPositionsString(vm.playerCard2);
          $http.get(`/teams/${vm.playerCard2.team_id}`)
          .then(playerCard2Team=>{
            vm.playerCard2Team = playerCard2Team.data;
            var secondCard = document.getElementById('playerCardNo2');
            secondCard.setAttribute("style", "background-color: " + vm.playerCard2Team.team_color_2 + "; border: solid 7px " + vm.playerCard2Team.team_color_1 + "; color: " + vm.playerCard2Team.team_color_3 + ";");
            vm.playerCard3 = playerRibbonSlots[2];
            vm.playerCard3.positions = getPositionsString(vm.playerCard3);
            $http.get(`/teams/${vm.playerCard3.team_id}`)
            .then(playerCard3Team=>{
              vm.playerCard3Team = playerCard3Team.data;
              var thirdCard = document.getElementById('PlayerCardNo3');
              thirdCard.setAttribute("style", "background-color: " + vm.playerCard3Team.team_color_2 + "; border: solid 7px " + vm.playerCard3Team.team_color_1 + "; color: " + vm.playerCard3Team.team_color_3 + ";");
              vm.playerCard4 = playerRibbonSlots[3];
              vm.playerCard4.positions = getPositionsString(vm.playerCard4);
              $http.get(`/teams/${vm.playerCard4.team_id}`)
              .then(playerCard4Team=>{
                vm.playerCard4Team = playerCard4Team.data;
                var fourthCard = document.getElementById('PlayerCardNo4');
                fourthCard.setAttribute("style", "background-color: " + vm.playerCard4Team.team_color_2 + "; border: solid 7px " + vm.playerCard4Team.team_color_1 + "; color: " + vm.playerCard4Team.team_color_3 + ";");
                vm.playerCard5 = playerRibbonSlots[4];
                vm.playerCard5.positions = getPositionsString(vm.playerCard5);
                $http.get(`/teams/${vm.playerCard5.team_id}`)
                .then(playerCard5Team=>{
                  vm.playerCard5Team = playerCard5Team.data;
                  var fifthCard = document.getElementById('playerCardNo5');
                  fifthCard.setAttribute("style", "background-color: " + vm.playerCard5Team.team_color_2 + "; border: solid 7px " + vm.playerCard5Team.team_color_1 + "; color: " + vm.playerCard5Team.team_color_3 + ";");
                });
              });
            });
          });
        });
      }

      function scrollLeft () {
        if (playerArrayIndex === 0) {
          playerArrayIndex = (playerArray.length - 1);
        } else {
          playerArrayIndex -= 1;
        }
        updatePlayerRibbonSlots('noFilter');
        updateDraftBar();
      }

      function scrollRight () {
        if (playerArrayIndex === (playerArray.length - 1)) {
          playerArrayIndex = 0;
        } else {
          playerArrayIndex +=1;
        }
        updatePlayerRibbonSlots('noFilter');
        updateDraftBar();
      }

      function updateUserTeam (teamName) {
        var dialogBox = document.getElementById('newLeague');
        var draftBar = document.getElementById('draftContainer');
        dialogBox.setAttribute("style", "display: none;");
        draftBar.setAttribute("style", "display: inherit;");
        beginDraftBar();
        if (teamName.length) {
          vm.userTeam.team_name = teamName;
          $http.patch(`/fantasyteams/${vm.userTeam.id}`, vm.userTeam)
          .then(result=>{
            console.log(result);
          });
        }
      }

      function onInit() {
        $http.get('/baseballipsum')
        .then(ipsum=>{
          var ipsumString = ipsum.data[0];
          var leagueName = getName(ipsumString);
          var eephusTeamName = getName(ipsumString);
          var userTeamName = getName(ipsumString);
          $http.get('/users/1')
          .then(eephusAccount=>{
            vm.eephus = eephusAccount.data;
            $http.get('users/2')
            .then(userAccount=>{
              vm.user = userAccount.data;
              var createLeague = {};
              createLeague.match_name = leagueName;
              createLeague.away_team = vm.eephus.id;
              createLeague.home_team = vm.user.id;
              $http.post('/headtoheadmatchups', createLeague)
              .then(newLeague=>{
                vm.head2headLeague = newLeague.data[0];
                var newEephusTeam = {};
                newEephusTeam.team_name = eephusTeamName;
                newEephusTeam.owner = vm.eephus.id;
                $http.post('/fantasyteams', newEephusTeam)
                .then(eephusTeam=>{
                  vm.eephusTeam = eephusTeam.data[0];
                  var newUserTeam = {};
                  newUserTeam.team_name = userTeamName;
                  newUserTeam.owner = vm.user.id;
                  $http.post('/fantasyteams', newUserTeam)
                  .then(userTeam=>{
                    vm.userTeam = userTeam.data[0];
                    var draftContainer = document.getElementById('draftContainer');
                    draftContainer.addEventListener('click', (event)=>{
                      var card = event.target;
                      if ((card.id === "playerCard1")||(card.id === "playerCardNo1")||(card.id === "p1")) {
                        if (inputOn) {
                          draftStagePlayer = vm.playerCard1;
                          setDraftStage(vm.playerCard1);
                        }
                      }
                      if ((card.id === "PlayerCard2")||(card.id === "playerCardNo2")||(card.id === "p2")) {
                        if (inputOn) {
                          draftStagePlayer = vm.playerCard2;
                          setDraftStage(vm.playerCard2);
                        }
                      }
                      if ((card.id === "PlayerCard3")||(card.id === "PlayerCardNo3")||(card.id === "p3")) {
                        if (inputOn) {
                          draftStagePlayer = vm.playerCard3;
                          setDraftStage(vm.playerCard3);
                        }
                      }
                      if ((card.id === "PlayerCard4")||(card.id === "PlayerCardNo4")||(card.id === "p4")) {
                        if (inputOn) {
                          draftStagePlayer = vm.playerCard4;
                          setDraftStage(vm.playerCard4);
                        }
                      }
                      if ((card.id === "PlayerCard5")||(card.id === "playerCardNo5")||(card.id === "p5")) {
                        if (inputOn) {
                          draftStagePlayer = vm.playerCard5;
                          setDraftStage(vm.playerCard5);
                        }
                      }
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
