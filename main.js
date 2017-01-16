const myApp = angular.module('myApp', []);

myApp.controller('ListCtrl', function($scope, $http){
  $scope.title = "Angular One List";
  $scope.todos = [];
  $scope.complete = false;

  $scope.updateName = () => {
    if (event.keyCode === 13) {
      $http({
        method:'POST',
        url: 'https://one-list-api.herokuapp.com/items?access_token=harley',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          item: {
            text: event.target.value
          }
        })
      })
      .then((response) => $scope.todos.push(response.data))
      event.target.value = '';
      }
    };

    $scope.deleteItem = (index, todo) => {
      $http({
        method: 'DELETE',
        url: `https://one-list-api.herokuapp.com/items/${todo.id}?access_token=harley`,
        headers: { 'Content-Type': 'application/json' }
      })
      .then(() => $scope.todos.splice(index, 1))
    }

    $scope.completeTodo = () => {
      if ($scope.complete) {
        $scope.complete = false;
        event.target.style.textDecoration = 'none';
        event.target.style.opacity = 1;
      } else {
        $scope.complete = true;
        event.target.style.textDecoration = 'line-through';
        event.target.style.opacity = 0.5;
      }
    }


  $http({
    method: 'GET',
    url: 'https://one-list-api.herokuapp.com/items?access_token=harley'
  })
  .then((response) => response.data.forEach(res => $scope.todos.push(res)))
});
