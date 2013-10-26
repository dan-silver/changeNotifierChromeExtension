function RefreshCtrl($scope) {
  $scope.sections = JSON.parse(localStorage.getItem('sections'))
}