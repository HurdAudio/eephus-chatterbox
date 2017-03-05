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

  function talkSwap (bench, position) {
    var swapStr = '';
    var randomSet = Math.floor(Math.random()*7);

    switch (randomSet) {
      case(0):
        swapStr += "Swapping " + bench.first_name + " " + bench.last_name + " for " + position.first_name + " " + position.last_name + ". ";
        break;
      case(1):
        swapStr += "Number " + bench.jersey_number + " is going in for " + position.last_name + ". ";
        break;
      case(3):
        swapStr += "And we have a substitution ... " + position.first_name + " " + position.last_name + " is coming out to make room for " + bench.first_name + " " + bench.last_name + ". ";
        break;
      case(4):
        swapStr += "Making some moves here. It's " + bench.first_name + " " + bench.last_name + " taking the place of " + position.first_name + " " + position.last_name + ". ";
        break;
      case(5):
        swapStr += "We have an active manager on our hands, people. " + bench.first_name + " " + bench.last_name + " will be entering the lineup, now.";
        break;
      case(6):
        swapStr += position.first_name + " " + position.last_name + " will be coming out as " + bench.first_name + " " + bench.last_name + " is inserted into the action.";
        break;
      default:
        swapStr += "...";
    }


    return (swapStr);
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
      vm.bench1List = bench1List;
      vm.bench2List = bench2List;
      vm.bench3List = bench3List;
      vm.bench4List = bench4List;
      vm.bench5List = bench5List;
      vm.playerSwap = playerSwap;
      vm.generateDropdownMenu = generateDropdownMenu;

      function playerSwap (bench, position, inserter, theParent) {
        console.log("and here too");
        var temp = vm.userTeam[position];
        var benchPlayerName = {};
        var positionPlayerName = {};
        switch (bench) {
          case('bench1'):
            vm.userTeam[position] = vm.userTeam.bench_1;
            vm.userTeam.bench_1 = temp;
            break;
          case('bench2'):
            vm.userTeam[position] = vm.userTeam.bench_2;
            vm.userTeam.bench_2 = temp;
            break;
          case('bench3'):
            vm.userTeam[position] = vm.userTeam.bench_3;
            vm.userTeam.bench_3 = temp;
            break;
          case('bench4'):
            vm.userTeam[position] = vm.userTeam.bench_4;
            vm.userTeam.bench_4 = temp;
            break;
          case('bench5'):
            vm.userTeam[position] = vm.userTeam.bench_5;
            vm.userTeam.bench_5 = temp;
            break;
          default:
            console.log('working on it');
        }
        $http.patch(`/fantasyteams/${vm.userTeam.id}`, vm.userTeam)
        .then((data)=>{
          console.log(data.data);
          onInit();
          inserter.setAttribute("style", "display: inherit;");
          if (theParent.hasChildNodes()) {
            while (theParent.hasChildNodes()) {
              theParent.removeChild(theParent.firstChild);
            }
          }
          $http.get(`/players/${vm.userTeam[position]}`)
          .then(formerBench=>{
            benchPlayerName = formerBench.data;
            $http.get(`/players/${temp}`)
            .then(formerPosition=>{
              positionPlayerName = formerPosition.data;
              spokenOutput(talkSwap(benchPlayerName, positionPlayerName));
            });
          });

          });
        }




      function generateDropdownMenu(player, parentElement, whichBench, invisiButton) {

        //clear out any remaining elements
        // do {
        //   parentElement.removeChildNode(parentElement.lastChild);
        // } while((parentElement.hasChildNodes()));


        if (parentElement.hasChildNodes()) {
          while (parentElement.hasChildNodes()) {
            parentElement.removeChild(parentElement.firstChild);
          }
        }

        if (player.eligible_C) {
          var catcherOption = document.createElement('button');
          parentElement.appendChild(catcherOption);
          catcherOption.id = whichBench + "ToCatcher";
          var catcherText = document.createElement('p');
          catcherOption.appendChild(catcherText);
          catcherText.textContent = "Catcher";
          catcherOption.setAttribute("type", "button");
          catcherOption.addEventListener('click', ()=>{
            playerSwap(whichBench, 'catcher', invisiButton, parentElement);
          });
        }
        if (player.eligible_1B) {
          var firstBaseOption = document.createElement('button');
          parentElement.appendChild(firstBaseOption);
          firstBaseOption.id = whichBench + "ToFirstBase";
          var firstBaseText = document.createElement('p');
          firstBaseOption.appendChild(firstBaseText);
          firstBaseText.textContent = "First Base";
          firstBaseOption.setAttribute("type", "button");
          firstBaseOption.addEventListener('click', ()=>{
            playerSwap(whichBench, 'first_base', invisiButton, parentElement);
          });
        }
        if (player.eligible_2B) {
          var secondBaseOption = document.createElement('button');
          parentElement.appendChild(secondBaseOption);
          secondBaseOption.id = whichBench + "ToSecondBase";
          var secondBaseText = document.createElement('p');
          secondBaseOption.appendChild(secondBaseText);
          secondBaseText.textContent = "Second Base";
          secondBaseOption.setAttribute("type", "button");
          secondBaseOption.addEventListener('click', ()=>{
            playerSwap(whichBench, 'second_base', invisiButton, parentElement);
          });
        }
        if (player.eligible_3B) {
          var thirdBaseOption = document.createElement('button');
          parentElement.appendChild(thirdBaseOption);
          thirdBaseOption.id = whichBench + "ToThirdBase";
          var thirdBaseText = document.createElement('p');
          thirdBaseOption.appendChild(thirdBaseText);
          thirdBaseText.textContent = "Third Base";
          thirdBaseOption.setAttribute("type", "button");
          thirdBaseOption.addEventListener('click', ()=>{
            playerSwap(whichBench, 'third_base', invisiButton, parentElement);
          });
        }
        if (player.eligible_SS) {
          var shortstopOption = document.createElement('button');
          parentElement.appendChild(shortstopOption);
          shortstopOption.id = whichBench + "ToShortstop";
          var shortstopText = document.createElement('p');
          shortstopOption.appendChild(shortstopText);
          shortstopText.textContent = "Shortstop";
          shortstopOption.setAttribute("type", "button");
          shortstopOption.addEventListener('click', ()=>{
            playerSwap(whichBench, 'short_stop', invisiButton, parentElement);
          });
        }
        if (player.eligible_OF) {
          var leftFieldOption = document.createElement('button');
          var centerFieldOption = document.createElement('button');
          var rightFieldOption = document.createElement('button');
          parentElement.appendChild(leftFieldOption);
          parentElement.appendChild(centerFieldOption);
          parentElement.appendChild(rightFieldOption);
          leftFieldOption.id = whichBench + "ToLeftField";
          centerFieldOption.id = whichBench + "ToCenterField";
          rightFieldOption.id = whichBench + "ToRightField";
          var leftFieldText = document.createElement('p');
          var centerFieldText = document.createElement('p');
          var rightFieldText = document.createElement('p');
          leftFieldOption.appendChild(leftFieldText);
          centerFieldOption.appendChild(centerFieldText);
          rightFieldOption.appendChild(rightFieldText);
          leftFieldText.textContent = "Left Field";
          centerFieldText.textContent = "Center Field";
          rightFieldText.textContent = "Right Field";
          leftFieldOption.setAttribute("type", "button");
          leftFieldOption.addEventListener('click', ()=>{
            playerSwap(whichBench, 'outfield_1', invisiButton, parentElement);
          });
          centerFieldOption.setAttribute("type", "button");
          centerFieldOption.addEventListener('click', ()=>{
            playerSwap(whichBench, 'outfield_2', invisiButton, parentElement);
          });
          rightFieldOption.setAttribute("type", "button");
          rightFieldOption.addEventListener('click', ()=>{
            playerSwap(whichBench, 'outfield_3', invisiButton, parentElement);
          });
        }
        if (player.eligible_util) {
          var utility1Option = document.createElement('button');
          var utility2Option = document.createElement('button');
          parentElement.appendChild(utility1Option);
          parentElement.appendChild(utility2Option);
          utility1Option.id = whichBench + "ToUtility1";
          utility2Option.id = whichBench + "ToUtility2";
          var utility1Text = document.createElement('p');
          var utility2Text = document.createElement('p');
          utility1Option.appendChild(utility1Text);
          utility2Option.appendChild(utility2Text);
          utility1Text.textContent = "Utility 1";
          utility2Text.textContent = "Utility 2";
          utility1Option.setAttribute("type", "button");
          utility1Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'util_1', invisiButton, parentElement);
          });
          utility2Option.setAttribute("type", "button");
          utility2Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'util_2', invisiButton, parentElement);
          });
        }
        if ((player.eligible_SP) && (!player.eligible_RP)) {
          var startingPitcher1Option = document.createElement('button');
          var startingPitcher2Option = document.createElement('button');
          var pitcher1Option = document.createElement('button');
          var pitcher2Option = document.createElement('button');
          var pitcher3Option = document.createElement('button');
          var pitcher4Option = document.createElement('button');
          parentElement.appendChild(startingPitcher1Option);
          parentElement.appendChild(startingPitcher2Option);
          parentElement.appendChild(pitcher1Option);
          parentElement.appendChild(pitcher2Option);
          parentElement.appendChild(pitcher3Option);
          parentElement.appendChild(pitcher4Option);
          startingPitcher1Option.id = whichBench + "ToSP1";
          startingPitcher2Option.id = whichBench + "ToSP2";
          pitcher1Option.id = whichBench + "ToP1";
          pitcher2Option.id = whichBench + "ToP2";
          pitcher3Option.id = whichBench + "ToP3";
          pitcher4Option.id = whichBench + "ToP4";
          var startingPitcher1Text = document.createElement('p');
          var startingPitcher2Text = document.createElement('p');
          var pitcher1Text = document.createElement('p');
          var pitcher2Text = document.createElement('p');
          var pitcher3Text = document.createElement('p');
          var pitcher4Text = document.createElement('p');
          startingPitcher1Option.appendChild(startingPitcher1Text);
          startingPitcher2Option.appendChild(startingPitcher2Text);
          pitcher1Option.appendChild(pitcher1Text);
          pitcher2Option.appendChild(pitcher2Text);
          pitcher3Option.appendChild(pitcher3Text);
          pitcher4Option.appendChild(pitcher4Text);
          startingPitcher1Text.textContent = "Starting Pitcher 1";
          startingPitcher2Text.textContent = "Starting Pitcher 2";
          pitcher1Text.textContent = "Pitcher 1";
          pitcher2Text.textContent = "Pitcher 2";
          pitcher3Text.textContent = "Pitcher 3";
          pitcher4Text.textContent = "Pitcher 4";
          startingPitcher1Option.setAttribute("type", "button");
          startingPitcher1Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'sp_1', invisiButton, parentElement);
          });
          startingPitcher2Option.setAttribute("type", "button");
          startingPitcher2Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'sp_2', invisiButton, parentElement);
          });
          pitcher1Option.setAttribute("type", "button");
          pitcher1Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'p_1', invisiButton, parentElement);
          });
          pitcher2Option.setAttribute("type", "button");
          pitcher2Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'p_2', invisiButton, parentElement);
          });
          pitcher3Option.setAttribute("type", "button");
          pitcher3Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'p_3', invisiButton, parentElement);
          });
          pitcher4Option.setAttribute("type", "button");
          pitcher4Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'p_4', invisiButton, parentElement);
          });
        }
        if ((!player.eligible_SP) && (player.eligible_RP)) {
          var _reliefPitcher1Option = document.createElement('button');
          var _reliefPitcher2Option = document.createElement('button');
          var _pitcher1Option = document.createElement('button');
          var _pitcher2Option = document.createElement('button');
          var _pitcher3Option = document.createElement('button');
          var _pitcher4Option = document.createElement('button');
          parentElement.appendChild(_reliefPitcher1Option);
          parentElement.appendChild(_reliefPitcher2Option);
          parentElement.appendChild(_pitcher1Option);
          parentElement.appendChild(_pitcher2Option);
          parentElement.appendChild(_pitcher3Option);
          parentElement.appendChild(_pitcher4Option);
          _reliefPitcher1Option.id = whichBench + "ToRP1";
          _reliefPitcher2Option.id = whichBench + "ToRP2";
          _pitcher1Option.id = whichBench + "ToP1";
          _pitcher2Option.id = whichBench + "ToP2";
          _pitcher3Option.id = whichBench + "ToP3";
          _pitcher4Option.id = whichBench + "ToP4";
          var _reliefPitcher1Text = document.createElement('p');
          var _reliefPitcher2Text = document.createElement('p');
          var _pitcher1Text = document.createElement('p');
          var _pitcher2Text = document.createElement('p');
          var _pitcher3Text = document.createElement('p');
          var _pitcher4Text = document.createElement('p');
          _reliefPitcher1Option.appendChild(_reliefPitcher1Text);
          _reliefPitcher2Option.appendChild(_reliefPitcher2Text);
          _pitcher1Option.appendChild(_pitcher1Text);
          _pitcher2Option.appendChild(_pitcher2Text);
          _pitcher3Option.appendChild(_pitcher3Text);
          _pitcher4Option.appendChild(_pitcher4Text);
          _reliefPitcher1Text.textContent = "Relief Pitcher 1";
          _reliefPitcher2Text.textContent = "Relief Pitcher 2";
          _pitcher1Text.textContent = "Pitcher 1";
          _pitcher2Text.textContent = "Pitcher 2";
          _pitcher3Text.textContent = "Pitcher 3";
          _pitcher4Text.textContent = "Pitcher 4";
          _reliefPitcher1Option.setAttribute("type", "button");
          _reliefPitcher1Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'rp_1', invisiButton, parentElement);
          });
          _reliefPitcher2Option.setAttribute("type", "button");
          _reliefPitcher2Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'rp_2', invisiButton, parentElement);
          });
          _pitcher1Option.setAttribute("type", "button");
          _pitcher1Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'p_1', invisiButton, parentElement);
          });
          _pitcher2Option.setAttribute("type", "button");
          _pitcher2Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'p_2', invisiButton, parentElement);
          });
          _pitcher3Option.setAttribute("type", "button");
          _pitcher3Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'p_3', invisiButton, parentElement);
          });
          _pitcher4Option.setAttribute("type", "button");
          _pitcher4Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'p_4', invisiButton, parentElement);
          });
        }
        if ((player.eligible_SP) && (player.eligible_RP)) {
          var __startingPitcher1Option = document.createElement('button');
          var __startingPitcher2Option = document.createElement('button');
          var __reliefPitcher1Option = document.createElement('button');
          var __reliefPitcher2Option = document.createElement('button');
          var __pitcher1Option = document.createElement('button');
          var __pitcher2Option = document.createElement('button');
          var __pitcher3Option = document.createElement('button');
          var __pitcher4Option = document.createElement('button');
          parentElement.appendChild(__startingPitcher1Option);
          parentElement.appendChild(__startingPitcher2Option);
          parentElement.appendChild(__reliefPitcher1Option);
          parentElement.appendChild(__reliefPitcher2Option);
          parentElement.appendChild(__pitcher1Option);
          parentElement.appendChild(__pitcher2Option);
          parentElement.appendChild(__pitcher3Option);
          parentElement.appendChild(__pitcher4Option);
          __startingPitcher1Option.id = whichBench + "ToSP1";
          __startingPitcher2Option.id = whichBench + "ToSP2";
          __reliefPitcher1Option.id = whichBench + "ToRP1";
          __reliefPitcher2Option.id = whichBench + "ToRP2";
          __pitcher1Option.id = whichBench + "ToP1";
          __pitcher2Option.id = whichBench + "ToP2";
          __pitcher3Option.id = whichBench + "ToP3";
          __pitcher4Option.id = whichBench + "ToP4";
          var __startingPitcher1Text = document.createElement('p');
          var __startingPitcher2Text = document.createElement('p');
          var __reliefPitcher1Text = document.createElement('p');
          var __reliefPitcher2Text = document.createElement('p');
          var __pitcher1Text = document.createElement('p');
          var __pitcher2Text = document.createElement('p');
          var __pitcher3Text = document.createElement('p');
          var __pitcher4Text = document.createElement('p');
          __startingPitcher1Option.appendChild(__startingPitcher1Text);
          __startingPitcher2Option.appendChild(__startingPitcher2Text);
          __reliefPitcher1Option.appendChild(__reliefPitcher1Text);
          __reliefPitcher2Option.appendChild(__reliefPitcher2Text);
          __pitcher1Option.appendChild(__pitcher1Text);
          __pitcher2Option.appendChild(__pitcher2Text);
          __pitcher3Option.appendChild(__pitcher3Text);
          __pitcher4Option.appendChild(__pitcher4Text);
          __startingPitcher1Text.textContent = "Starting Pitcher 1";
          __startingPitcher2Text.textContent = "Starting Pitcher 2";
          __reliefPitcher1Text.textContent = "Relief Pitcher 1";
          __reliefPitcher2Text.textContent = "Relief Pitcher 2";
          __pitcher1Text.textContent = "Pitcher 1";
          __pitcher2Text.textContent = "Pitcher 2";
          __pitcher3Text.textContent = "Pitcher 3";
          __pitcher4Text.textContent = "Pitcher 4";
          __startingPitcher1Option.setAttribute("type", "button");
          __startingPitcher1Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'sp_1', invisiButton, parentElement);
          });
          __startingPitcher2Option.setAttribute("type", "button");
          __startingPitcher2Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'sp_2', invisiButton, parentElement);
          });
          __reliefPitcher1Option.setAttribute("type", "button");
          __reliefPitcher1Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'rp_1', invisiButton, parentElement);
          });
          __reliefPitcher2Option.setAttribute("type", "button");
          __reliefPitcher2Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'rp_2', invisiButton, parentElement);
          });
          __pitcher1Option.setAttribute("type", "button");
          __pitcher1Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'p_1', invisiButton, parentElement);
          });
          __pitcher2Option.setAttribute("type", "button");
          __pitcher2Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'p_2', invisiButton, parentElement);
          });
          __pitcher3Option.setAttribute("type", "button");
          __pitcher3Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'p_3', invisiButton, parentElement);
          });
          __pitcher4Option.setAttribute("type", "button");
          __pitcher4Option.addEventListener('click', ()=>{
            playerSwap(whichBench, 'p_4', invisiButton, parentElement);
          });
        }
      }

      function bench1List() {
        var bench1_dropdown = document.getElementById('dropdownBench1');
        var bench1InsertButton = document.getElementById('bench1Inserter');
        bench1InsertButton.setAttribute("style", "display: none;");
        generateDropdownMenu(vm.userTeamB1, bench1_dropdown, "bench1", bench1InsertButton);

      }

      function bench2List() {
        var bench2_dropdown = document.getElementById('dropdownBench2');
        var bench2InsertButton = document.getElementById('bench2Inserter');
        bench2InsertButton.setAttribute("style", "display: none;");
        generateDropdownMenu(vm.userTeamB2, bench2_dropdown, "bench2", bench2InsertButton);

      }

      function bench3List() {
        var bench3_dropdown = document.getElementById('dropdownBench3');
        var bench3InsertButton = document.getElementById('bench3Inserter');
        bench3InsertButton.setAttribute("style", "display: none;");
        generateDropdownMenu(vm.userTeamB3, bench3_dropdown, "bench3", bench3InsertButton);

      }

      function bench4List() {
        var bench4_dropdown = document.getElementById('dropdownBench4');
        var bench4InsertButton = document.getElementById('bench4Inserter');
        bench4InsertButton.setAttribute("style", "display: none;");
        generateDropdownMenu(vm.userTeamB4, bench4_dropdown, "bench4", bench4InsertButton);

      }

      function bench5List() {
        var bench5_dropdown = document.getElementById('dropdownBench5');
        var bench5InsertButton = document.getElementById('bench5Inserter');
        bench5InsertButton.setAttribute("style", "display: none;");
        generateDropdownMenu(vm.userTeamB5, bench5_dropdown, "bench5", bench5InsertButton);

      }



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
