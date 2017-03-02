(function() {
  'use strict';

  angular.module('app')
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function config($stateProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
      .state({
        name: 'app',
        abstract: true,
        component: 'app',
      })
      .state({
        name: 'landing',
        url: '/',
        parent: 'app',
        component: 'landing'
      })
      .state({
        name: 'login',
        url: '/login',
        parent: 'app',
        component: 'login'
      })
      .state({
        name: 'forbidden',
        url: '/forbidden',
        parent: 'app',
        component: 'forbidden'
      });
      // .state({
      //   name: 'userhome',
      //   url: '/userhome',
      //   parent: 'app',
      //   component: 'userhome'
      // })
      // .state({
      //   name: 'draft',
      //   url: '/jobView',
      //   parent: 'app',
      //   component: 'draft'
      // });
  }

}());
