app.factory("ComicFactory", function($http, $q,  COMICVINE_CONFIG) {

  //referenced in ComicSearchCtrl.js, getting newComic from api call
  let findAllComics = (newComic) => {
    let comicBookArray = [];
    return $q ((resolve, reject) => {
     $http.get(`http://comicvine.gamespot.com/api/volumes/?api_key=${COMICVINE_CONFIG.apiKey}&format=json&filter=name:${newComic}`, JSON.stringify(newComic))
      .then((resultz) => {
        let comicCollection = resultz.data;
        if (comicCollection !== null) {
            Object.keys(comicCollection).forEach((key) => {
            comicCollection[key].id=key;
            comicBookArray.push(comicCollection[key]);
          });
        }
        console.log("in comicFactory", comicBookArray);
        resolve(comicBookArray);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return {findAllComics:findAllComics};

});