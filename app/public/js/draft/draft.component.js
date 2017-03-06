(function() {
  'use strict';

  angular.module('app')
    .component('draft', {
      controller: DraftController,
      templateUrl: '/js/draft/draft.template.html'
    });

    DraftController.$inject = ['$http', '$state', '$stateParams'];

    function DraftController($http, $state, $stateParams) {
      const vm = this;

      vm.$onInit = onInit;

      function onInit() {
        console.log('This is draft');

      }
    }

}());
