const myApp = angular.module('myApp', []);

myApp.controller('ListCtrl', function($scope, $http){
  $scope.title = "Angular One List";
  $scope.todos = [];

  $scope.updateName = () => {
    if (event.keyCode === 13) {
      //$scope.todos.push({'name': event.target.value});
      $http({
        method:'POST',
        url: 'https://one-list-api.herokuapp.com/items?access_token=harley',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          item: {
            text: event.target.value
          }
        })
      }).then((response) => $scope.todos.push(response.data))
        event.target.value = '';
      }
    };

    $scope.deleteItem = (index, todo) => {
      console.log('DELETE', index, todo);
      $http({
        method: 'DELETE',
        url: `https://one-list-api.herokuapp.com/items/${todo.id}?access_token=harley`,
        headers: { 'Content-Type': 'application/json' }
      }).then(() => $scope.todos.splice(index, 1))
    }


  $http({
  method: 'GET',
  url: 'https://one-list-api.herokuapp.com/items?access_token=harley'
}).then(function successCallback(response) {
    console.log(response);
    response.data.forEach(res => $scope.todos.push(res));
  })
});
