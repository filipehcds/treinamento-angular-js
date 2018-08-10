(function(angular){
"use strict";
	function HeroesApiFactory($http,$q,$timeout,Hero,filterFilter){
		var $this = this;
		$http.defaults.headers.common
		var heroesHeaders = {
			'Content-Type': 'application/json'
		}
		var doLookup = true;
		var apiUrl = 'api/heroes';
		var api = {};
		$this.heroes = [];
		api.create = function(heroData){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http({
				method: 'POST',
				url: apiUrl,
				headers: heroesHeaders,
				data: heroData
			}).then(function(response){
				var hero = new Hero(response.data);
				if(hero.id){
					deferred.resolve(hero);
				}
				else{
					deferred.reject({status: 'error', message: 'Hero Not Found: '+id});
				}
			});

			return promise;
		}

		api.delete = function(id){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$http({
				method: 'DELETE',
				url: apiUrl+"/"+id
			}).then(function(response){
				deferred.resolve(response.data);
			});
			return promise;
		}

		api.update = function(hero){
			var deferred = $q.defer();
			var promise = deferred.promise;
			hero = hero instanceof Hero ? hero : new Hero(hero);

			$http({
				method: 'POST',
				url: apiUrl,
				headers: heroesHeaders,
				data: hero
			}).then(function(response){
				var hero = new Hero(response.data);
				if(hero.id){
					deferred.resolve(hero);
				}
				else{
					deferred.reject({status: 'error', message: 'Hero Not Found: '+id});
				}
			});
			return promise;

		}
		api.getHero = function(id){
			var deferred = $q.defer();
			var promise = deferred.promise;
			id = parseInt(id);
			$http.get(apiUrl+"/"+id).then(function(response){
				var hero = new Hero(response.data);
				if(hero.id){
					deferred.resolve(hero);
				}
				else{
					deferred.reject({status: 'error', message: 'Hero Not Found: '+id});
				}
			});
			return promise;
		}

		api.getHeroes = function(){
			var deferred = $q.defer();
			var promise = deferred.promise;

			$http.get(apiUrl).then(function(response){
				var heroes = [];
				response.data.forEach(function(hero){
					heroes.push(new Hero(hero));
				})
				deferred.resolve(heroes);
			});
			return promise;
		}

		api.search = function(term){
			var deferred = $q.defer();
			var promise = deferred.promise;
			this.getHeroes().then(function(heroes){
				deferred.resolve(filterFilter(heroes,term));
			},
			function(error){
				deferred.resolve([]);
			});
			
			return promise;
		}
		return api;
	} // end api

	angular.module('tourOfHeroesApp').factory('HeroesApiFactory',['$http','$q','$timeout','Hero','filterFilter',HeroesApiFactory]);

})(window.angular);