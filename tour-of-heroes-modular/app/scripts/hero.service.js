(function(angular){
"use strict";
// Returns a Hero class
	function HeroService(){
		function Hero(options){
			this.id = null;
			this.name = '';
			this.location = '';
			for (var property in options) {
				if (this.hasOwnProperty(property)) {
					this[property] = options[property];
				}
			}
		}
		return Hero;
	} // end HeroService

	angular.module('tourOfHeroesApp').service('Hero',[HeroService]);

})(window.angular);