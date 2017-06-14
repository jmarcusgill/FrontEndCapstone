app.controller("ComicSearchCtrl", function($scope, $rootScope, $location, ComicFactory){

  $scope.comicSearch = "";
  $scope.comicAPIresults = [];
  $scope.newComic = {
    rating: 0,
    isOwned: false
  };

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

  $scope.isOwned = (comic) => {
    console.log("click working");
  $scope.newComic.isOwned = true;
  $scope.newComic.description = comic.description;
  $scope.newComic.image = comic.image.medium_url;
  $scope.newComic.start_year = comic.start_year;
  $scope.newComic.publisher = comic.publisher.name;
  $scope.newComic.title = comic.name;
  $scope.newComic.uid = $rootScope.user.uid;
  ComicFactory.postNewComic($scope.newComic).then((response) => {
    $scope.newComic = { };
    $location.url("/comic/list");
    }).catch((error) => {
      console.log("Add error", error);
    });
  };

  $scope.notOwned = (comic) => {
    console.log("click working");
  $scope.newComic.isOwned = false;
  $scope.newComic.description = comic.description;
  $scope.newComic.image = comic.image.medium_url;
  $scope.newComic.start_year = comic.start_year;
  $scope.newComic.publisher = comic.publisher.name;
  $scope.newComic.title = comic.name;
  $scope.newComic.uid = $rootScope.user.uid;
  ComicFactory.postNewComic($scope.newComic).then((response) => {
    $scope.newComic = { };
    $location.url("/comic/list");
    }).catch((error) => {
      console.log("Add error", error);
    });
  };





});