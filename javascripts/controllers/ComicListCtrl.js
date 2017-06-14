app.controller("ComicListCtrl", function($rootScope, $scope, ComicFactory) {

  $scope.comics = [];

  let getComics = () => {
    ComicFactory.getComicList($rootScope.user.uid).then((comicz)=>{
      $scope.comics = comicz;
      console.log("in comiclistctrl: comics", $scope.comics);
    }).catch((error)=> {
      console.log("got an error", error);
    });
  };

  getComics();


});