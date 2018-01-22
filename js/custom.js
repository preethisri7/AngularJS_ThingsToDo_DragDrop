var app = angular.module('app', ['ui.sortable', 'Myanimate']);

angular.module('Myanimate', [])
	.factory('animate', function() {
	
	var time = 3000;
	var timeout = null;
	
	return {
		_hideAnimate: function(item) {		
			timeout = timeout || setTimeout(function() {
				this.removeBackground(item);
				
				timeout = null;
			}.bind(this), time);	
		}
	}
});

app.controller('appController', function ($scope, animate) {
  
  $scope.list1 = ['Task4', 'Project3', 'Project2'];
  $scope.list2 = ['Project1', 'Task2', 'Task3'];
  $scope.list3 = ['Task1'];
  $scope.elemMoved = null;
  
  $scope.editorEnabled = false;
  var ind,list;
  $scope.enableEditor = function(app) {

  	if($scope.list1.indexOf(app) !== -1)
      {
      ind = $scope.list1.indexOf(app);
      $scope.editorEnabled = true;
      $scope.editableTitle = app;
      list = $scope.list1;
 	  }
 	  if($scope.list2.indexOf(app) !== -1)
      {
      ind = $scope.list2.indexOf(app);
      $scope.editorEnabled = true;
      $scope.editableTitle = app;
      list = $scope.list2;
 	  }
 	  if($scope.list3.indexOf(app) !== -1)
      {
   	  ind = $scope.list3.indexOf(app);
      $scope.editorEnabled = true;
      $scope.editableTitle = app;
      list = $scope.list3;
 	  }
    
  };
  
  $scope.disableEditor = function() {
    $scope.editorEnabled = false;
  };
  
  $scope.save = function() {

    list[ind] = $scope.editableTitle;
    $scope.disableEditor();
  };
  
  $scope.addList = function() {
       var name = $scope.name;
		$scope.list1.push(name);
    };

    $scope.deleteItem = function(name){

      if($scope.list1.indexOf(name) !== -1)
      {
      var index = $scope.list1.indexOf(name);
      $scope.list1.splice(index, 1);
 	  }
 	  if($scope.list2.indexOf(name) !== -1)
      {
      var index = $scope.list2.indexOf(name);
      $scope.list2.splice(index, 1);
 	  }
 	  if($scope.list3.indexOf(name) !== -1)
      {
      var index = $scope.list3.indexOf(name);
      $scope.list3.splice(index, 1);
 	  }

    };

     
 

  $scope.sortableOptions = {
	over : function(e,ui) {
	var $targetElem = $(e.target);
	  
	  if($targetElem.hasClass('second')) {
		animate.setBorder(ui.item);
	  } else if($targetElem.hasClass('third')) {	
		animate.setBackground(ui.item);
	  } else {
		animate.removeBackground(ui.item);  
	  }
	},
  
    update: function(e, ui) {
	
	var moveItem =  $scope.elemMoved = ui.item.sortable.moved;
	var ngModel = $(ui.item.sortable.droptarget).attr('ng-model');
	 
	if(typeof moveItem === 'undefined') {
		return;
	}
	
	 if($(ui.item.sortable.droptarget).hasClass('third')) {	  
	  if($.inArray(moveItem, $scope.list1) === -1) {
		 
	  } 
	}
	
    },
    stop: function(e, ui) {
		ui.item.removeClass('red-border red-border-background');	  
    },
	connectWith: ".apps-container"
  };
  
});

