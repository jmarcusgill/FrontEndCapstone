app.controller("ComicSearchCtrl", function($scope, $rootScope, ngToast, ComicFactory){

  $scope.comicSearch = "";
  $scope.comicAPIresults = [];
  $scope.newComic = {
    rating: 0,
    isOwned: false
  };

  $scope.findComics = ( ) => {
    ComicFactory.findAllComics($scope.comicSearch).then((comicAPIresults) => {
      $scope.comicAPIresults = comicAPIresults.data.results;
    }).catch((error) => {
      console.log("error", error);
    });
  };

  $scope.isOwned = (comic) => {
  $scope.newComic.isOwned = true;
  $scope.newComic.description = comic.description;
  $scope.newComic.image = comic.image.medium_url;
  $scope.newComic.start_year = comic.start_year;
  $scope.newComic.publisher = comic.publisher.name;
  $scope.newComic.title = comic.name;
  $scope.newComic.uid = $rootScope.user.uid;
  ComicFactory.postNewComic($scope.newComic).then((response) => {
    $scope.newComic = { };
    ngToast.create('Comic Saved to Owned!');
    }).catch((error) => {
      console.log("Add error", error);
    });
  };

  $scope.notOwned = (comic) => {
  $scope.newComic.isOwned = false;
  $scope.newComic.description = comic.description;
  $scope.newComic.image = comic.image.medium_url;
  $scope.newComic.start_year = comic.start_year;
  $scope.newComic.publisher = comic.publisher.name;
  $scope.newComic.title = comic.name;
  $scope.newComic.uid = $rootScope.user.uid;
  ComicFactory.postNewComic($scope.newComic).then((response) => {
    $scope.newComic = { };
    ngToast.create('Saved to Wishlist!');
    }).catch((error) => {
      console.log("Add error", error);
    });
  };





});