app.controller("ComicSearchCtrl", function($scope, $rootScope, ComicFactory){

  $scope.newComic = { };
  $scope.comicBookArray = [];

  $scope.findComics = ( ) => {
    // $scope.newComic.uid = $rootScope.user.uid;
      console.log("in ctrl $scope.newComic:",$scope.newComic);
    ComicFactory.findAllComics($scope.newComic).then((comicBookArray) => {
      $scope.newComic = { };
    }).catch((error) => {
      console.log("error", error);
    });
  };

console.log("inside ComicSearchCtrl");



});