describe('Component: heroesList', function() {
  var Hero,HeroesApiFactory,controller;
  var $componentController,$q,$scope;
  var mockHeroes = window.HeroesData;
  beforeEach(angular.mock.module('tourOfHeroesApp'));
  beforeEach(inject(function(_Hero_,_HeroesApiFactory_,_$componentController_,_$q_,_$rootScope_) {
    $q = _$q_;
    $scope = _$rootScope_.$new();
    $componentController = _$componentController_;
    Hero = _Hero_;
    HeroesApiFactory = _HeroesApiFactory_;
  }));
  beforeEach(function(){
      controller = $componentController('heroesList');
      spyOn(HeroesApiFactory, "getHeroes").and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve(mockHeroes);
          return deferred.promise;
      });
      spyOn(HeroesApiFactory, "search").and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve(mockHeroes.slice(0,4)); // return first 4 heroes
          return deferred.promise;
      });
  });

  it('Controller should exist', function() {
    expect(controller).toBeDefined();
  });

  it('should have heroes',function(){
    controller.$onInit();
    $scope.$digest();
    expect(controller.heroes).toBeDefined();
    expect(controller.heroes).toEqual(jasmine.any(Array));
    expect(controller.heroes.length).toEqual(mockHeroes.length);
  });

  it('should have selectedHero',function(){
    controller.$onInit();
    $scope.$digest();
    expect(controller.selectedHero).toEqual(null);
  });
  
  it('onSelect should set selectedHero',function(){
    controller.$onInit();
    $scope.$digest();
    var selectHero = mockHeroes[0];
    expect(controller.onSelect).toBeDefined();
    controller.onSelect(selectHero);
    expect(controller.selectedHero).toEqual(selectHero);
  });

  it('search should return heroes with search term',function(){
    controller.$onInit();
    $scope.$digest();
    controller.search("ma");
    $scope.$digest();
    expect(controller.heroes.length).toEqual(4);
  });

});