(function (angular) {
  'use strict';
  document.body.setAttribute('ng-app', 'app');

  angular.module('app', ['ngComponentRouter']).
  service('heroService', function ($q) {
    var heroesPromise = $q.resolve([{
      id: 11,
      name: 'Mr. Nice' },
    {
      id: 12,
      name: 'Narco' },
    {
      id: 13,
      name: 'Bombasto' },
    {
      id: 14,
      name: 'Celeritas' },
    {
      id: 15,
      name: 'Magneta' },
    {
      id: 16,
      name: 'RubberMan' },
    {
      id: 17,
      name: 'Dynama' },
    {
      id: 18,
      name: 'Dr IQ' },
    {
      id: 19,
      name: 'Magma' },
    {
      id: 20,
      name: 'Tornado' }]);


    this.getHeroes = function () {
      return heroesPromise;
    };

    this.getHero = function (id) {
      return heroesPromise.then(function (heroes) {
        for (var i = 0; i < heroes.length; i++) {
          if (heroes[i].id === id) return heroes[i];
        }
      });
    };

    this.removeHero = function (id) {
      return heroesPromise.then(function (heroes) {
        var newHeros = [];
        for (var i = 0; i < heroes.length; i++) {
          if (heroes[i].id !== id) newHeros.push(heroes[i]);
        }

        heroesPromise = $q.resolve(newHeros);
        return heroesPromise;
      });
    };

    this.updateHero = function (id, name) {
      return heroesPromise.then(function (heroes) {
        for (var i = 0; i < heroes.length; i++) {
          if (heroes[i].id === id) heroes[i].name = name;
        }

        heroesPromise = $q.resolve(heroes);
        return heroesPromise;
      });
    };
  }).
  config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  }).
  value('$routerRootComponent', 'app').
  component('app', {
    template: '\n      <h1>Tour of Heroes</h1>\n      <nav>\n        <a ng-link="[\'Dashboard\']">Dashboard</a>\n        <a ng-link="[\'Heroes\']">Heroes</a>\n      </nav>\n      <ng-outlet></ng-outlet>',






    controller: function controller() {
      setTimeout(function () {
        document.querySelector('a[ng-link="[\'Dashboard\']"]').click();
      }, 100);
    },
    $routeConfig: [{
      path: '/dashboard/...',
      name: 'Dashboard',
      component: 'dashboard',
      useAsDefault: true },
    {
      path: '/heroes/...',
      name: 'Heroes',
      component: 'heroes' }] }).


  component('heroes', {
    template: '<ng-outlet></ng-outlet>',
    $routeConfig: [{
      path: '/',
      name: 'HeroList',
      component: 'heroList',
      useAsDefault: true },
    {
      path: '/:id',
      name: 'HeroDetail',
      component: 'heroDetail' }] }).


  component('heroList', {
    template: '\n      <h2>My Heroes</h2>\n      <div>\n        <label>Hero name:</label>\n        <input ng-model="$ctrl.search"/>\n      </div>\n      <ul>\n        <li ng-repeat="hero in $ctrl.heroes | filter:$ctrl.search" ng-link="[\'HeroDetail\', {id: hero.id}]">\n          <span class="badge">{{hero.id}}</span>\n          <span>{{hero.name}}</span>\n          <button class="delete" ng-click="$ctrl.remove(hero)">X</button>\n        </li>\n      </ul>',












    controller: function controller(heroService) {
      var $ctrl = this;
      this.$routerOnActivate = function (next) {
        heroService.getHeroes().then(function (heroes) {
          $ctrl.heroes = heroes;
        });
      };

      this.remove = function (hero) {
        heroService.removeHero(hero.id).then(function (heroes) {
          $ctrl.heroes = heroes;
        });
      };
    } }).

  component('heroDetail', {
    template: '\n      <h2>{{$ctrl.title}}</h2>\n      <div>\n        <label>id: </label>\n        <span>{{$ctrl.hero.id}}</span>\n      </div>\n      <div>\n        <label>name: </label>\n        <input id="name" placeholder="name" ng-model="$ctrl.hero.name"/>\n      </div>\n      <button ng-click="$ctrl.back()">Back</button>\n      <button ng-click="$ctrl.save()">Save</button>',











    bindings: {
      $router: '<' },

    controller: function controller(heroService) {
      var $ctrl = this;
      this.$routerOnActivate = function (next) {
        var id = next.params.id;
        heroService.getHero(id).then(function (hero) {
          $ctrl.hero = JSON.parse(JSON.stringify(hero));
          $ctrl.title = hero.name + ' details!';
        });
      };

      this.back = function () {
        if ($ctrl.$router.parent.hostComponent === 'heroes')
        $ctrl.$router.navigate(['HeroList']);else

        $ctrl.$router.navigate(['TopHero']);
      };

      this.save = function () {
        heroService.updateHero(this.hero.id, this.hero.name).then(function (heroes) {
          if ($ctrl.$router.parent.hostComponent === 'heroes')
          $ctrl.$router.navigate(['HeroList']);else

          $ctrl.$router.navigate(['TopHero']);
        });
      };
    } }).

  component('dashboard', {
    template: '\n    <ng-outlet></ng-outlet>',

    $routeConfig: [{
      path: '/',
      name: 'TopHero',
      component: 'topHero',
      useAsDefault: true },
    {
      path: '/:id',
      name: 'HeroDetail',
      component: 'heroDetail' }] }).


  component('topHero', {
    template: '\n      <h3>Top Heroes</h3>\n      <div class="grid">\n        <div class="grid-item" ng-repeat="hero in $ctrl.topHeroes" ng-link="[\'HeroDetail\', {id: hero.id}]">\n          <h4>{{hero.name}}</h4>\n        </div>\n      </div>\n      <div>\n        <h4 class="search-title">Hero Search</h4>\n        <input ng-model="$ctrl.search"/>\n        <div ng-show="$ctrl.search">\n          <div class="search-result" ng-repeat="hero in $ctrl.heroes | filter:$ctrl.search" ng-link="[\'HeroDetail\', {id: hero.id}]">\n            {{hero.name}}\n          </div>\n        </div>\n      </div>',















    controller: function controller(heroService) {
      var $ctrl = this;
      this.$routerOnActivate = function (next) {
        heroService.getHeroes().then(function (heroes) {
          $ctrl.heroes = heroes;
          $ctrl.topHeroes = heroes.filter(function (item, index) {
            return index < 4;
          });
        });
      };
    } });

})(window.angular);