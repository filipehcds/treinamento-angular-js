(function(angular){
"use strict";
	function editHeroModalController($scope,$uibModal,$document){
		var ctrl = this;
		
		ctrl.onSave = function(hero){
			ctrl.save({hero: hero});
			ctrl.edit = false;
		}

		var open = function(){
			var parentElem = angular.element($document[0].querySelector('.modal-container')) ;
			var modalInstance = $uibModal.open({
			      animation: ctrl.animationsEnabled,
			      ariaLabelledBy: 'modal-title',
			      ariaDescribedBy: 'modal-body',
			      templateUrl: 'edit-modal-content.html',
			      controller: ['$uibModalInstance','hero',ModalInstanceCtrl],
			      controllerAs: '$ctrl',
			      appendTo: parentElem,
			      resolve: {
			        hero: function() {
			          return angular.copy(ctrl.hero);
			        }
			      }
			    });

		    modalInstance.result.then(function(newHero) {
		      ctrl.onSave(newHero);
		    }, function() {
		    	ctrl.edit = false;
		      console.warn('Modal dismissed at: ' + new Date());
		    });
		}

		$scope.$watch('$ctrl.edit',function(newValue,oldValue,scope){
			if(newValue===true){
				open();
			}
		})
	}

	function ModalInstanceCtrl($uibModalInstance, hero) {
	  var $ctrl = this;
	  $ctrl.hero = hero;
	  
	  $ctrl.save = function() {
	    $uibModalInstance.close($ctrl.hero);
	  };

	  $ctrl.cancel = function() {
	    $uibModalInstance.dismiss('cancel');
	  };

	}

	angular.module('tourOfHeroesApp')
	.component('editHeroModal',{
		templateUrl: 'templates/edit-hero-modal.html',
		controller: ['$scope','$uibModal','$document',editHeroModalController],
		bindings: {
			edit: '=',
			hero: '<',
			save: '&'
		}
	});

	//angular.module('tourOfHeroesApp').controller('ModalInstanceCtrl',['$uibModalInstance','hero', ]);

})(window.angular);