app.controller("ComicListCtrl", function($rootScope, $scope, $routeParams, ComicFactory) {

  $scope.comics = [];
  let ratingCounter = 0;

  let getComics = () => {
    ComicFactory.getComicList($rootScope.user.uid).then((comicz)=>{
      $scope.comics = comicz;
      console.log("in comiclistctrl: comics", $scope.comics);
    }).catch((error)=> {
      console.log("got an error", error);
    });
  };

  getComics();

  $scope.addToOwned = (comic) => {
    console.log("click working", comic);
    comic.isOwned = true;
  ComicFactory.addWantComicToOwned(comic).then((response) => {
    }).catch((error) => {
      console.log("Add error", error);
    });
  };

  $scope.deleteComic = (comicId) => {
    console.log("delete click working");
    ComicFactory.deleted(comicId).then(() => {
      getComics();
    }).catch((error) => {
      console.log("delete", error);
    });
  };

  $scope.rateComicUp = (comicobj) => {
    comicobj.rating ++;
    ComicFactory.editRating(comicobj).then((results) => {
    }).catch((error) => {
      console.log("edit rate comics", error);
    });
  };

  $scope.rateComicDown = (comicobj) => {
    comicobj.rating --;
    ComicFactory.editRating(comicobj).then((results) => {
    }).catch((error) => {
      console.log("edit rate comics", error);
    });
  };

});