(function(angular){
"use strict";
	function controller($scope,HeroesApiFactory){	
		var ctrl = this;
		ctrl.hero = null;
		ctrl.isEdit = false;
		this.$onInit = function(){
			HeroesApiFactory.getHero(ctrl.heroId).then(function(hero){
				ctrl.hero = hero;
			},
			function(error){
				console.warn("no hero found");
			})
		};
		ctrl.edit = function(){
			ctrl.isEdit = true;
		}
		ctrl.goBack = function(){
			window.history.back();
		}
		ctrl.save = function(param,hero){
			if(hero && hero.id){
				HeroesApiFactory.update(hero).then(function(hero){
					ctrl.hero = hero;
				},
				function(error){
					console.warn("failed to save hero",error)
				})
			}
		}
	}


	angular.module('tourOfHeroesApp')
	.component('heroDetails',{
		templateUrl: 'templates/hero-details.html',
		controller: ['$scope','HeroesApiFactory',controller],
		bindings:{
			heroId: '<'
		}
	});


})(window.angular);