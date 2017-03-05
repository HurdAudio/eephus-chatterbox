(function() {
  'use strict';

  var catcher = 0;
  var catcherTeam = 1;
  var firstBase = 2;
  var firstBaseTeam = 3;
  var secondBase = 4;
  var secondBaseTeam = 5;
  var thirdBase = 6;
  var thirdBaseTeam = 7;
  var shortstop = 8;
  var shortstopTeam = 9;
  var outfield1 = 10;
  var outfield1Team = 11;
  var outfield2 = 12;
  var outfield2Team = 13;
  var outfield3 = 14;
  var outfield3Team = 15;
  var utility1 = 16;
  var utility1Team = 17;
  var utility2 = 18;
  var utility2Team = 19;
  var startingPitcher1 = 20;
  var startingPitcher1Team = 21;
  var startingPitcher2 = 22;
  var startingPitcher2Team = 23;
  var reliefPitcher1 = 24;
  var reliefPitcher1Team = 25;
  var reliefPitcher2 = 26;
  var reliefPitcher2Team = 27;
  var pitcher1 = 28;
  var pitcher1Team = 29;
  var pitcher2 = 30;
  var pitcher2Team = 31;
  var pitcher3 = 32;
  var pitcher3Team = 33;
  var pitcher4 = 34;
  var pitcher4Team = 35;
  var bench1 = 36;
  var bench1Team = 37;
  var bench2 = 38;
  var bench2Team = 39;
  var bench3 = 40;
  var bench3Team = 41;
  var bench4 = 42;
  var bench4Team = 43;
  var bench5 = 44;
  var bench5Team = 45;

  function determineUserTeam (userData, awayData) {
    var team;
    if (awayData.owner === userData.id) {
      team = "away";
    } else {
      team = "home";
    }

    return (team);
  }

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

  function initialGreetingString () {
    var greeting = '...';
    var randomGreet = Math.floor(Math.random() * 11);

    switch (randomGreet) {
      case (0):
       greeting = "Welcome to your head to head matchup league. ";
       break;
      case (1):
        greeting = "Let's have a friendly matchup, my friend. ";
        break;
      case (2):
        greeting = "Here we are at the head to head zone. ";
        break;
      case (3):
        greeting = "It's a great day for a ballgame. Let's play many. ";
        break;
      case (4):
        greeting = "Here is an overview of our friendly rivalry. ";
        break;
      case (5):
        greeting = "Hello... hello. And let's play ball. ";
        break;
      case (6):
        greeting = "Well, now. Let's have a look at this league. ";
        break;
      case (7):
        greeting = "Now here is a simmering rivalry. ";
        break;
      case (8):
        greeting = "It's you and me against the world... or at least against each other. ";
        break;
      case (9):
        greeting = "There's no crying in baseball. So let's get vicious in this here league. ";
        break;
      case (10):
        greeting = "Welcome to the thunderdome of head to head matchups. ";
        break;
      case (11):
        greeting = "Greetings, my fellow manager. ";
        break;
      default:
        greeting = "Hello... ";
    }

    greeting += "... ... ... ";


    return (greeting);
  }


  function assembleSecondaryGreetingString(leagueName, userManager, userTeamName, eephusTeamName, arrOfUserTeam, arrOfEephusTeam){
    var greeting = '';

    // League name
    var randomLeagueNameIntro = Math.floor(Math.random()*7);
    switch (randomLeagueNameIntro) {
      case(0):
        greeting += leagueName + " is in the house. ";
        break;
      case(1):
        greeting += "The " + leagueName + ". ";
        break;
      case(2):
        greeting += "Head to head action with the " + leagueName + " league. ";
        break;
      case(3):
        greeting += "Let's see how this " + leagueName + " is shaping up. ";
        break;
      case(4):
        greeting += leagueName + ". ";
        break;
      case(5):
        greeting += "We are the " + leagueName + " league. ";
        break;
      case(6):
        greeting += "Let's check out the " + leagueName + ". ";
        break;
      case(7):
        greeting += "Check out this " + leagueName + ". ";
        break;
      default:
        greeting += "... ";
    }

    // Teams and managers
    randomLeagueNameIntro = Math.floor(Math.random()*13);
    switch (randomLeagueNameIntro) {
      case(0):
        greeting += "It's the " + userTeamName + " versus the " + eephusTeamName + ". ";
        break;
      case(1):
        greeting += userManager + " brings us hard hitting action with the " + userTeamName + " as they try to top the " + eephusTeamName + "... managed by yours truly. ";
        break;
      case(2):
        greeting += "I will be managing my illustrious " + eephusTeamName + " against the dastardly " + userTeamName + ". ";
        break;
      case(3):
        greeting += "The " + userTeamName + " and " + eephusTeamName + " break bread today as they pile on the innings. ";
        break;
      case(4):
        greeting += "We have the " + userTeamName + "... managed by " + userManager + "... versus the " + eephusTeamName + " ... managed by Eephus Chatterbox. If there's one thing I know... it's baseball. You are going down, sucker. ";
        break;
      case(5):
        greeting += "The " + eephusTeamName + " are swinging some heavy bats today as they take on " + userManager + " band of hard hitting fellows on the " + userTeamName + ". ";
        break;
      case(6):
        greeting += "We are in for a treat today as " + userManager + " manages the " + userTeamName + " in a head to head battle against my " + eephusTeamName + ". ";
        break;
      case(7):
        greeting += "Sweet dreams are made of these... Who am I to disagree? These are a couple of sweet dream teams as the sensational " + userTeamName + " lock bats with the " + eephusTeamName + ". ";
        break;
      case(8):
        greeting += "Breaking bats and breaking hearts everywhere they go, my " + eephusTeamName + " will be waging baseball against " + userManager + " and the " + userTeamName + ". ";
        break;
      case(9):
        greeting += "I will be plying my digital baseball knowledge against the " + userTeamName + " as my " + eephusTeamName + " bring a little head to head action to our day. ";
        break;
      case(10):
        greeting += "I've heard that these " + userTeamName + " really know how to run the bases. I always say that counter-clockwise is the way to do it. ";
        break;
      case(11):
        greeting += "So... " + userManager + "... I see that you've brought the " + userTeamName + " to take on my " + eephusTeamName + ". ";
        break;
      case(12):
        greeting += "It's a bat and pony show for sure as " + userManager + " shows off the studs on the diamond in the form of the " + userTeamName + ". ";
        break;
      case(13):
        greeting += userTeamName + "goes head to head against Eephus Chatterbox ... that would be me ... as I manage the " + eephusTeamName + " in some friendly head to head. ";
        break;
      default:
        greeting += "... ";
    }

    greeting += "... ";

    // Color Intro
    randomLeagueNameIntro = Math.floor(Math.random()*34);
    switch (randomLeagueNameIntro) {
      case(0):
        greeting += "... Keep an eye on catcher " + arrOfUserTeam[catcher].first_name + " " + arrOfUserTeam[catcher].last_name + " swinging a bat for the " + userTeamName + "... Eephus Chatterbox will counter with number " + arrOfEephusTeam[catcher].jersey_number + " of the " + arrOfEephusTeam[catcherTeam].city + " " + arrOfEephusTeam[catcherTeam].name + " catching behind the dish... " + arrOfEephusTeam[catcher].first_name + " " + arrOfEephusTeam[catcher].last_name + ". ";
        break;
      case(1):
        var nick = arrOfUserTeam[firstBase].nickname;
        if (nick === null) {
          nick = arrOfUserTeam[firstBase].last_name;
        }
        var avg = arrOfUserTeam[firstBase].projected_2017_AVG.toString();
        avg = avg.slice(2);
        greeting += "... There is a hot bat over at first base for " + userManager + " as " + nick + " is projected to hit " + avg + " over the season... ";
        break;
      case(2):
        greeting += userTeamName + " are looking pretty hot at second base as " + arrOfUserTeam[secondBase].first_name + " " + arrOfUserTeam[secondBase].last_name + " brings a sweet swing to any matchup. ... " + arrOfEephusTeam[secondBase].first_name + " " + arrOfEephusTeam[secondBase].last_name + " of the " + arrOfEephusTeam[secondBaseTeam].name + " will be countering for the " + eephusTeamName + ". ";
        break;
      case(3):
        var hander = arrOfUserTeam[thirdBase].bats_LR;
        if (hander === "R") {
          hander = " right handed ";
        } else if (hander === "L") {
          hander = " left handed ";
        } else {
          hander = " switch ";
        }
        greeting += userTeamName + " turn to the " + arrOfUserTeam[thirdBaseTeam].name + " " + arrOfUserTeam[thirdBase].first_name + " " + arrOfUserTeam[thirdBase].last_name + " to man the hot corner today. The " + hander + " hitter can be a real presence at the plate. ";
        break;
      case(4):
        greeting += "The outfield for the " + userTeamName + " can be a real dandy as they pack some potent lumber. Keep an eye on " + arrOfUserTeam[outfield1].first_name + " " + arrOfUserTeam[outfield1].last_name + " of the " + arrOfUserTeam[outfield1Team].city + " " + arrOfUserTeam[outfield1Team].name + "... He can be a real threat when he connects at the plate. ";
        break;
      case(5):
        var handed = arrOfUserTeam[outfield2].bats_LR;
        if (handed === 'R') {
          handed = "right handed hitter ";
        } else if (handed === "L") {
          handed = "left handed hitter ";
        } else {
          handed = "switch hitter ";
        }
        greeting += userManager + " features the " + handed + arrOfUserTeam[outfield2].first_name + " " + arrOfUserTeam[outfield2].last_name + " patrolling the outfield and generally making pitchers nervous with his bat. ";
        break;
      case(6):
        greeting += arrOfUserTeam[outfield3].first_name + " " + arrOfUserTeam[outfield3].last_name + " is projected to score " + arrOfUserTeam[outfield3].projected_2017_R + " runs this year. That's some impressive offense for the " + userTeamName + ". ";
        break;
      case(7):
        greeting += userManager + " brings bats o-plenty as " + arrOfUserTeam[utility1].first_name + " " + arrOfUserTeam[utility1].last_name + " looks to pile on some offensive stats for the powerhouse " + userTeamName +". ";
        break;
      case(8):
        greeting += "The " + userTeamName + " dial the offense to eleven with the ridiculous bat of " + arrOfUserTeam[utility2].first_name + " " + arrOfUserTeam[utility2].last_name + " of the " + arrOfUserTeam[utility2Team].name + ". ";
        break;
      case(9):
        greeting += "The " + userTeamName + " are bringing heat in the form of " + arrOfUserTeam[startingPitcher1].first_name + " " + arrOfUserTeam[startingPitcher1].last_name + " working the bump... toeing the rubber... and mowing down hapless hitters for the " + arrOfUserTeam[startingPitcher1Team].city + " " + arrOfUserTeam[startingPitcher1Team].name + ". ";
        break;
      case(10):
        greeting += "They say that " + arrOfUserTeam[startingPitcher2].first_name + " " + arrOfUserTeam[startingPitcher2].last_name + " will be good for " + arrOfUserTeam[startingPitcher2].projected_2017_W + " wins this year. All of those in the service of the " + userTeamName + ". ";
        break;
      case(11):
        greeting += "We may see some action from reliever " + arrOfUserTeam[reliefPitcher1].first_name + " " + arrOfUserTeam[reliefPitcher1].last_name + " lurking in the bullpen for the " + userTeamName + ". ";
        break;
      case(12):
        greeting += arrOfUserTeam[reliefPitcher2].first_name + " " + arrOfUserTeam[reliefPitcher2].last_name + " of the " + arrOfUserTeam[reliefPitcher2Team].city + " " + arrOfUserTeam[reliefPitcher2Team].name + " leads an outstanding bullpen for the " + userTeamName + ". ";
        break;
      case(13):
        greeting += "The " + userTeamName + " keep the pressure on with " + arrOfUserTeam[pitcher1].first_name + " " + arrOfUserTeam[pitcher1].last_name + " of the " + arrOfUserTeam[pitcher1Team].city + " " + arrOfUserTeam[pitcher1Team].name + " and his projected " + arrOfUserTeam[pitcher1].projected_2017_K + " strikeouts for the season. ";
        break;
      case(14):
        greeting += "The boys on " + eephusTeamName + " are not looking forward to facing " + arrOfUserTeam[pitcher2].first_name + " " + arrOfUserTeam[pitcher2].last_name + ". ";
        break;
      case(15):
        var hp = arrOfUserTeam[pitcher3].throws_LR;
        if (hp === "R") {
          hp = "right-handed ";
        } else {
          hp = "left-handed ";
        }
        greeting += "We will be sure to keep an eye on the " + hp + " pitching antics of " + arrOfUserTeam[pitcher3].first_name + " " + arrOfUserTeam[pitcher3].last_name + " of " + arrOfUserTeam[pitcher3Team].city + ". He could be lending his pitch selection to the " + userTeamName + " today. ";
        break;
      case(16):
        greeting += "How good is the pitching for the " + userTeamName + "? Well... look no further than the steady presence of " + arrOfUserTeam[pitcher4].first_name + " " + arrOfUserTeam[pitcher4].last_name + " of the " + arrOfUserTeam[pitcher4Team].city + " " + arrOfUserTeam[pitcher4Team].name + " working on the hill. He can silence those " + eephusTeamName + " bats when he's on his game.";
        break;
      case(17):
        greeting += "The " + eephusTeamName + " will be drawing upon the " + arrOfEephusTeam[catcherTeam].city + " " + arrOfEephusTeam[catcherTeam].name + " for their catching duties with the ever reliable " + arrOfEephusTeam[catcher].first_name + " " + arrOfEephusTeam[catcher].last_name + " working behind the plate.";
        break;
      case(18):
        greeting += "What do you call a terrifying power bat manning first base? Why, you call him " + arrOfEephusTeam[firstBase].first_name + " " + arrOfEephusTeam[firstBase].last_name + " of course. The " + arrOfEephusTeam[firstBaseTeam].name + " slugger is expected to drive in " + arrOfEephusTeam[firstBase].projected_2017_RBI + " runs this year. All in the service of the mighty Eephus Chatterbox and the " + eephusTeamName + ". ";
        break;
      case(19):
        greeting += "Offensive stats will be raining down from second base as the " + eephusTeamName + " bring out the batting and base prowess of " + arrOfEephusTeam[secondBase].first_name + " " + arrOfEephusTeam[secondBase].last_name + " into this matchup.";
      break;
      case(20):
        greeting += "He is more than a power bat from the corner for the " + eephusTeamName + ". He is a projected " + arrOfEephusTeam[thirdBase].projected_2017_HR + " home runs and " + arrOfEephusTeam[thirdBase].projected_2017_RBI + " runs driven in for the season." + arrOfEephusTeam[thirdBase].first_name + " " + arrOfEephusTeam[thirdBase].last_name + " is an offensive powerhouse.  I'll take it.";
        break;
      case(21):
        var nickname = '';
        if (arrOfEephusTeam[outfield1].nickname !== null) {
          nickname = arrOfEephusTeam[outfield1].nickname;
        } else {
          nickname = arrOfEephusTeam[outfield1].last_name;
        }
        greeting += "They call him " + nickname + ", and when he gets hot, the " + eephusTeamName + " are sure to benefit from the " + arrOfEephusTeam[outfield1Team].city + " " + arrOfEephusTeam[outfield1Team].name + " slugger known to his fans and opponents alike as " + arrOfEephusTeam[outfield1].first_name + " " + arrOfEephusTeam[outfield1].last_name + ". ";
        break;
      case(22):
        greeting += "There are a good " + arrOfEephusTeam[outfield2].projected_2017_HR + " home runs lurking in the bat of " + arrOfEephusTeam[outfield2].first_name + " " + arrOfEephusTeam[outfield2].last_name + " for the " + eephusTeamName + " . ";
        break;
      case(23):
        greeting += "He wears number " + arrOfEephusTeam[outfield3].jersey_number + " and he's always ready to do damage for the " + eephusTeamName + ". " + arrOfEephusTeam[outfield3].first_name + " " + arrOfEephusTeam[outfield3].last_name + " is basically " +  arrOfEephusTeam[outfield3].projected_2017_RBI + " Are Bee eyes waiting to inflict damage upon the " + userTeamName + ". ";
        break;
      case(24):
        var pitcherHand = arrOfEephusTeam[startingPitcher1].throws_LR;
        if (pitcherHand === 'R') {
          pitcherHand = "right handed pitcher ";
        } else {
          pitcherHand = "southpaw pitcher ";
        }
        greeting += "With a projected " + arrOfEephusTeam[startingPitcher1].projected_2017_W + " wins on " + arrOfEephusTeam[startingPitcher1].projected_2017_K + " strikeouts, the " + pitcherHand + "of the " + arrOfEephusTeam[startingPitcher1Team].city + " " + arrOfEephusTeam[startingPitcher1Team].name + " will bring his A. game to the " + eephusTeamName + ". " + arrOfEephusTeam[startingPitcher1].first_name + " " + arrOfEephusTeam[startingPitcher1].last_name + " is the real deal. ";
        break;
      case(25):
        var phand = arrOfEephusTeam[startingPitcher2].throws_LR;
        if (phand === "R") {
          phand = "Right hander ";
        } else {
          phand = "Lefty ";
        }
        greeting += "Good luck standing in the batter's box against my starting pitcher from the " + arrOfEephusTeam[startingPitcher2Team].city + " " + arrOfEephusTeam[startingPitcher2Team].name + ". " + phand + " " + arrOfEephusTeam[startingPitcher2].first_name + " " + arrOfEephusTeam[startingPitcher2].last_name + " is a man on a mission for the " + eephusTeamName + ". ";
        break;
      case(26):
        greeting += "You haven't heard the door slam until you've heard " + arrOfEephusTeam[reliefPitcher1].first_name + " " + arrOfEephusTeam[reliefPitcher1].last_name + " slam the door on opposing hitters. Expect hard times ahead for the hitters of the " + userTeamName + ". ";
        break;
      case(27):
        greeting += "Oh what a relief it is to have a reliever like " + arrOfEephusTeam[reliefPitcher2].first_name + " " + arrOfEephusTeam[reliefPitcher2].last_name + " doing reliever duties on behalf of my " + eephusTeamName + ". ";
        break;
      case(28):
        var paws = arrOfEephusTeam[pitcher1].throws_LR;
        if (paws === "R") {
          paws = " right handed pitcher ";
        } else {
          paws = " southpaw pitcher ";
        }
        greeting += "We expect to see around " + arrOfEephusTeam[pitcher1].projected_2017_IP + " innings of work from " + paws + arrOfEephusTeam[pitcher1].first_name + " " + arrOfEephusTeam[pitcher1].last_name + " as he looks to make short work of the " + userTeamName + ". ";
        break;
      case(29):
        greeting += "The " + eephusTeamName + " have got a live arm in the form of " + arrOfEephusTeam[pitcher2].first_name + " " + arrOfEephusTeam[pitcher2].last_name + " of the " + arrOfEephusTeam[pitcher2Team].city + " " + arrOfEephusTeam[pitcher2Team].name + ". He can be a lights out kind of presence when things are working for him.";
        break;
      case(30):
        greeting += "Bats have been known to go silent against the arm of " + arrOfEephusTeam[pitcher3].first_name + " " + arrOfEephusTeam[pitcher3].last_name + " of the " + arrOfEephusTeam[pitcher3Team].city + " " + arrOfEephusTeam[pitcher3Team].name + ". No sleeping in the batter's box when he's on his game.";
        break;
      case(31):
        greeting += "Much respect for the pitching prowess of " + arrOfEephusTeam[pitcher4].first_name + " " + arrOfEephusTeam[pitcher4].last_name + ". He is more than fast-ball command. He is a projected " + arrOfEephusTeam[pitcher4].projected_2017_IP + " innings of adrenaline for the " + arrOfEephusTeam[pitcher4Team].city + " " + arrOfEephusTeam[pitcher4Team].name + " and these " + eephusTeamName + ". ";
        break;
      case(32):
        greeting += "Watch out for that bat of " + arrOfEephusTeam[utility1].first_name + " " + arrOfEephusTeam[utility1].last_name + " in the lineup for my " + eephusTeamName + ". ";
        break;
      case(33):
        greeting += "Call him a utility hitter if you like. Call him a designated hitter if you must. But you'll be calling your bullpen when " + arrOfEephusTeam[utility2].first_name + " " + arrOfEephusTeam[utility2].last_name + " drills pitches out to the bleachers for my " + eephusTeamName + " today.";
        break;
      default:
        greeting += "... ";
    }



    return(greeting);
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
        var userTeamArr = [];
        var eephusTeamArr = [];
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
                  userTeamArr[catcher] = userTeamCatcher.data;
                  $http.get(`/players/${vm.eephusTeam.catcher}`)
                  .then(eephusTeamCatcher=>{
                    vm.eephusTeamCatcher = eephusTeamCatcher.data;
                    eephusTeamArr[catcher] = eephusTeamCatcher.data;
                    $http.get(`/teams/${vm.userTeamCatcher.team_id}`)
                    .then(userTeamCatcherTeam=>{
                      vm.userTeamCatcherTeam = userTeamCatcherTeam.data;
                      userTeamArr[catcherTeam] = userTeamCatcherTeam.data;
                      $http.get(`/teams/${vm.eephusTeamCatcher.team_id}`)
                      .then(eephusTeamCatcherTeam=>{
                        vm.eephusTeamCatcherTeam = eephusTeamCatcherTeam.data;
                        eephusTeamArr[catcherTeam] = eephusTeamCatcherTeam.data;
                        $http.get(`/players/${vm.userTeam.first_base}`)
                        .then(userTeam1B=>{
                          vm.userTeam1B = userTeam1B.data;
                          userTeamArr[firstBase] = userTeam1B.data;
                          $http.get(`/players/${vm.eephusTeam.first_base}`)
                          .then(eephusTeam1B=>{
                            vm.eephusTeam1B = eephusTeam1B.data;
                            eephusTeamArr[firstBase] = eephusTeam1B.data;
                            $http.get(`/teams/${vm.userTeam1B.team_id}`)
                            .then(userTeam1BTeam=>{
                              vm.userTeam1BTeam = userTeam1BTeam.data;
                              userTeamArr[firstBaseTeam] = userTeam1BTeam.data;
                              $http.get(`/teams/${vm.eephusTeam1B.team_id}`)
                              .then(eephusTeam1BTeam=>{
                                vm.eephusTeam1BTeam = eephusTeam1BTeam.data;
                                eephusTeamArr[firstBaseTeam] = eephusTeam1BTeam.data;
                                $http.get(`/players/${vm.userTeam.second_base}`)
                                .then(userTeam2B=>{
                                  vm.userTeam2B = userTeam2B.data;
                                  userTeamArr[secondBase] = userTeam2B.data;
                                  $http.get(`/players/${vm.eephusTeam.second_base}`)
                                  .then(eephusTeam2B=>{
                                    vm.eephusTeam2B = eephusTeam2B.data;
                                    eephusTeamArr[secondBase] = eephusTeam2B.data;
                                    $http.get(`/teams/${vm.userTeam2B.team_id}`)
                                    .then(userTeam2BTeam=>{
                                      vm.userTeam2BTeam = userTeam2BTeam.data;
                                      userTeamArr[secondBaseTeam] = userTeam2BTeam.data;
                                      $http.get(`/teams/${vm.eephusTeam2B.team_id}`)
                                      .then(eephusTeam2BTeam=>{
                                        vm.eephusTeam2BTeam = eephusTeam2BTeam.data;
                                        eephusTeamArr[secondBaseTeam] = eephusTeam2BTeam.data;
                                        $http.get(`/players/${vm.userTeam.third_base}`)
                                        .then(userTeam3B=>{
                                          vm.userTeam3B = userTeam3B.data;
                                          userTeamArr[thirdBase] = userTeam3B.data;
                                          $http.get(`/players/${vm.eephusTeam.third_base}`)
                                          .then(eephusTeam3B=>{
                                            vm.eephusTeam3B = eephusTeam3B.data;
                                            eephusTeamArr[thirdBase] = eephusTeam3B.data;
                                            $http.get(`/teams/${vm.userTeam3B.team_id}`)
                                            .then(userTeam3BTeam=>{
                                              vm.userTeam3BTeam = userTeam3BTeam.data;
                                              userTeamArr[thirdBaseTeam] = userTeam3BTeam.data;
                                              $http.get(`/teams/${vm.eephusTeam3B.team_id}`)
                                              .then(eephusTeam3BTeam=>{
                                                vm.eephusTeam3BTeam = eephusTeam3BTeam.data;
                                                eephusTeamArr[thirdBaseTeam] = eephusTeam3BTeam.data;
                                                $http.get(`/players/${vm.userTeam.short_stop}`)
                                                .then(userTeamSS=>{
                                                  vm.userTeamSS = userTeamSS.data;
                                                  userTeamArr[shortstop] = userTeamSS.data;
                                                  $http.get(`/players/${vm.eephusTeam.short_stop}`)
                                                  .then(eephusTeamSS=>{
                                                    vm.eephusTeamSS = eephusTeamSS.data;
                                                    eephusTeamArr[shortstop] = eephusTeamSS.data;
                                                    $http.get(`/teams/${vm.userTeamSS.team_id}`)
                                                    .then(userTeamSSTeam=>{
                                                      vm.userTeamSSTeam = userTeamSSTeam.data;
                                                      userTeamArr[shortstopTeam] = userTeamSSTeam.data;
                                                      $http.get(`/teams/${vm.eephusTeamSS.team_id}`)
                                                      .then(eephusTeamSSTeam=> {
                                                        vm.eephusTeamSSTeam = eephusTeamSSTeam.data;
                                                        eephusTeamArr[shortstopTeam] = eephusTeamSSTeam.data;
                                                        $http.get(`/players/${vm.userTeam.outfield_1}`)
                                                        .then(userTeamOF1=>{
                                                          vm.userTeamOF1 = userTeamOF1.data;
                                                          userTeamArr[outfield1] = userTeamOF1.data;
                                                          $http.get(`/players/${vm.eephusTeam.outfield_1}`)
                                                          .then(eephusTeamOF1=>{
                                                            vm.eephusTeamOF1 = eephusTeamOF1.data;
                                                            eephusTeamArr[outfield1] = eephusTeamOF1.data;
                                                            $http.get(`/teams/${vm.userTeamOF1.team_id}`)
                                                            .then(userTeamOF1Team=>{
                                                              vm.userTeamOF1Team = userTeamOF1Team.data;
                                                              userTeamArr[outfield1Team] = userTeamOF1Team.data;
                                                              $http.get(`/teams/${vm.eephusTeamOF1.team_id}`)
                                                              .then(eephusTeamOF1Team=>{
                                                                vm.eephusTeamOF1Team = eephusTeamOF1Team.data;
                                                                eephusTeamArr[outfield1Team] = eephusTeamOF1Team.data;
                                                                $http.get(`/players/${vm.userTeam.outfield_2}`)
                                                                .then(userTeamOF2=>{
                                                                  vm.userTeamOF2 = userTeamOF2.data;
                                                                  userTeamArr[outfield2] = userTeamOF2.data;
                                                                  $http.get(`/players/${vm.eephusTeam.outfield_2}`)
                                                                  .then(eephusTeamOF2=>{
                                                                    vm.eephusTeamOF2 = eephusTeamOF2.data;
                                                                    eephusTeamArr[outfield2] = eephusTeamOF2.data;
                                                                    $http.get(`/teams/${vm.userTeamOF2.team_id}`)
                                                                    .then(userTeamOF2Team=>{
                                                                      vm.userTeamOF2Team = userTeamOF2Team.data;
                                                                      userTeamArr[outfield2Team] = userTeamOF2Team.data;
                                                                      $http.get(`/teams/${vm.eephusTeamOF2.team_id}`)
                                                                      .then(eephusTeamOF2Team=>{
                                                                        vm.eephusTeamOF2Team = eephusTeamOF2Team.data;
                                                                        eephusTeamArr[outfield2Team] = eephusTeamOF2Team.data;
    $http.get(`/players/${vm.userTeam.outfield_3}`)
    .then(userTeamOF3=>{
      vm.userTeamOF3 = userTeamOF3.data;
      userTeamArr[outfield3] = userTeamOF3.data;
      $http.get(`/players/${vm.eephusTeam.outfield_3}`)
      .then(eephusTeamOF3=>{
        vm.eephusTeamOF3 = eephusTeamOF3.data;
        eephusTeamArr[outfield3] = eephusTeamOF3.data;
        $http.get(`/teams/${vm.userTeamOF3.team_id}`)
        .then(userTeamOF3Team=>{
          vm.userTeamOF3Team = userTeamOF3Team.data;
          userTeamArr[outfield3Team] = userTeamOF3Team.data;
          $http.get(`teams/${vm.eephusTeamOF3.team_id}`)
          .then(eephusTeamOF3Team=>{
            vm.eephusTeamOF3Team = eephusTeamOF3Team.data;
            eephusTeamArr[outfield3Team] = eephusTeamOF3Team.data;
            $http.get(`/players/${vm.userTeam.util_1}`)
            .then(userTeamU1=>{
              vm.userTeamU1 = userTeamU1.data;
              userTeamArr[utility1] = userTeamU1.data;
              $http.get(`/players/${vm.eephusTeam.util_1}`)
              .then(eephusTeamU1=>{
                vm.eephusTeamU1 = eephusTeamU1.data;
                eephusTeamArr[utility1] = eephusTeamU1.data;
                $http.get(`teams/${vm.userTeamU1.team_id}`)
                .then(userTeamU1Team=>{
                  vm.userTeamU1Team = userTeamU1Team.data;
                  userTeamArr[utility1Team] = userTeamU1Team.data;
                  $http.get(`/teams/${vm.eephusTeamU1.team_id}`)
                  .then(eephusTeamU1Team=>{
                    vm.eephusTeamU1Team = eephusTeamU1Team.data;
                    eephusTeamArr[utility1Team] = eephusTeamU1Team.data;
                    $http.get(`/players/${vm.userTeam.util_2}`)
                    .then(userTeamU2=>{
                      vm.userTeamU2 = userTeamU2.data;
                      userTeamArr[utility2] = userTeamU2.data;
                      $http.get(`/players/${vm.eephusTeam.util_2}`)
                      .then(eephusTeamU2=>{
                        vm.eephusTeamU2 = eephusTeamU2.data;
                        eephusTeamArr[utility2] = eephusTeamU2.data;
                        $http.get(`/teams/${vm.userTeamU2.team_id}`)
                        .then(userTeamU2Team=>{
                          vm.userTeamU2Team = userTeamU2Team.data;
                          userTeamArr[utility2Team] = userTeamU2Team.data;
                          $http.get(`/teams/${vm.eephusTeamU2.team_id}`)
                          .then(eephusTeamU2Team=>{
                            vm.eephusTeamU2Team = eephusTeamU2Team.data;
                            eephusTeamArr[utility2Team] = eephusTeamU2Team.data;
                            $http.get(`/players/${vm.userTeam.sp_1}`)
                            .then(userTeamSP1=>{
                              vm.userTeamSP1 = userTeamSP1.data;
                              userTeamArr[startingPitcher1] = userTeamSP1.data;
                              $http.get(`/players/${vm.eephusTeam.sp_1}`)
                              .then(eephusTeamSP1=>{
                                vm.eephusTeamSP1 = eephusTeamSP1.data;
                                eephusTeamArr[startingPitcher1] = eephusTeamSP1.data;
                                $http.get(`/teams/${vm.userTeamSP1.team_id}`)
                                .then(userTeamSP1Team=>{
                                  vm.userTeamSP1Team = userTeamSP1Team.data;
                                  userTeamArr[startingPitcher1Team] = userTeamSP1Team.data;
                                  $http.get(`/teams/${vm.eephusTeamSP1.team_id}`)
                                  .then(eephusTeamSP1Team=>{
                                    vm.eephusTeamSP1Team = eephusTeamSP1Team.data;
                                    eephusTeamArr[startingPitcher1Team] = eephusTeamSP1Team.data;
                                    $http.get(`/players/${vm.userTeam.sp_2}`)
                                    .then(userTeamSP2=>{
                                      vm.userTeamSP2 = userTeamSP2.data;
                                      userTeamArr[startingPitcher2] = userTeamSP2.data;
                                      $http.get(`/players/${vm.eephusTeam.sp_2}`)
                                      .then(eephusTeamSP2=>{
                                        vm.eephusTeamSP2 = eephusTeamSP2.data;
                                        eephusTeamArr[startingPitcher2] = eephusTeamSP2.data;
                                        $http.get(`/teams/${vm.userTeamSP2.team_id}`)
                                        .then(userTeamSP2Team=>{
                                          vm.userTeamSP2Team = userTeamSP2Team.data;
                                          userTeamArr[startingPitcher2Team] = userTeamSP2Team.data;
                                          $http.get(`/teams/${vm.eephusTeamSP2.team_id}`)
                                          .then(eephusTeamSP2Team=>{
                                            vm.eephusTeamSP2Team = eephusTeamSP2Team.data;
                                            eephusTeamArr[startingPitcher2Team] = eephusTeamSP2Team.data;
                                            $http.get(`/players/${vm.userTeam.rp_1}`)
                                            .then(userTeamRP1=>{
                                              vm.userTeamRP1 = userTeamRP1.data;
                                              userTeamArr[reliefPitcher1] = userTeamRP1.data;
                                              $http.get(`players/${vm.eephusTeam.rp_1}`)
                                              .then(eephusTeamRP1=>{
                                                vm.eephusTeamRP1 = eephusTeamRP1.data;
                                                eephusTeamArr[reliefPitcher1] = eephusTeamRP1.data;
                                                $http.get(`/teams/${vm.userTeamRP1.team_id}`)
                                                .then(userTeamRP1Team=>{
                                                  vm.userTeamRP1Team = userTeamRP1Team.data;
                                                  userTeamArr[reliefPitcher1Team] = userTeamRP1Team.data;
                                                  $http.get(`/teams/${vm.eephusTeamRP1.team_id}`)
                                                  .then(eephusTeamRP1Team=>{
                                                    vm.eephusTeamRP1Team = eephusTeamRP1Team.data;
                                                    eephusTeamArr[reliefPitcher2Team] = eephusTeamRP1Team.data;
    $http.get(`/players/${vm.userTeam.rp_2}`)
    .then(userTeamRP2=>{
      vm.userTeamRP2 = userTeamRP2.data;
      userTeamArr[reliefPitcher2] = userTeamRP2.data;
      $http.get(`/players/${vm.eephusTeam.rp_2}`)
      .then(eephusTeamRP2=>{
        vm.eephusTeamRP2 = eephusTeamRP2.data;
        eephusTeamArr[reliefPitcher2] = eephusTeamRP2.data;
        $http.get(`/teams/${vm.userTeamRP2.team_id}`)
        .then(userTeamRP2Team=>{
          vm.userTeamRP2Team = userTeamRP2Team.data;
          userTeamArr[reliefPitcher2Team] = userTeamRP2Team.data;
          $http.get(`/teams/${vm.eephusTeamRP2.team_id}`)
          .then(eephusTeamRP2Team=>{
            vm.eephusTeamRP2Team = eephusTeamRP2Team.data;
            eephusTeamArr[reliefPitcher2Team] = eephusTeamRP2Team.data;
            $http.get(`/players/${vm.userTeam.p_1}`)
            .then(userTeamP1=>{
              vm.userTeamP1 = userTeamP1.data;
              userTeamArr[pitcher1] = userTeamP1.data;
              $http.get(`/players/${vm.eephusTeam.p_1}`)
              .then(eephusTeamP1=>{
                vm.eephusTeamP1 = eephusTeamP1.data;
                eephusTeamArr[pitcher1] = eephusTeamP1.data;
                $http.get(`/teams/${vm.userTeamP1.team_id}`)
                .then(userTeamP1Team=>{
                  vm.userTeamP1Team = userTeamP1Team.data;
                  userTeamArr[pitcher1Team] = userTeamP1Team.data;
                  $http.get(`/teams/${vm.eephusTeamP1.team_id}`)
                  .then(eephusTeamP1Team=>{
                    vm.eephusTeamP1Team = eephusTeamP1Team.data;
                    eephusTeamArr[pitcher1Team] = eephusTeamP1Team.data;
                    $http.get(`/players/${vm.userTeam.p_2}`)
                    .then(userTeamP2=>{
                      vm.userTeamP2 = userTeamP2.data;
                      userTeamArr[pitcher2] = userTeamP2.data;
                      $http.get(`/players/${vm.eephusTeam.p_2}`)
                      .then(eephusTeamP2=>{
                        vm.eephusTeamP2 = eephusTeamP2.data;
                        eephusTeamArr[pitcher2] = eephusTeamP2.data;
                        $http.get(`/teams/${vm.userTeamP2.team_id}`)
                        .then(userTeamP2Team=>{
                          vm.userTeamP2Team = userTeamP2Team.data;
                          userTeamArr[pitcher2Team] = userTeamP2Team.data;
                          $http.get(`/teams/${vm.eephusTeamP2.team_id}`)
                          .then(eephusTeamP2Team=>{
                            vm.eephusTeamP2Team = eephusTeamP2Team.data;
                            eephusTeamArr[pitcher2Team] = eephusTeamP2Team.data;
                            $http.get(`/players/${vm.userTeam.p_3}`)
                            .then(userTeamP3=>{
                              vm.userTeamP3 = userTeamP3.data;
                              userTeamArr[pitcher3] = userTeamP3.data;
                              $http.get(`/players/${vm.eephusTeam.p_3}`)
                              .then(eephusTeamP3=>{
                                vm.eephusTeamP3 = eephusTeamP3.data;
                                eephusTeamArr[pitcher3] = eephusTeamP3.data;
                                $http.get(`/teams/${vm.userTeamP3.team_id}`)
                                .then(userTeamP3Team=>{
                                  vm.userTeamP3Team = userTeamP3Team.data;
                                  userTeamArr[pitcher3Team] = userTeamP3Team.data;
                                  $http.get(`/teams/${vm.eephusTeamP3.team_id}`)
                                  .then(eephusTeamP3Team=>{
                                    vm.eephusTeamP3Team = eephusTeamP3Team.data;
                                    eephusTeamArr[pitcher3Team] = eephusTeamP3Team.data;
                                    $http.get(`/players/${vm.userTeam.p_4}`)
                                    .then(userTeamP4=>{
                                      vm.userTeamP4 = userTeamP4.data;
                                      userTeamArr[pitcher4] = userTeamP4.data;
                                      $http.get(`/players/${vm.eephusTeam.p_4}`)
                                      .then(eephusTeamP4=>{
                                        vm.eephusTeamP4 = eephusTeamP4.data;
                                        eephusTeamArr[pitcher4] = eephusTeamP4.data;
                                        $http.get(`/teams/${vm.userTeamP4.team_id}`)
                                        .then(userTeamP4Team=>{
                                          vm.userTeamP4Team = userTeamP4Team.data;
                                          userTeamArr[pitcher4Team] = userTeamP4Team.data;
                                          $http.get(`/teams/${vm.eephusTeamP4.team_id}`)
                                          .then(eephusTeamP4Team=>{
                                            vm.eephusTeamP4Team = eephusTeamP4Team.data;
                                            eephusTeamArr[pitcher4Team] = eephusTeamP4Team.data;
                                            $http.get(`/players/${vm.userTeam.bench_1}`)
                                            .then(userTeamB1=>{
                                              vm.userTeamB1 = userTeamB1.data;
                                              userTeamArr[bench1] = userTeamB1.data;
                                              $http.get(`/players/${vm.eephusTeam.bench_1}`)
                                              .then(eephusTeamB1=>{
                                                vm.eephusTeamB1 = eephusTeamB1.data;
                                                eephusTeamArr[bench1] = eephusTeamB1.data;
                                                $http.get(`/teams/${vm.userTeamB1.team_id}`)
                                                .then(userTeamB1Team=>{
                                                  vm.userTeamB1Team = userTeamB1Team.data;
                                                  userTeamArr[bench1Team] = userTeamB1Team.data;
                                                  $http.get(`/teams/${vm.eephusTeamB1.team_id}`)
                                                  .then(eephusTeamB1Team=>{
                                                    vm.eephusTeamB1Team = eephusTeamB1Team.data;
                                                    eephusTeamArr[bench1Team] = eephusTeamB1Team.data;
  $http.get(`/players/${vm.userTeam.bench_2}`)
  .then(userTeamB2=>{
    vm.userTeamB2 = userTeamB2.data;
    userTeamArr[bench2] = userTeamB2.data;
    $http.get(`/players/${vm.eephusTeam.bench_2}`)
    .then(eephusTeamB2=>{
      vm.eephusTeamB2 = eephusTeamB2.data;
      eephusTeamArr[bench2] = eephusTeamB2.data;
      $http.get(`/teams/${vm.userTeamB2.team_id}`)
      .then(userTeamB2Team=>{
        vm.userTeamB2Team = userTeamB2Team.data;
        userTeamArr[bench2Team] = userTeamB2Team.data;
        $http.get(`/teams/${vm.eephusTeamB2.team_id}`)
        .then(eephusTeamB2Team=>{
          vm.eephusTeamB2Team = eephusTeamB2Team.data;
          eephusTeamArr[bench2Team] = eephusTeamB2Team.data;
          $http.get(`/players/${vm.userTeam.bench_3}`)
          .then(userTeamB3=>{
            vm.userTeamB3 = userTeamB3.data;
            userTeamArr[bench3] = userTeamB3.data;
            $http.get(`/players/${vm.eephusTeam.bench_3}`)
            .then(eephusTeamB3=>{
              vm.eephusTeamB3 = eephusTeamB3.data;
              eephusTeamArr[bench3] = eephusTeamB3.data;
              $http.get(`/teams/${vm.userTeamB3.team_id}`)
              .then(userTeamB3Team=>{
                vm.userTeamB3Team = userTeamB3Team.data;
                userTeamArr[bench3Team] = userTeamB3Team.data;
                $http.get(`/teams/${vm.eephusTeamB3.team_id}`)
                .then(eephusTeamB3Team=>{
                  vm.eephusTeamB3Team = eephusTeamB3Team.data;
                  eephusTeamArr[bench3Team] = eephusTeamB3Team.data;
                  $http.get(`/players/${vm.userTeam.bench_4}`)
                  .then(userTeamB4=>{
                    vm.userTeamB4 = userTeamB4.data;
                    userTeamArr[bench4] = userTeamB4.data;
                    $http.get(`/players/${vm.eephusTeam.bench_4}`)
                    .then(eephusTeamB4=>{
                      vm.eephusTeamB4 = eephusTeamB4.data;
                      eephusTeamArr[bench4] = eephusTeamB4.data;
                      $http.get(`/teams/${vm.userTeamB4.team_id}`)
                      .then(userTeamB4Team=>{
                        vm.userTeamB4Team = userTeamB4Team.data;
                        userTeamArr[bench4Team] = userTeamB4Team.data;
                        $http.get(`/teams/${vm.eephusTeamB4.team_id}`)
                        .then(eephusTeamB4Team=>{
                          vm.eephusTeamB4Team = eephusTeamB4Team.data;
                          eephusTeamArr[bench4Team] = eephusTeamB4Team.data;
                          $http.get(`/players/${vm.userTeam.bench_5}`)
                          .then(userTeamB5=>{
                            vm.userTeamB5 = userTeamB5.data;
                            userTeamArr[bench5] = userTeamB5.data;
                            $http.get(`/players/${vm.eephusTeam.bench_5}`)
                            .then(eephusTeamB5=>{
                              vm.eephusTeamB5 = eephusTeamB5.data;
                              eephusTeamArr[bench5] = eephusTeamB5.data;
                              $http.get(`/teams/${vm.userTeamB5.team_id}`)
                              .then(userTeamB5Team=>{
                                vm.userTeamB5Team = userTeamB5Team.data;
                                userTeamArr[bench5Team] = userTeamB5Team.data;
                                $http.get(`/teams/${vm.eephusTeamB5.team_id}`)
                                .then(eephusTeamB5Team=>{
                                  vm.eephusTeamB5Team = eephusTeamB5Team.data;
                                  eephusTeamArr[bench5Team] = eephusTeamB5Team.data;
                                  // $http.get(`/players/${vm.userTeam.dl_1}`)
                                  // .then(userTeamDL1=>{
                                  //   vm.userTeamDL1 = userTeamDL1.data;
                                  //   $http.get(`/players/${vm.eephusTeam.dl_1}`)
                                  //   .then(eephusTeamDL1=>{
                                  //     vm.eephusTeamDL1 = eephusTeamDL1.data;
                                  //     $http.get(`/teams/${vm.userTeamDL1.team_id}`)
                                  //     .then(userTeamDL1Team=>{
                                  //       vm.userTeamDL1Team = userTeamDL1Team.data;
                                  //       $http.get(`/teams/${vm.eephusTeamDL1.team_id}`)
                                  //       .then(eephusTeamDL1Team=>{
                                  //         vm.eephusTeamDL1Team = eephusTeamDL1Team.data;
                                  //         $http.get(`/players/${vm.userTeam.dl_2}`)
                                  //         .then(userTeamDL2=>{
                                  //           vm.userTeamDL2 = userTeamDL2.data;
                                  //           $http.get(`/players/${vm.eephusTeam.dl_2}`)
                                  //           .then(eephusTeamDL2=>{
                                  //             vm.eephusTeamDL2 = eephusTeamDL2.data;
                                  //             $http.get(`/teams/${vm.userTeamDL2.team_id}`)
                                  //             .then(userTeamDL2Team=>{
                                  //               vm.userTeamDL2Team = userTeamDL2Team.data;
                                  //               $http.get(`/teams/${vm.eephusTeamDL2.team_id}`)
                                  //               .then(eephusTeamDL2Team=>{
                                  //                 vm.eephusTeamDL2Team = eephusTeamDL2Team.data;
                                                  spokenOutput(initialGreetingString());
                                                  spokenOutput(assembleSecondaryGreetingString(vm.league.match_name, vm.user.name, vm.userTeam.team_name, vm.eephusTeam.team_name, userTeamArr, eephusTeamArr));
                                  //               });
                                  //             });
                                  //           });
                                  //         });
                                  //       });
                                  //     });
                                  //   });
                                  // });
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
