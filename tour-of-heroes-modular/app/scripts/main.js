(function(){
"use strict";
	if(window.isUnitTesting===false){
		angular.module('tourOfHeroesApp',['HeroesResourcesMock','ui.router','ngAnimate','ngSanitize','ui.bootstrap']);
	}else{
		angular.module('tourOfHeroesApp',['ui.router','ngAnimate','ngSanitize','ui.bootstrap']);
	}
	angular.element(document).ready(function() {
		var appEl = document.getElementById("tour-of-heroes-app");
		angular.bootstrap(appEl, ['tourOfHeroesApp']);
	});
})()