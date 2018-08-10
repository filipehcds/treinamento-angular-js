(function() {
  "use strict";
  var app = angular.module('HeroesResourcesMock', ['ngMockE2E']);
  window.initMockHeroesResource = initMockHeroesResource;
  app.run(function($httpBackend) {
    var HeroesData = [
      {"id": null, "name": "Mr. Nice", "location": "NYC"},
      {"id": null, "name": "Narco"},
      {"id": null, "name": "Bombasto"},
      {"id": null, "name": "Celeritas"},
      {"id": null, "name": "Magneta"},
      {"id": null, "name": "RubberMan"},
      {"id": null, "name": "Dynama"},
      {"id": null, "name": "Dr IQ"},
      {"id": null, "name": "Magma"},
      {"id": null, "name": "Tornado"}
    ]
    
    /* Create IDs for each item */
    initMockHeroesResource(HeroesData,$httpBackend);
    $httpBackend.whenGET('').passThrough();
  }); // end run

function initMockHeroesResource(HeroesData,$httpBackend){

    
    /* Create IDs for each item */
    
    HeroesData.forEach(function(hero,index){
      hero.id = index+10;
    })

    var heroesURL = "api/heroes";
    var editingRegex = new RegExp(heroesURL + "/[0-9][0-9]*", '');

    $httpBackend.whenDELETE(editingRegex).respond(function(method, url, data) {
      var parameters = url.split('/');
      var length = parameters.length;
      var id = parameters[length - 1];
      HeroesData = HeroesData.filter(function(hero){
        return hero.id !== parseInt(id);
      });
      return [200, HeroesData, {}];
    });
    $httpBackend.whenGET(editingRegex).respond(function(method, url, data) {
      var hero = {
        "id": 0
      };
      var parameters = url.split('/');
      var length = parameters.length;
      var id = parameters[length - 1];
      if (id > 0) {
        for (var i = 0; i < HeroesData.length; i++) {
          if (HeroesData[i].id == id) {
            hero = HeroesData[i];
            break;
          }
        };
      }
      return [200, hero, {}];
    });

    $httpBackend.whenGET(heroesURL).respond(function() {
      return [200, HeroesData, {}];
    });

    $httpBackend.whenPOST(heroesURL).respond(function(method, url, data) {
      var hero = angular.fromJson(data);
      if (!hero.id) {
        // New hero
        hero.id = HeroesData[HeroesData.length - 1].id + 1;
        HeroesData.push(hero);
      } else {
        // Updated hero
        for (var i = 0; i < HeroesData.length; i++) {
          if (HeroesData[i].id == hero.id) {
            HeroesData[i] = hero;
            break;
          }
        };
      }
      return [200, hero, {}];
    });

    //$httpBackend.whenGET('').passThrough();

} // end

})();