(function(angular){
"use strict";
	function controller(Hero){
		var ctrl = this;
		ctrl.newHero = new Hero();

		ctrl.save = function(){
			ctrl.onSave({value: ctrl.newHero});
			ctrl.newHero = new Hero();
		}
	}

	angular.module('tourOfHeroesApp')
	.component('heroAdd',{
		templateUrl: 'templates/hero-add.html',
		controller: ['Hero',controller],
		bindings: {
			onSave: '&'
		}
	});

})(window.angular);