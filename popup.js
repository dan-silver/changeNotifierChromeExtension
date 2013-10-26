function RefreshCtrl($scope) {
  $scope.sections = JSON.parse(localStorage.getItem('sections'))
  $scope.new_section = function() {
  	chrome.runtime.sendMessage({action: "new_section"})
  	window.close()
  }
  $scope.removeSection = function(i) {
    $scope.sections.splice(i,1)
    localStorage.setItem('sections', JSON.stringify($scope.sections))
  }
}