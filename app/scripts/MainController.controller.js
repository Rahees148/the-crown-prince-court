(function(myApp) {
  myApp.autoSuggestModule.controller('MainController', function (contacts) {
    var _self = this;
    _self.resultArr = [];

    _self.doSearch = function(keyWord) {
      _self.resultArr = contacts.getData(keyWord).filteredArr;
    }
  });
})(myApp || {})