angular
  .module('radioTool', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/index.html',
        controller: 'StationToolController',
        controllerAs: 'vm'
        })
  });
