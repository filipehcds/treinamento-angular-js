describe('component: appComponent', function() {
  var controller;
  var $scope;
  beforeEach(angular.mock.module('tourOfHeroesApp'));
  beforeEach(inject(function(_$rootScope_, _$componentController_) {
    var $componentController = _$componentController_;
    $scope = _$rootScope_.$new();
    controller = $componentController('appComponent',{$scope: $scope});
  }));

  it('Controller should exist', function() {
    expect(controller).toBeDefined();
  });

  it('should expose `title`', function() {
    expect($scope.title).toBeDefined();
    expect($scope.title.length).not.toEqual(0);
  });

  it('should expose `isNavCollapsed` to be true',function(){
    expect($scope.isNavCollapsed).toBeDefined();
    expect($scope.isNavCollapsed).toEqual(true);
  });
});