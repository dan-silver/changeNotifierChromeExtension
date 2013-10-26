function RefreshCtrl($scope) {
  $scope.sections = JSON.parse(localStorage.getItem('sections'))
  $scope.newSection = function() {
  	chrome.runtime.sendMessage({action: "newSection"})
  	window.close()
  }
  $scope.removeSection = function(i) {
    $scope.sections.splice(i)
    localStorage.setItem('sections', JSON.stringify($scope.sections))
  }
}