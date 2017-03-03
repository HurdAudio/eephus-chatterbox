(function() {
  'use strict';

  angular.module('app')
    .component('login', {
      controller: LoginController,
      templateUrl: '/js/login/login.template.html'
    });

    LoginController.$inject = ['$http', '$state', 'userService'];

    function LoginController($http, $state, userService){
      const vm = this;

      vm.loginButton = loginButton;
      vm.newAccountButton = newAccountButton;

      function loginButton(){
        console.log('testing forbidden route');
        $http.get('/forbidden').then(()=>{
          $state.go('forbidden');
        });
      }

      function newAccountButton() {
        console.log('testing user account route');
        $http.get('/useraccount').then(()=>{
          $state.go('useraccount');
        });
      }

      vm.userValidate = function(){
        userService.validate();
        console.log(userService.id);
      };
  }
}());
