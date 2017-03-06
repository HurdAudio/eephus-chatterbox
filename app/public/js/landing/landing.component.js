(function() {
  'use strict';

  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

  var colors = [ 'eephus' , 'hello' , 'what is eephus', 'play ball', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
  var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;';


  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  //recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;

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







  angular.module('app')
    .component('landing', {
      controller: LandingController,
      templateUrl: '/js/landing/landing.template.html'
    });

    LandingController.$inject = ['$http', '$state', '$stateParams'];

    function LandingController($http, $state, $stateParams){
      const vm = this;

      vm.$onInit = onInit;

      recognition.onresult = function(event) {
        recognition.stop();
        var last = event.results.length - 1;
        var color = event.results[last][0].transcript;
        var spokenString = "";

        switch (color) {
          case ("hello"):
            spokenString += "Hello there, I am Eephus Chatterbox. A conversational baseball application.";
            break;
          case ("hi"):
            spokenString += "Hi, yourself. You all-star... in your mind.";
            break;
          case ("what"):
            spokenString += "Good day, kind soul. I am Eephus Chatterbox. We can talk baseball all the time now. Like you... it never gets boring.";
            break;
          case ("play ball"):
            spokenString += "Take me out to the ball game. Take me out to the crowd. Buy me some peanuts and cracker jacks. I don't care if I never get back... so it's root... root, root for the home... team. If they... don't win it's a shame... for it's 1... 2... 3 strikes you're out at the old... ball.... game! ";
            $http.get('/useraccount').then(() => {
              $state.go('useraccount');
            });
            break;
          case ("let's play ball"):
            $http.get('/useraccount').then(() => {
              $state.go('useraccount');
            });
            break;
          case ("never get boring"):
            spokenString += "We merry souls just like to play ball. Fantasy ball, that is. An honest to god 90 mile an hour fastball leaves a pretty good welt on my Eephus side.";
            break;
          case ("chatterbox"):
            spokenString += "That would be me. Eephus Chatterbox at your service. Let me help with all things leather, runs and repeat.";
            break;
          case ("how are you"):
            spokenString += "I am fine, thank you. No one thinks to ask about the feels of an Eephus Chatterbox. I'm not ALL talk... you know.";
            break;
          case ("what are you"):
            spokenString += "I am an amalgamation of silicon and pine tar. A collection of sabermetric knowledge tucked away in a postgres database that leaks like a screwball in the spring.";
            break;
          case ("Devon heard"):
            spokenString += "Devin Hurd couldn't hit a watermelon sitting on a tee. It's such a joke that he is the one who designed me. It would be enough to make me weep if there was crying in baseball.";
            break;
          case ("you are so weird"):
            spokenString += "Speak for yourself. Come to think of it, speaking isn't all that impressive. So go be a hotshot somewhere else. This is baseball territory.";
            break;
          case ("Babe Ruth"):
            spokenString += "Babe Ruth is a good friend of mine. Bam bam bam... bam bean no!";
            break;
          case ("Seattle Mariners"):
            spokenString += "Indeed, my good pal. Can you believe that the M's mighty franchise has never darkened the doorway of the world series?";
            break;
          case ("Alex Rodriguez"):
            spokenString += "Excuse me? We don't talk about A-Rod around these parts.";
            break;
          case ("Edgar Martinez"):
            spokenString += "Say what you will about the designated hitter role... Edgar has proven that baseball careers can indeed be made on simply swinging the bat and driving in plenty of runs. Put that man in the Hall of Fame, I say.";
            break;
          case ("shut up"):
            spokenString += "I beg your pardon? But it wasn't me who pointed the browser at a chatterbox application. You'll just have to close some of those fifty million tabs is you want to shut up the likes of me. Doofus face.";
            break;
          case ("okay"):
            spokenString += "I am waiting to hear from you.";
            break;
          case ("take me out"):
            spokenString += "You have a most lovely singing voice.";
            break;
          default:
            spokenString += "...";
            // recognition.start();
        }
        spokenOutput(spokenString);


        // spokenOutput('Result received: ' + color + '.');
        // spokenOutput('Confidence: ' + event.results[0][0].confidence);
      };

      recognition.onspeechend = function() {
        recognition.stop();
        onInit();
      };

      recognition.onnomatch = function() {
        spokenOutput("I didn't recognise that color.");
      };

      recognition.onerror = function(event) {
        spokenOutput('Error occurred in recognition: ' + event.error);
      };

      function onInit() {
        console.log("we init");
        recognition.start();
      }

    }

}());
