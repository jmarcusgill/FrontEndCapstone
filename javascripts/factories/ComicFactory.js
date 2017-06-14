app.factory("ComicFactory", function($http, $q, FIREBASE_CONFIG, COMICVINE_CONFIG) {

  let getComicList = (userId) => {
    let currentcomicz = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/comicbooks.json?orderBy="uid"&equalTo="${userId}"`)
      .then((fbItems)=> {
        let itemCollection = fbItems.data;
        if (itemCollection !== null) {
          Object.keys(itemCollection).forEach((key) => {
              itemCollection[key].id=key;
              currentcomicz.push(itemCollection[key]);
            });
        }
          resolve(currentcomicz);
      })
      .catch((error) => {
        reject(error);
      });
    });
  };

  //referenced in ComicSearchCtrl.js, getting newComic from api call
  let findAllComics = (userInput) => {
    return $q ((resolve, reject) => {
     $http.get(`http://comicvine.gamespot.com/api/volumes/?api_key=${COMICVINE_CONFIG.apiKey}&format=json&filter=name:${userInput}`, JSON.stringify(userInput))
      .then((APIresultz) => {
        console.log("in factory", APIresultz);
        resolve(APIresultz);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return {findAllComics:findAllComics, getComicList:getComicList};

});