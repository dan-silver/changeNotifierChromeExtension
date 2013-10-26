function RefreshCtrl($scope) {
  $scope.sections = JSON.parse(localStorage.getItem('sections'))
  $scope.new_section = function() {
  	chrome.runtime.sendMessage({action: "new_section"})
  	window.close()
  }
}