(function() {
  'use strict';

  angular.module('app')
    .component('draftlobby', {
      controller: DraftLobbyController,
      templateUrl: '/js/draftlobby/draftlobby.template.html'
    });

    DraftLobbyController.$inject = ['$http', '$state', '$stateParams'];

    function DraftLobbyController($http, $state, $stateParams) {
      const vm = this;

      vm.$onInit = onInit;

      function onInit() {
        console.log('This is draftlobby');
        
      }
    }

}());
