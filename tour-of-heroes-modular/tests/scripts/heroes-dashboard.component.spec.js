describe('component: heroesDashboard', function() {
  var Hero,HeroesApiFactory,controller,createHero;
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
      createHero = new Hero({ id: 100, name: 'New Hero'});
      controller = $componentController('heroesDashboard');
      spyOn(HeroesApiFactory, "getHeroes").and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve(mockHeroes);
          return deferred.promise;
      });
      spyOn(HeroesApiFactory, "create").and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve(createHero);
          return deferred.promise;
      });
  });

  it('Controller should exist', function() {
    expect(controller).toBeDefined();
  });

  it('should have topHeroes',function(){
    controller.$onInit();
    $scope.$digest();
    expect(controller.topHeroes).toBeDefined();
    expect(controller.topHeroes).toEqual(jasmine.any(Array));
    expect(controller.topHeroes.length).toEqual(4);
  });

  it('should have newHeroes',function(){
    controller.$onInit();
    $scope.$digest();
    expect(controller.newHeroes).toBeDefined();
    expect(controller.newHeroes).toEqual(jasmine.any(Array));
    expect(controller.newHeroes.length).toEqual(4);
    expect(controller.newHeroes[0]).toEqual(mockHeroes[mockHeroes.length-1]);
  });

  it('create new hero should appear in newHeroes',function(){
    controller.$onInit();
    $scope.$digest();
    controller.add("hero",createHero);
    $scope.$digest();
    expect(HeroesApiFactory.create).toHaveBeenCalledWith(createHero);
    expect(controller.newHeroes[0]).toEqual(createHero);
  });

});