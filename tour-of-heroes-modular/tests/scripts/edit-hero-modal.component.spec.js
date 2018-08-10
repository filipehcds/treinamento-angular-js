describe('component: editHeroModal', function() {
  var controller, Hero;
  var saveSpy = jasmine.createSpy('save');
  var mockHero;

  beforeEach(angular.mock.module('tourOfHeroesApp'));
  beforeEach(inject(function(_Hero_, _$componentController_) {
    var $componentController = _$componentController_;
    Hero = _Hero_;
    mockHero = new Hero({ id: 10, name: 'Mr. Cool'});
    var bindings = {save: saveSpy, edit: true, hero: mockHero};
    controller = $componentController('editHeroModal',null,bindings);
  }));

  it('Controller should exist', function() {
    expect(controller).toBeDefined();
  });

  it('should expose a `onSave` function', function() {
    expect(controller.onSave).toBeDefined();
  });

  it('should expose `hero` Hero Object',function(){
    expect(controller.hero).toBeDefined();
    expect(controller.hero).toEqual(mockHero);
  })
  it('should call the `save` binding, when saving a hero', function() {
    var saveHero = angular.copy(controller.hero);
    saveHero.name = 'Mr. Really Cool';
    controller.onSave(saveHero);
    expect(saveSpy).toHaveBeenCalledWith({
      hero: saveHero
    });
    expect(controller.edit).toEqual(false);
  });

});