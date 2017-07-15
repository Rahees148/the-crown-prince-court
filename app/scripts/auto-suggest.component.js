(function(myApp) {
  

  var autoSuggestComOpt = {
      templateUrl: 'auto-suggest-tmp.html',
      bindings: {
        onKeyPress: '&',
        resultArr: '<'
      },
      controller: 'autoSuggestComController',
      controllerAs: 'asc' 
  }
  
  myApp.autoSuggestModule.component('autoSuggestCom', autoSuggestComOpt);
    
  function autoSuggestComControllerFun($scope) {
  }
  
  myApp.autoSuggestModule.controller('autoSuggestComController', autoSuggestComControllerFun);
})(myApp || {});