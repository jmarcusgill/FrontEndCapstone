app.controller("ComicSearchCtrl", function($scope, $rootScope, ComicFactory){

  $scope.comicSearch = "";
  $scope.comicAPIresults = [];

  $scope.findComics = ( ) => {
    // $scope.newComic.uid = $rootScope.user.uid;
      console.log("in ctrl $scope.comicSearch:",$scope.comicSearch);
    ComicFactory.findAllComics($scope.comicSearch).then((comicAPIresults) => {
      $scope.comicAPIresults = comicAPIresults.data.results;
      console.log("comicAPIresults:", $scope.comicAPIresults);
    }).catch((error) => {
      console.log("error", error);
    });
  };

console.log("inside ComicSearchCtrl");



});