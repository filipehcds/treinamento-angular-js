
describe('HeroesApiFactory', function() {
  var HeroesApiFactory, Hero;
  var $q, $scope,$httpBackend;
  var originalTimeout;
  beforeEach(angular.mock.module('tourOfHeroesApp'));
  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_HeroesApiFactory_,_Hero_,_$rootScope_,_$httpBackend_) {
    HeroesApiFactory = _HeroesApiFactory_;
    Hero = _Hero_;
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    initMockHeroesResource(window.HeroesData,$httpBackend);
  }));

  afterEach(function() {
     //$httpBackend.verifyNoOutstandingExpectation();
     //$httpBackend.verifyNoOutstandingRequest();
   });

  // A simple test to verify the Users factory exists
  it('should exist', function() {
    expect(HeroesApiFactory).toBeDefined();
  });

  // Test to see if HeroesApiFactory has the function and it returns a promise
  function testExistPromise(func){
    it('should exist',function(){
        expect(HeroesApiFactory[func]).toBeDefined();
    });
    it('should return a promise',function(){ 
      var promise = HeroesApiFactory[func]();
      expect(promise && promise.then).toBeDefined();
    });
  }

  describe('getHeroes()',function(){
    testExistPromise("getHeroes");
    it('should return array of Heroes',function(done){
      HeroesApiFactory.getHeroes().then(function(response){
          expect(response).toEqual(jasmine.any(Array));
          expect(response.length).toEqual(10);
          expect(response[0]).toEqual(jasmine.any(Hero));
          done();
      });
      $httpBackend.flush();
      //$scope.$digest();
    })

  }); // getHeroes
  
  describe('create()', function() {
    var mockHero = {"name": "Mr. Nice"};
    testExistPromise("create");

    it('should create a Hero',function(done){
        HeroesApiFactory.create(mockHero)
        .then(function(hero){
            expect(hero).toEqual(jasmine.any(Hero));
            expect(hero.id).not.toEqual(null);
            expect(hero.name).toEqual("Mr. Nice");
            expect(hero.location).toEqual("");
            done();
        },
        function(error){
          done();
        });
        $httpBackend.flush();
        //$scope.$digest();
    }); // 'should create a Hero'
  }); // end create()

  describe('update()',function(){
    var mockHero = {"id": 11, "name": "Mr. Nice 2", "location": "NYC"};
    testExistPromise("update");
    it('should update a Hero',function(done){        
        HeroesApiFactory.update(mockHero)
        .then(function(hero){
            expect(hero).toEqual(jasmine.any(Hero));
            expect(hero.id).toEqual(mockHero.id);
            expect(hero.name).toEqual(mockHero.name);
            expect(hero.location).toEqual(mockHero.location);
            done();
        });
        $httpBackend.flush();
        //$scope.$digest();
    }); 

  }) // update()
  
  describe('getHero()',function(){
    var heroId = 11;
    testExistPromise("getHero");
    it('should get a Hero with id: '+heroId,function(done){        
        
        HeroesApiFactory.getHero(heroId)
        .then(function(hero){
            expect(hero).toEqual(jasmine.any(Hero));
            expect(hero.id).toEqual(heroId);
            done();
        });
        
        $httpBackend.flush();
        //$scope.$digest();
    }); 

  }) // getHero()

  describe('search()',function(){
    var term= 'ma';
    testExistPromise("search");
    it('should get a Array of Heroes with term: '+term, function(done){        
        
        HeroesApiFactory.search(term)
        .then(function(heroes){
            expect(heroes).toEqual(jasmine.any(Array));
            expect(heroes.length).toEqual(4);
            expect(heroes[0]).toEqual(jasmine.any(Hero));
            done();
        });
          
        $httpBackend.flush();
        //$scope.$digest();
    }); 

  }) // search()
  

});

