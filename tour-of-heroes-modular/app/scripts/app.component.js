// Code goes here
(function(angular){
"use strict";
	function appComponentController($scope){
		$scope.title = 'Tour of Heroes';
		$scope.isNavCollapsed = true;
	}
	angular.module('tourOfHeroesApp')
	.component('appComponent',{
		templateUrl: 'templates/appComponent.html',
		controller: ['$scope',appComponentController]
	})
})(window.angular);