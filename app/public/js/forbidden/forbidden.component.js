(function() {
  'use strict';

  angular.module('app')
    .component('forbidden', {
      controller: ForbiddenController,
      templateUrl: '/js/forbidden/forbidden.template.html'
    });

    function ForbiddenController(){
      const vm = this;

    }

}());
