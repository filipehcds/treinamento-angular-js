describe('Hero Class', function() {
  var Hero;

  beforeEach(angular.mock.module('tourOfHeroesApp'));
  
  beforeEach(inject(function(_Hero_) {
    Hero = _Hero_;
  }));

  
  it('should exist', function() {
    expect(Hero).toBeDefined();
  });

  describe('new Hero()', function() {
    var joc = jasmine.objectContaining;
    // A simple test to verify the method all exists
    it('should return a empty hero',function(){     
      var hero = new Hero();
      expect(hero).toEqual(joc({
        id: null,
        name: '',
        location: ''
      }));
    });
    it('should return a mock hero',function(){   
      var mockHero = {"id": 11, "name": "Mr. Nice", "location": "NYC", "email": "test@test.com"};  
      var hero = new Hero(mockHero);
      var expectedHero = {"id": 11, "name": "Mr. Nice", "location": "NYC"};
      expect(hero).toEqual(joc(expectedHero));
      expect(hero.email).not.toBeDefined();
    });

  }); // end 'new Hero()'

});