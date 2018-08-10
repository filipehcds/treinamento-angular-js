describe('component: heroSearch', function() {
  var Hero;
  var $componentController,$timeout;

  beforeEach(angular.mock.module('tourOfHeroesApp'));
  beforeEach(inject(function(_Hero_, _$componentController_,_$timeout_) {
    $componentController = _$componentController_;
    $timeout = _$timeout_;
    Hero = _Hero_;
  }));

  describe('Test showList=FALSE',function(){
    var controller;
    var onSearchSpy = jasmine.createSpy('onSearch');
    var bindings = {
      showList: false,
      onSearch: onSearchSpy
    };
    beforeEach(function() {
      controller = $componentController('heroSearch',null,bindings);
    });
    it('Controller should exist', function() {
      expect(controller).toBeDefined();
    });
    it('should expose a `onSearch` function', function() {
      expect(controller.onSearch).toBeDefined();
    });
    it('should expose a `showList` boolean and should be `false` ', function() {
      expect(controller.showList).toBeDefined();
      expect(controller.showList).toEqual(false);
    });
    it('should have `heroes` array and `searchTerm` string',function(){
      expect(controller.heroes).toBeDefined();
      expect(controller.heroes).toEqual([]);
      expect(controller.searchTerm).toBeDefined();
      expect(controller.searchTerm).toEqual("");
    })
    it('should call the `onSearch` binding', function() {
      controller.searchTerm = "ma"
      controller.search();
      $timeout.flush();
      expect(onSearchSpy).toHaveBeenCalledWith({
        value: controller.searchTerm
      });
    });
  }); // end 'Test showList=FALSE'

  describe('Test showList=TRUE',function(){
    var controller,HeroesApiFactory,$httpBackend;
    var bindings = {
      showList: true
    };
    var onSearchSpy = jasmine.createSpy('onSearch');
    beforeEach(inject(function(_HeroesApiFactory_,_$httpBackend_,$q) {        
        $httpBackend = _$httpBackend_;
        controller = $componentController('heroSearch',null,bindings);
        HeroesApiFactory = _HeroesApiFactory_;
        spyOn(HeroesApiFactory, "search").and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve(["mama"]);
            return deferred.promise;
        });
    }));
    it('Controller should exist', function() {
      expect(controller).toBeDefined();
    });
    it('should expose a `showList` boolean and should be `true` ', function() {
      expect(controller.showList).toBeDefined();
      expect(controller.showList).toEqual(true);
    });
    it('should have heroes:array, searchTerm:string, search:function',function(){
      expect(controller.heroes).toBeDefined();
      expect(controller.heroes).toEqual([]);
      expect(controller.searchTerm).toBeDefined();
      expect(controller.searchTerm).toEqual("");
      expect(controller.search).toBeDefined();
    })
    it('should call the HeroesApiFactory.search', function() {
      controller.searchTerm = "ma"
      controller.search();
      $timeout.flush();
      expect(HeroesApiFactory.search).toHaveBeenCalledWith(controller.searchTerm);
      expect(controller.heroes).toEqual(["mama"]);
    });
  }); // end 'Test showList=TRUE'

});