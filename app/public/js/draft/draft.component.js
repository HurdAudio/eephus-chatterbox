(function() {
  'use strict';

  var playerArray = [];
  var playerArrayIndex = 0;
  var playerRibbonSlots = [];
  var inputOn = true;
  var draftStagePlayer;
  var draftIndex = 0;
  var draftSequenceArr = [0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1 ];
  var userTurn;
  var eephusTurn;

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

  function talkAboutHitter (hitter, hitterTeam) {
    var responseString = "";
    var randomInt = 0;

    if (hitter.projected_2017_SB > 21) {
      randomInt = (Math.floor(Math.random()*5));
      switch(randomInt) {
        case(0):
          responseString += hitter.first_name + " " + hitter.last_name + " is all about the stolen bases. He's projected to snag a good " + hitter.projected_2017_SB + " bags in the year ahead. ";
          break;
        case(1):
          var ops = hitter.projected_2017_OPS.toString();
          ops = ops.slice(2);
          responseString += "Speed is the name of the game with " + hitter.first_name + " " + hitter.last_name + " of the " + hitterTeam.city + " " + hitterTeam.name + ". He is projected to have a " + ops + "O P S in the campaign ahead. You can also expect him to steal around " + hitter.projected_2017_SB + " bases. ";
          break;
        case(2):
          var name = "";
          if (hitter.nickname !== null) {
            name = hitter.nickname;
          } else {
            name = hitter.last_name;
          }
          responseString += name + " is a classic leadoff, contact hitter for the " + hitterTeam.city + " " + hitterTeam.name + ". When he reaches base he can be a real headache for the other team with his penchant for stealing bases. Look for him to score " + hitter.projected_2017_R + " runs over the course of a season. ";
          break;
        case(3):
          responseString += "When you talk " + hitter.first_name + " " + hitter.last_name + "of the " + hitterTeam.city + " " + hitterTeam.name + " you're talking about grand theft base stealing. " + hitter.last_name + " brings a good " + hitter.projected_2017_SB + " stolen bases to a fantasy team. A key part of dominating this under-rated stat. ";
          break;
        case(4):
          responseString += "If you want to rack up the stolen bags, " + hitter.first_name + " " + hitter.last_name + " is a good place to turn. He's a contact hitter who brings a lot of speed and disruption on the base paths. ";
          break;
        default:
          responseString += "...";
      }

    } else {
      randomInt = (Math.floor(Math.random()*9));
      switch(randomInt) {
        case(0):
          var coolHand = "";
          if (hitter.bats_LR === "R") {
            coolHand = "right handed ";
          } else if (hitter.bats_LR === "L") {
            coolHand = "left handed ";
          } else {
            coolHand = "switch ";
          }
          responseString += "We are expecting a good " + hitter.projected_2017_AB + " at bats from " + hitter.first_name + " " + hitter.last_name + " this year. And those should produce around " + hitter.projected_2017_H + " hits for the " + coolHand + "hitter. ";
          break;
        case(1):
          var sluggNick = "";
          var sluggObp = hitter.projected_2017_OBP.toString();
          sluggObp = sluggObp.slice(2);
          if (hitter.nickname !== null) {
            sluggNick = hitter.nickname;
          } else {
            sluggNick = hitter.first_name;
          }
          responseString += sluggNick + " brings a steady plate presence to any lineup. His projected " + sluggObp + " on base percentage is a nice compliment for any team. ";
          break;
        case(2):
          var avg = hitter.projected_2017_AVG;
          avg = avg.slice(2);
          responseString += "We anticipate a " + avg + " batting average from " + hitter.first_name + " " + hitter.last_name + " in the season ahead. ";
          break;
        case(3):
          responseString += "I see that you are considering " + hitter.first_name + " " + hitter.last_name + " of the " + hitterTeam.name + " for your lineup. He's probably good for " + hitter.projected_2017_H + " hits and " + hitter.projected_2017_RBI + " ribbies this year. ";
          break;
        case(4):
          var hitAvg = hitter.projected_2017_AVG;
          hitAvg = hitAvg.slice(2);
          responseString += hitter.first_name + " " + hitter.last_name + " looks like a " + hitAvg + " hitter for the foreseeable season. ";
          break;
        case(5):
          var handy = "";
          if (hitter.bats_LR === 'R') {
            handy = "right handed bat of the ";
          } else if (hitter.bats_LR === "L") {
            handy = "lefted handed bat of the ";
          } else {
            handy = "switch hitting bat of the ";
          }
          responseString += "We're looking at the " + handy + hitterTeam.city + " " + hitterTeam.name + ". We expect to see around " + hitter.projected_2017_RBI + " runs batted in from him this year. ";
          break;
        case(6):
          responseString += "If you're looking for around " + hitter.projected_2017_H + " hits in " + hitter.projected_2017_AB + " at bats in your lineup, you have come to the right place with " + hitter.first_name + " " + hitter.last_name + ". ";
          break;
        case(7):
          var slug = hitter.projected_2017_SLG;
          slug = slug.slice(2);
          var batHand = "";
          if (hitter.bats_LR === "R") {
            batHand = "right handed bat ";
          } else if (hitter.bats_LR === "L") {
            batHand = "left handed bat ";
          } else {
            batHand = "switch hitting bat ";
          }
          responseString += "The " + hitterTeam.city + " " + hitterTeam.name + " " + batHand + " is anticipated to deliver a " + slug + " slugging percentage this season. ";
          break;
        case(8):
          responseString += hitter.first_name + " " + hitter.last_name + "of the " + hitterTeam.city + " " + hitterTeam.name + " is basically a " + hitter.projected_2017_RBI + " are bee eye kind of player at the plate. We also anticipate " + hitter.projected_2017_walk + " walks in there. ";
          break;
        default:
          responseString += "...";
      }
    }
    if (hitter.projected_2017_HR > 27) {
      randomInt = (Math.floor(Math.random()*7));
      switch(randomInt){
        case(0):
          responseString += hitter.first_name + " " + hitter.last_name + " is your classic power hitter for the " + hitterTeam.city + " " + hitterTeam.name + ". You can expect to see " + hitter.projected_2017_HR + " home runs and around " + hitter.projected_2017_RBI + " runs driven in from this slugger.";
          break;
        case(2):
          var nick = "";
          var handedness = "";
          if (hitter.nickname !== null) {
            nick = hitter.nickname;
          } else {
            nick = hitter.last_name;
          }
          if (hitter.bats_LR === "R") {
            handedness = "right handed ";
          } else if (hitter.bats_LR === "L") {
            handedness = "left handed";
          } else {
            handedness = "switch hitting ";
          }
          responseString += nick + " brings a potent " + handedness + "bat to any lineup. Or at least the " + hitterTeam.name + "lineup over in " + hitterTeam.city + ". We expect him to muscle up a good " + hitter.projected_2017_HR + " home runs this year.";
          break;
        case(3):
          var slg = hitter.projected_2017_SLG.toString();
          slg = slg.slice(2);
          responseString += "If you need a power bat, you could certainly do a lot worse than " + hitter.first_name + " " + hitter.last_name + " of the " + hitterTeam.city + " " + hitterTeam.name + ". We can expect " + hitter.projected_2017_HR + " home runs and a " + slg + " slugging percentage from him this year.";
          break;
        case(4):
          responseString += "Here is a good option for adding some pop to your lineup. In the equasion home runs equals more Are Bee Eyes, " + hitter.first_name + " " + hitter.last_name + " is expected to produce on both counts: " + hitter.projected_2017_HR + " long balls and " + hitter.projected_2017_RBI + " runs batted for the power hitter.";
          break;
        case(5):
          responseString += hitter.first_name + " " + hitter.last_name + " brings some pop to any lineup. He air mails long balls for the " + hitterTeam.name + " and he can do the same for your team as well.";
          break;
        case(6):
          responseString += "It's not always many home runs  " + hitter.first_name + " " + hitter.last_name + " can drive out to the stands, but how majestic his blasts can be. The " + hitterTeam.name + " have certainly been enjoying his power. Look for " + hitter.projected_2017_HR + " bombs off his bat for the season.";
          break;
        default:
          responseString += "...";
      }
    }

    return (responseString);
  }

  function talkAboutPitcher (pitcher, pitcherTeam, userTeam) {
    var responseString = "";
    var randomInt = 0;

    if (pitcher.eligible_SP) {
      if (pitcher.projected_2017_K > 160) {
        randomInt = (Math.floor(Math.random()*9));
        switch(randomInt) {
          case(0):
            var throwArm = "";
            if (pitcher.throws_LR === "R") {
              throwArm = "right handed pitcher ";
            } else {
              throwArm = "southpaw pitcher ";
            }
            responseString += pitcher.first_name + " " + pitcher.last_name + " is your classic power pitcher. The " + throwArm + "for the " + pitcherTeam.city + " " + pitcherTeam.name + " is expected to fan " + pitcher.projected_2017_K + " hapless hitters.";
            break;
          case (1):
            responseString += "You are looking at one strikeout machine here. We're expecting " + pitcher.projected_2017_K + " big Kays out of " + pitcher.first_name + " " + pitcher.last_name + " this season. That could certainly be an asset to the " + userTeam.team_name + ". ";
            break;
          case(2):
            var earnedRunAverage = pitcher.projected_2017_ERA;
            var eraArr = earnedRunAverage.split('.');
            responseString += "You can look forward to a projected " + eraArr[0] + " " + eraArr[1] + " earned run average and an impressive " + pitcher.projected_2017_K + " strikeouts from " + pitcherTeam.city + " " + pitcherTeam.name + " " + pitcher.first_name + " " + pitcher.last_name + ". ";
            break;
          case(3):
            var whip = pitcher.projected_2017_WHIP;
            var whipArr = whip.split('.');
            responseString += "Crack that whip and limit those baserunners. " + pitcher.first_name + " " + pitcher.last_name + " will be keeping the bags clear as he supports his expected " + whipArr[0] + " " + whipArr[1] + "whip ... that's walks plus hits over innings pitched ... with a healthy dose of swinging and missing. Expect to see " + pitcher.projected_2017_K + " strikeouts from him.";
             break;
            case(4):
              responseString += "We're talking about strikeouts here as " + pitcher.first_name + " " + pitcher.last_name + "has been known to deal from the mound.";
              break;
            case(5):
              var hp = "";
              if (pitcher.throws_LR === "R") {
                hp = "right handed starting pitcher ";
              } else {
                hp = "left handed starting pitcher ";
              }
              responseString += "If the swing and a miss is part of your game plan, you would be remiss not to consider the " + pitcher.projected_2017_K + " Kays we're looking forward to from " + hp + pitcher.first_name + " " + pitcher.last_name + " of the " + pitcherTeam.city + " " + pitcherTeam.name + ". ";
              break;
            case(6):
              responseString += "Power pitching is what " + pitcher.first_name + " " + pitcher.last_name + "brings to the table. It's hard for the hitters to catch up to his heat.";
              break;
            case(7):
              var pitcherNick = "";
              var handedPitch = "";
              if (pitcher.nickname !== null) {
                pitcherNick = pitcher.nickname;
              } else {
                pitcherNick = pitcher.first_name + " " + pitcher.last_name;
              }
              if (pitcher.throws_LR === "R") {
                handedPitch = "right handed ";
              } else {
                handedPitch = "left handed ";
              }
              responseString += "Look for " + pitcherNick + " to bring the heat as we are projecting " + pitcher.projected_2017_K + " strikeouts from the " + handedPitch + "starter from " + pitcherTeam.city + ". ";
              break;
            case(8):
              responseString += pitcher.last_name + " brings frustration to the batters box as he packs a tremendous fastball.";
              break;
          default:
            responseString += "...";
        }
      } else if (pitcher.projected_2017_WHIP < 1.09) {
        randomInt = (Math.floor(Math.random()*3));
        switch(randomInt) {
          case(0):
            var controlEra = pitcher.projected_2017_ERA;
            var controlEraArr = controlEra.split('.');
            responseString += pitcher.first_name + " " + pitcher.last_name + " brings a fine control from the mound as we expect to see a " + controlEraArr[0] + " " + controlEraArr[1] + " earned run average and a paucity of base runners this year. ";
            break;
          case(1):
            responseString += "Hitters will want to try and get to " + pitcher.first_name + " " + pitcher.last_name  + " in the early frames because he can be tough when he hits his groove.";
            break;
          case(2):
            var controlWhip = pitcher.projected_2017_WHIP;
            var controlWhipArr = controlWhip.split('.');
            responseString += pitcher.first_name + " " + pitcher.last_name + " is a study of control as he limits baserunners. We're expecting an outstanding " + controlWhipArr[0] + " " + controlWhipArr[1] + " WHIP - that's walks plus hits over innings pitched.";
            break;
          default:
            responseString += "...";
        }
      } else if (pitcher.projected_2017_IP > 164) {
        randomInt = (Math.floor(Math.random()*7));
        switch(randomInt) {
          case(0):
            var pip = Math.floor(pitcher.projected_2017_IP);
            responseString += pitcher.first_name + " " + pitcher.last_name + " is your classic workhorse of a pitcher. You'll see about " + pip + " of work from his arm over the season as he supports his " + pitcherTeam.city + " " +pitcherTeam.name + ". ";
            break;
          case(1):
            responseString += "This could be a good pitching option for the " + userTeam.team_name + " down through the stretch of a long season. " + pitcher.first_name + " " + pitcher.last_name + " is as reliable as they come in baseball.";
            break;
          case(2):
            var workhorseERA = pitcher.projected_2017_ERA;
            var workhorseERAArr = workhorseERA.split('.');
            responseString += "You're looking at an earned run average of around " + workhorseERAArr[0] + " " + workhorseERAArr[1] +" when you enlist the services of " + pitcher.first_name + " " + pitcher.last_name + ". ";
            break;
          case(3):
            var durableHP = "";
            if (pitcher.throws_LR === "R") {
              durableHP = "right handed ";
            } else {
              durableHP = "left handed ";
            }
            responseString += "The " + pitcherTeam.city + " " + pitcherTeam.name + " have a proven arm in the " + durableHP + " pitcher from " + pitcher.place_of_birth + ". He'll eat up around " + pitcher.projected_2017_IP + " innings of work over the season and he'll do it at a major league level of performance.";
            break;
          case(4):
            responseString += "Every balanced team in the majors needs a " + pitcher.first_name + " " + pitcher.last_name + " on their roster. He is a true workhorse for the " + pitcherTeam.name + ". ";
            break;
          case(5):
            responseString += "One thing " + pitcher.first_name + " " + pitcher.last_name + " brings to the table is innings pitched, pure and simple. He'll keep the " + pitcherTeam.city + " " + pitcherTeam.name + " in a lot of ballgames over the season. ";
            break;
          case(6):
            var horseArm = "";
            if (pitcher.throws_LR === "R") {
              horseArm = "right ";
            } else {
              horseArm = "left ";
            }
            responseString += "One thing that the " + userTeam.team_name + " can expect to rely upon over the long season is the " + horseArm + "arm of " + pitcher.first_name + " " + pitcher.last_name + ". He's expected to rack up " + pitcher.projected_2017_IP + " innings pitched over the months ahead.";
            break;
          default:
            responseString += "...";
        }
      } else {
        randomInt = (Math.floor(Math.random()*5));
        switch(randomInt) {
          case(0):
            var genericHand = "";
            if (pitcher.throws_LR === "R") {
              genericHand = "righty ";
            } else {
              genericHand = "southpaw ";
            }
            var genericERA = pitcher.projected_2017_ERA;
            var genericERAArr = genericERA.split('.');
            responseString += "The " + pitcherTeam.city + " " + pitcherTeam.name + " have high hopes riding on this " + genericHand + "from " + pitcher.place_of_birth + ". And perhaps so do the " + userTeam.team_name + ". We can expect an earned run average of " + genericERAArr[0] + " " + genericERAArr[1] + " from him. ";
            break;
          case(1):
            var genericWHIP = pitcher.projected_2017_WHIP;
            var genericWHIPArr = genericWHIP.split('.');
            responseString += "The " + pitcherTeam.city + " " + pitcherTeam.name + " will be watching that whip. More specifically, the anticipated " + genericWHIPArr[0] + " " + genericWHIPArr[1] + " walks plus hits per innings pitched of " + pitcher.first_name + " " + pitcher.last_name + ". ";
            break;
          case(2):
            responseString += "I see you are shopping for a starting pitcher. One " + pitcher.first_name + " " + pitcher.last_name + " could fill the bill. You're looking at something around " + pitcher.projected_2017_W + " wins and " + pitcher.projected_2017_L + " losses with this guy.";
            break;
          case(3):
            responseString += pitcher.first_name + " " + pitcher.last_name + " is expected to strike out " + pitcher.projected_2017_K + " batters on " + pitcher.projected_2017_IP + " innings of work for the " + pitcherTeam.city + pitcherTeam.name + ". ";
            break;
          case(4):
            responseString += pitcher.first_name + " " + pitcher.last_name + " is a starting pitcher. But you knew that. You're at least as smart as the " + pitcherTeam.city + " " + pitcherTeam.name + ". ";
            break;
          default:
            responseString += "...";
        }
      }
    } else {
      if (pitcher.projected_2017_SV > 16) {
        randomInt = (Math.floor(Math.random()*11));
        switch(randomInt) {
          case(0):
            responseString += "Every fantasy team needs to have its saves. And that means grabbing closers like " + pitcher.first_name + " " + pitcher.last_name + " of the " + pitcherTeam.city + " " + pitcherTeam.name + " who is expected to deliver a good " + pitcher.projected_2016_SV + " saves in the season.";
            break;
          case(1):
            var saveHand = "";
            if (pitcher.throws_LR === "R") {
              saveHand = "Right handed ";
            } else {
              saveHand = "Left handed ";
            }
            responseString += saveHand + "closers are a must-have item for anyone's roster. And the " + userTeam.team_name + " are no exception. We anticipate " + pitcher.projected_2017_SV + " saves out of " + pitcher.first_name + " " + pitcher.last_name + " this year.";
            break;
          case(2):
            responseString += "Just like me... they long to be... Closer to you. " + pitcher.first_name + " " + pitcher.last_name + " is all the closer you could want with his projected " + pitcher.projected_2017_SV + " saves and " + pitcher.projected_2017_K + " strikeouts along the way. ";
            break;
          case(3):
            var closerHand = "";
            if (pitcher.throws_LR === "R") {
              closerHand = "right arm ";
            } else {
              closerHand = "left arm ";
            }
            responseString += pitcher.projected_2017_SV + " saves. That's what you can expect from the " + closerHand + " of " + pitcher.first_name + " " + pitcher.last_name + ". ";
            break;
          case(4):
            responseString += "The " + userTeam.team_name + "look like they could use a few positive numbers in the saves column. Look no further than this " + pitcher.first_name + " " + pitcher.last_name + " of the " + pitcherTeam.city + " " + pitcherTeam.name + ". He's good for around " + pitcher.projected_2017_SV + " saves.";
            break;
          case(5):
            responseString += "You want saves. " + pitcher.first_name + " " + pitcher.last_name + " has saves. That's the story I'm seeing here. You get " + pitcher.projected_2017_SV + " saves with one click of the draft button here.";
            break;
          case(6):
            responseString += "When the " + pitcherTeam.city + " " + pitcherTeam.name + " need the door slammed they turn to this guy. Closer duties mean " + pitcher.projected_2017_SV + " saves for " + pitcher.first_name + " " + pitcher.last_name + " in the season. ";
            break;
          case(7):
            var closerWHIP = pitcher.projected_2017_WHIP;
            var closerWHIPArr = closerWHIP.split('.');
            responseString += pitcher.projected_2017_SV + " saves and about " + closerWHIPArr[0] + " " + closerWHIPArr[1] + " baserunners per inning in pressure-packed situations are in store from " + pitcher.first_name + " " + pitcher.last_name + " of the " + pitcherTeam.city + " " + pitcherTeam.name + ". ";
            break;
          case(8):
            var handSave = "";
            if (pitcher.throws_LR === "R") {
              handSave = "right ";
            } else {
              handSave = "left ";
            }
            responseString += " If you're thinking about acquiring a " + handSave + "pitcher who can deal in the late frames on a slender lead, then you're looking in the right place with " + pitcher.first_name + " " + pitcher.last_name + ". The closer for the " + pitcherTeam.city + " " + pitcherTeam.name + " is expected to produce " + pitcher.projected_2017_SV + " saves in the next campaign. ";
            break;
          case(9):
            responseString += " The " + pitcherTeam.city + " " + pitcherTeam.name + " have got a live arm of a closer in the form of " + pitcher.first_name + " " + pitcher.last_name + " and his projected " + pitcher.projected_2017_SV + " saves.";
            break;
          case(10):
            responseString += "We can anticipate a good " + pitcher.projected_2017_SV + " saves on " + pitcher.projected_2017_K + " strikeouts from " + pitcher.first_name + " " + pitcher.last_name + " of the " + pitcherTeam.city + " " + pitcherTeam.name + ". ";
            break;
          default:
            responseString += "...";
        }
      } else {
        randomInt = (Math.floor(Math.random()*4));
        switch(randomInt) {
          case(0):
            var reliefHand = "";
            if (pitcher.throws_LR === "R") {
              reliefHand = "right handed ";
            } else {
              reliefHand = "southpaw ";
            }
            responseString += "Relief duties fall to this " + reliefHand + "pitcher of the " + pitcherTeam.city + " " + pitcherTeam.name + " bullpen. Look for around " + pitcher.projected_2017_IP + " innings of worke from " + pitcher.first_name + " " + pitcher.last_name + ". ";
            break;
          case(1):
            var reliefHand2 = "";
            if (pitcher.throws_LR === "R") {
              reliefHand2 = "right handed ";
            } else {
              reliefHand2 = "left handed ";
            }
            responseString += pitcher.first_name + " " + pitcher.last_name + " is a decent " + reliefHand2 + " asset for the " + pitcherTeam.city + " " + pitcherTeam.name + " pitching staff. ";
            break;
          case(2):
            var midWHIP = pitcher.projected_2017_WHIP;
            var midWHIPArr = midWHIP.split('.');
            responseString += "They say that relievers get no respect. But you can change that when you draft " + pitcher.first_name + " " + pitcher.last_name + " and his " + midWHIPArr[0] + " " + midWHIPArr[1] + " walkes plus hits per inning pitched.";
            break;
          case(3):
            responseString += pitcher.first_name + " " + pitcher.last_name + " will bring you " + pitcher.projected_2017_K + " strikeouts from the bullpen.";
            break;
          default:
            responseString += "...";
        }
      }
    }

    return (responseString);
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
      vm.getPlayerInfo = getPlayerInfo;
      vm.runDraftSequence = runDraftSequence;
      vm.advanceDraft = advanceDraft;

      function eephusSelectPlayer () {
        var draftPlayer;
        var selectorIndex = 0;
        var playerFound = false;
        var toPosition;

        do {
          if (playerArray[selectorIndex].eligible_C) {
            if (vm.eephusTeam.catcher === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "catcher";
            } else if (vm.eephusTeam.util_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "util_1";
            } else if (vm.eephusTeam.util_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "util_2";
            } else if (vm.eephusTeam.bench_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_1";
            } else if (vm.eephusTeam.bench_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_2";
            } else if (vm.eephusTeam.bench_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_3";
            } else if (vm.eephusTeam.bench_4 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_4";
            } else if (vm.eephusTeam.bench_5 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_5";
            }
          }
          if ((!playerFound) && (playerArray[selectorIndex].eligible_1B)) {
            if (vm.eephusTeam.first_base === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "first_base";
            } else if (vm.eephusTeam.util_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "util_1";
            } else if (vm.eephusTeam.util_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "util_2";
            } else if (vm.eephusTeam.bench_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_1";
            } else if (vm.eephusTeam.bench_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_2";
            } else if (vm.eephusTeam.bench_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_3";
            } else if (vm.eephusTeam.bench_4 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_4";
            } else if (vm.eephusTeam.bench_5 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_5";
            }
          }
          if ((!playerFound) && (playerArray[selectorIndex].eligible_2B)) {
            if (vm.eephusTeam.second_base === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "second_base";
            } else if (vm.eephusTeam.util_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "util_1";
            } else if (vm.eephusTeam.util_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "util_2";
            } else if (vm.eephusTeam.bench_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_1";
            } else if (vm.eephusTeam.bench_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_2";
            } else if (vm.eephusTeam.bench_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_3";
            } else if (vm.eephusTeam.bench_4 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_4";
            } else if (vm.eephusTeam.bench_5 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_5";
            }
          }
          if ((!playerFound) && (playerArray[selectorIndex].eligible_3B)) {
            if (vm.eephusTeam.third_base === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "third_base";
            } else if (vm.eephusTeam.util_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "util_1";
            } else if (vm.eephusTeam.util_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "util_2";
            } else if (vm.eephusTeam.bench_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_1";
            } else if (vm.eephusTeam.bench_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_2";
            } else if (vm.eephusTeam.bench_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_3";
            } else if (vm.eephusTeam.bench_4 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_4";
            } else if (vm.eephusTeam.bench_5 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_5";
            }
          }
          if ((!playerFound) && (playerArray[selectorIndex].eligible_SS)) {
            if (vm.eephusTeam.short_stop === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "short_stop";
            } else if (vm.eephusTeam.util_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "util_1";
            } else if (vm.eephusTeam.util_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "util_2";
            } else if (vm.eephusTeam.bench_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_1";
            } else if (vm.eephusTeam.bench_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_2";
            } else if (vm.eephusTeam.bench_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_3";
            } else if (vm.eephusTeam.bench_4 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_4";
            } else if (vm.eephusTeam.bench_5 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_5";
            }
          }
          if ((!playerFound) && (playerArray[selectorIndex].eligible_OF)) {
            if (vm.eephusTeam.outfield_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "outfield_1";
            } else if (vm.eephusTeam.outfield_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "outfield_2";
            } else if (vm.eephusTeam.outfield_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "outfield_3";
            } else if (vm.eephusTeam.util_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "util_1";
            } else if (vm.eephusTeam.util_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "util_2";
            } else if (vm.eephusTeam.bench_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_1";
            } else if (vm.eephusTeam.bench_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_2";
            } else if (vm.eephusTeam.bench_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_3";
            } else if (vm.eephusTeam.bench_4 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_4";
            } else if (vm.eephusTeam.bench_5 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_5";
            }
          }
          if ((!playerFound) && (playerArray[selectorIndex].eligible_util)) {
            if (vm.eephusTeam.util_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "util_1";
            } else if (vm.eephusTeam.util_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "util_2";
            } else if (vm.eephusTeam.bench_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_1";
            } else if (vm.eephusTeam.bench_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_2";
            } else if (vm.eephusTeam.bench_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_3";
            } else if (vm.eephusTeam.bench_4 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_4";
            } else if (vm.eephusTeam.bench_5 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_5";
            }
          }
          if ((!playerFound) && (playerArray[selectorIndex].eligible_SP)) {
            if (vm.eephusTeam.sp_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "sp_1";
            } else if (vm.eephusTeam.sp_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "sp_2";
            } else if (vm.eephusTeam.p_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "p_1";
            } else if (vm.eephusTeam.p_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "p_2";
            } else if (vm.eephusTeam.p_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "p_3";
            } else if (vm.eephusTeam.p_4 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "p_4";
            } else if (vm.eephusTeam.bench_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_1";
            } else if (vm.eephusTeam.bench_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_2";
            } else if (vm.eephusTeam.bench_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_3";
            } else if (vm.eephusTeam.bench_4 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_4";
            } else if (vm.eephusTeam.bench_5 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_5";
            }
          }
          if ((!playerFound) && (playerArray[selectorIndex].eligible_RP)) {
            if (vm.eephusTeam.rp_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "rp_1";
            } else if (vm.eephusTeam.rp_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "rp_2";
            } else if (vm.eephusTeam.p_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "p_1";
            } else if (vm.eephusTeam.p_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "p_2";
            } else if (vm.eephusTeam.p_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "p_3";
            } else if (vm.eephusTeam.p_4 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "p_4";
            } else if (vm.eephusTeam.bench_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_1";
            } else if (vm.eephusTeam.bench_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_2";
            } else if (vm.eephusTeam.bench_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_3";
            } else if (vm.eephusTeam.bench_4 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_4";
            } else if (vm.eephusTeam.bench_5 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_5";
            }
          }
          if ((!playerFound) && (playerArray[selectorIndex].eligible_P)) {
            if (vm.eephusTeam.p_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "p_1";
            } else if (vm.eephusTeam.p_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "p_2";
            } else if (vm.eephusTeam.p_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "p_3";
            } else if (vm.eephusTeam.p_4 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "p_4";
            } else if (vm.eephusTeam.bench_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_1";
            } else if (vm.eephusTeam.bench_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_2";
            } else if (vm.eephusTeam.bench_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_3";
            } else if (vm.eephusTeam.bench_4 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_4";
            } else if (vm.eephusTeam.bench_5 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_5";
            }
          }
          if ((!playerFound) && (playerArray[selectorIndex].eligible_bench)) {
            if (vm.eephusTeam.bench_1 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_1";
            } else if (vm.eephusTeam.bench_2 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_2";
            } else if (vm.eephusTeam.bench_3 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_3";
            } else if (vm.eephusTeam.bench_4 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_4";
            } else if (vm.eephusTeam.bench_5 === null) {
              draftPlayer = playerArray[selectorIndex];
              playerFound = true;
              toPosition = "bench_5";
            }
          }
          ++selectorIndex;
          if (selectorIndex > playerArray.length) {
            selectorIndex = 0;
          }

        } while (!playerFound);

        playerArray.splice(playerArray.indexOf(draftPlayer), 1);
        updatePlayerRibbonSlots('noFilter');
        updateDraftBar();
        vm.eephusTeam[toPosition] = draftPlayer.id;
        $http.patch(`/fantasyteams/${vm.eephusTeam.id}`, vm.eephusTeam)
        .then(updatedTeam=>{
          updateField();
          ++draftIndex;

          advanceDraft();
        });

        return(draftPlayer);
      }

      function advanceDraft () {

        var playerSelected;

        if (draftSequenceArr[draftIndex] === userTurn) {
          console.log("user pick");
          inputOn = true;
        } else {
          console.log("eephus pick");
          inputOn = false;
          // AI draft functionality here.
          playerSelected = eephusSelectPlayer();
          $http.get(`/teams/${playerSelected.team_id}`)
          .then(selectedTeam=>{
            spokenOutput(playerSelected.first_name + " " + playerSelected.last_name + " of the " + selectedTeam.data.city + " " + selectedTeam.data.name + " is drafted by Eephus Chatterbox.");
          });
        }
      }

      function runDraftSequence () {

        var cointoss = (Math.floor(Math.random()*2));


        // if (cointoss === 0) {
          userTurn = 0;
          eephusTurn = 1;
          spokenOutput(vm.userTeam.team_name + " get the first draft pick.");
          inputOn = true;
        // } else {
        //   userTurn = 1;
        //   eephusTurn = 0;
        //   spokenOutput("Eephus Chatterbox will get the first draft pick.");
        //   inputOn = false;
        //   advanceDraft();
        // }



      }

      function getPlayerInfo() {
        $http.get(`/teams/${vm.playerCard6.team_id}`)
        .then(playerCard6Team=>{
            var card6Team = playerCard6Team.data;
            if (vm.playerCard6.eligible_util) {
              spokenOutput(talkAboutHitter(vm.playerCard6, card6Team));
            } else {
              spokenOutput(talkAboutPitcher(vm.playerCard6, card6Team, vm.userTeam));
            }
        });
      }

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
        if (player.eligible_util) {
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
        cancelDraft();
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
        spokenOutput(vm.playerCard6.first_name + " " + vm.playerCard6.last_name + " is drafted by " + fieldTeam.team_name + ". ");
        deleteButtons();
        var infoButton = document.getElementById('playerInfoButton');
        var draftButton = document.getElementById('playerDraftButton');
        var cancelButton = document.getElementById('playerCancelButton');
        infoButton.setAttribute("style", "display: initial;");
        draftButton.setAttribute("style", "display: initial;");
        cancelButton.setAttribute("style", "display: initial;");
        $http.patch(`/fantasyteams/${fieldTeam.id}`, fieldTeam)
        .then(updatedTeam=>{
          updateField();
          inputOn = true;
          ++draftIndex;
          advanceDraft();
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
          stageLocation.setAttribute("style", "display: initial;");
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
        arrow1.setAttribute("style", "display: initial;");
        arrow2.setAttribute("style", "display: initial;");
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
        draftBar.setAttribute("style", "display: initial;");
        beginDraftBar();
        if (teamName.length) {
          vm.userTeam.team_name = teamName;
          $http.patch(`/fantasyteams/${vm.userTeam.id}`, vm.userTeam)
          .then(result=>{
            console.log(result);
          });
        }
      }

      function setFantasyTeamIDsToLeague () {
        vm.head2headLeague.away = vm.userTeam.id;
        vm.head2headLeague.home = vm.eephusTeam.id;
        $http.patch(`/headtoheadmatchups/${vm.head2headLeague.id}`, vm.head2headLeague)
        .then(updatedIDs=>{
          console.log('this should fix viewleague bug');
        });
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
                    setFantasyTeamIDsToLeague();
                    runDraftSequence();
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
