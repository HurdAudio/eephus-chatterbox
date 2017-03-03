(function() {
  'use strict';

  angular.module('app')
    .component('forbidden', {
      controller: ForbiddenController,
      templateUrl: '/js/forbidden/forbidden.template.html'
    });

    ForbiddenController.$inject = ['$http', '$state'];

    function ForbiddenController($http, $state){
      const vm = this;
      vm.backToLogin = backToLogin;

      function backToLogin() {
        $http.get('/login').then(()=>{
          $state.go('login');
        });
      }

    }

}());
