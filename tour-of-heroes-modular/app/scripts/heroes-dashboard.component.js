(function(angular){
"use strict";
	function controller($scope,HeroesApiFactory){
		var ctrl = this;
		ctrl.topHeroes = [];
		ctrl.newHeroes = [];
		this.$onInit = function(){
			HeroesApiFactory.getHeroes().then(function(data){
				var topHeroes = angular.copy(data);
				ctrl.topHeroes = topHeroes.splice(1,4);
				var newHeroes = angular.copy(data);
				newHeroes.sort(function(hero1,hero2){
					return hero2.id - hero1.id;
				})
				ctrl.newHeroes = newHeroes.slice(0,4);
			})
		}
		ctrl.add = function(prop,hero){
			var name = hero.name;
			if(!name){ return; }
			HeroesApiFactory.create(hero).then(function(hero){
				if(ctrl.newHeroes.length>3){
					ctrl.newHeroes.pop();
				}
				if(ctrl.topHeroes.length<4){
					ctrl.topHeroes.push(hero);
				}
				ctrl.newHeroes.unshift(hero);
			})
			ctrl.heroName = "";
		}
	}
	
	angular.module('tourOfHeroesApp')
	.component('heroesDashboard',{
		templateUrl: 'templates/heroes-dashboard.html',
		controller: ['$scope','HeroesApiFactory',controller]
	});

})(window.angular);