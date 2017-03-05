var bench1_dropdown = document.getElementById('dropdownBench1');
generateDropdownMenu(vm.userTeamB1, bench1_dropdown, "bench1");
var bench2_dropdown = document.getElementById('dropdownBench2');
generateDropdownMenu(vm.userTeamB2, bench2_dropdown, "bench2");
var bench3_dropdown = document.getElementById('dropdownBench3');
generateDropdownMenu(vm.userTeamB3, bench3_dropdown, "bench3");
var bench4_dropdown = document.getElementById('dropdownBench4');
generateDropdownMenu(vm.userTeamB4, bench4_dropdown, "bench4");
var bench5_dropdown = document.getElementById('dropdownBench5');
generateDropdownMenu(vm.userTeamB5, bench5_dropdown, "bench5");
var bench1Click = document.getElementById('dropdownBench1');
var tempPlayer;
var tempTeam;
bench1Click.addEventListener('click', (event) =>{
  var positionClicked = event.target;

  switch(positionClicked.innerHTML) {
    case("Catcher"):
      console.log("catcher");
      tempPlayer = vm.userTeamCatcher;
      tempTeam = vm.userTeamCatcherTeam;
      vm.userTeamCatcher = vm.userTeamB1;
      vm.userTeamCatcherTeam = vm.userTeamB1Team;
      break;
    case("First Base"):
      tempPlayer = vm.userTeam1B;
      tempTeam = vm.userTeam1BTeam;
      vm.userTeam1B = vm.userTeamB1;
      vm.userTeam1BTeam = vm.userTeamB1Team;
      break;
    case("Second Base"):
      tempPlayer = vm.userTeam2B;
      tempTeam = vm.userTeam2BTeam;
      vm.userTeam2B = vm.userTeamB1;
      vm.userTeam2BTeam = vm.userTeamB1Team;
      break;
    case("Third Base"):
      tempPlayer = vm.userTeam3B;
      tempTeam = vm.userTeam3BTeam;
      vm.userTeam3B = vm.userTeamB1;
      vm.userTeam3BTeam = vm.userTeamB1Team;
      break;
    case ("Shortstop"):
      tempPlayer = vm.userTeamSS;
      tempTeam = vm.userTeamSSTeam;
      vm.userTeamSS = vm.userTeamB1;
      vm.userTeamSSTeam = vm.userTeamB1Team;
      break;
    case("Left Field"):
      tempPlayer = vm.userTeamOF1;
      tempTeam = vm.userTeamOF1Team;
      vm.userTeamOF1 = vm.userTeamB1;
      vm.userTeamOF1Team = vm.userTeamB1Team;
      break;
    case("Center Field"):
      tempPlayer = vm.userTeamOF2;
      tempTeam = vm.userTeamOF2Team;
      vm.userTeamOF2 = vm.userTeamB1;
      vm.userTeamOF2Team = vm.userTeamB1Team;
      break;
    case("Right Field"):
      tempPlayer = vm.userTeamOF3;
      tempTeam = vm.userTeamOF3Team;
      vm.userTeamOF3 = vm.userTeamB1;
      vm.userTeamOF3Team = vm.userTeamB1Team;
      break;
    case("Utility 1"):
      tempPlayer = vm.userTeamU1;
      tempTeam = vm.userTeamU1Team;
      vm.userTeamU1 = vm.userTeamB1;
      vm.userTeamU2Team = vm.userTeamB1Team;
      break;
    case("Utility 2"):
      tempPlayer = vm.userTeamU2;
      tempTeam = vm.userTeamU2Team;
      vm.userTeamU2 = vm.userTeamB1;
      vm.userTeamU2Team = vm.userTeamB1Team;
      break;
    case("Starting Pitcher 1"):
      tempPlayer = vm.userTeamSP1;
      tempTeam = vm.userTeamSP1Team;
      vm.userTeamSP1 = vm.userTeamB1;
      vm.userTeamSP1Team = vm.userTeamB1Team;
      break;
    case("Starting Pitcher 2" ):
      tempPlayer = vm.userTeamSP2;
      tempTeam = vm.userTeamSP2Team;
      vm.userTeamSP2 = vm.userTeamB1;
      vm.userTeamSP2Team = vm.userTeamB1Team;
      break;
    case("Relief Pitcher 1"):
      tempPlayer = vm.userTeamRP1;
      tempTeam = vm.userTeamRP1Team;
      vm.userTeamRP1 = vm.userTeamB1;
      vm.userTeamRP1Team = vm.userTeamB1Team;
      break;
    case("Relief Pitcher 2"):
      tempPlayer = vm.userTeamRP2;
      tempTeam = vm.userTeamRP2Team;
      vm.userTeamRP2 = vm.userTeamB1;
      vm.userTeamRP2Team = vm.userTeamB1Team;
      break;
    case("Pitcher 1"):
      tempPlayer = vm.userTeamP1;
      tempTeam = vm.userTeamP1Team;
      vm.userTeamP1 = vm.userTeamB1;
      vm.userTeamP1Team = vm.userTeamB1Team;
      break;
    case("Pitcher 2"):
      tempPlayer = vm.userTeamP2;
      tempTeam = vm.userTeamP2Team;
      vm.userTeamP2 = vm.userTeamB1;
      vm.userTeamP2Team = vm.userTeamB1Team;
      break;
    case("Pitcher 3"):
      tempPlayer = vm.userTeamP3;
      tempTeam = vm.userTeamP3Team;
      vm.userTeamP3 = vm.userTeamB1;
      vm.userTeamP3Team = vm.userTeamB1Team;
      break;
    case("Pitcher 4"):
      tempPlayer = vm.userTeamP4;
      tempTeam = vm.userTeamP4Team;
      vm.userTeamP4 = vm.userTeamB1;
      vm.userTeamP4Team = vm.userTeamB1Team;
      break;
    default:
      tempPlayer = null;
      tempTeam = null;
      console.log('invalid click');
  }
  if ((tempPlayer !== null) && (tempTeam !== null)) {
    vm.userTeamB1 = tempPlayer;
    vm.userTeamB1Team = tempTeam;
    generateDropdownMenu(vm.userTeamB1, bench1_dropdown, "bench1");
  }
});
