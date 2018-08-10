describe('component: heroAdd', function() {
  var controller, Hero;
  var onSaveSpy = jasmine.createSpy('onSave');
  var bindings = {onSave: onSaveSpy};
  var newHero;
  beforeEach(angular.mock.module('tourOfHeroesApp'));
  beforeEach(inject(function(_Hero_, _$componentController_) {
    var $componentController = _$componentController_;
    Hero = _Hero_;
    controller = $componentController('heroAdd',null,bindings);
    newHero = new Hero({ name: 'Mr. Cool'});
  }));

  it('Controller should exist', function() {
    expect(controller).toBeDefined();
  });

  it('should expose a `onSave` function', function() {
    expect(controller.onSave).toBeDefined();
  });

  it('should expose `newHero` Hero Object',function(){
    expect(controller.newHero).toBeDefined();
    expect(controller.newHero).toEqual(jasmine.any(Hero));
  })
  it('should call the `onSave` binding, when creating a new hero', function() {
    controller.newHero.name=newHero.name;
    controller.save();
    expect(onSaveSpy).toHaveBeenCalledWith({
      value: newHero
    });
    expect(controller.newHero).toEqual(new Hero());
  });

});