describe('Component: heroesDetails', function() {
  var Hero,HeroesApiFactory,controller;
  var $componentController,$q,$scope;
  var mockHeroes = window.HeroesData;
  var updateHero = {
      id: 10,
      name: 'Hello World',
      location: 'NYC'
  }
  beforeEach(angular.mock.module('tourOfHeroesApp'));
  beforeEach(inject(function(_Hero_,_HeroesApiFactory_,_$componentController_,_$q_,_$rootScope_) {
    $q = _$q_;
    $scope = _$rootScope_.$new();
    $componentController = _$componentController_;
    Hero = _Hero_;
    HeroesApiFactory = _HeroesApiFactory_;
  }));
  beforeEach(function(){
    var bindings = { heroId: 10}
    updateHero = new Hero(updateHero);
    controller = $componentController('heroDetails',null, bindings);
    
    spyOn(HeroesApiFactory, "getHero").and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve(mockHeroes[0]);
        return deferred.promise;
    });

    spyOn(HeroesApiFactory, "update").and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve(updateHero);
        return deferred.promise;
    });
    

  });

  it('Controller should exist', function() {
    expect(controller).toBeDefined();
  });

  it('should have hero',function(){
    controller.$onInit();
    $scope.$digest();
    expect(controller.hero).toBeDefined();
    expect(controller.hero).toEqual(mockHeroes[0]);
  });

  it('should save a updated hero',function(){
    controller.$onInit();
    $scope.$digest();    
    expect(controller.save).toBeDefined();
    controller.save("hero",updateHero);
    $scope.$digest();
    expect(HeroesApiFactory.update).toHaveBeenCalledWith(updateHero);
    expect(controller.hero).toEqual(updateHero);
  });

});