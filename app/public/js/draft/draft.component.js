(function() {
  'use strict';

  var playerArray = [];
  var playerArrayIndex = 0;
  var playerRibbonSlots = [];

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
                  });
                });
              });
            });
          });
        });
      }
    }

}());
