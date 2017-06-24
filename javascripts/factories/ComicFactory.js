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
     $http.get(`https://comic-get-it-proxy.herokuapp.com/api/comicFinder/volumes/?api_key=${COMICVINE_CONFIG.apiKey}&format=json&filter=name:${userInput}`, JSON.stringify(userInput))
      .then((APIresultz) => {
        console.log("in comicfactory", APIresultz);
        resolve(APIresultz);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let postNewComic = (newComic) => {
    console.log("factory", newComic);
    return $q ((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/comicbooks.json`,
        JSON.stringify(newComic)
        ).then((resultz) => {
        resolve(resultz);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let deleted = (id) => {
    console.log("in factory", id);
    return $q((resolve, reject) => {
      $http.delete(`${FIREBASE_CONFIG.databaseURL}/comicbooks/${id}.json`)
      .then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let editRating = (comic) => {
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/comicbooks/${comic.id}.json`,
        JSON.stringify({
          publisher: comic.publisher,
          title: comic.title,
          start_year: comic.start_year,
          image: comic.image,
          isOwned: comic.isOwned,
          rating: comic.rating,
          uid: comic.uid
        }))
      .then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let addWantComicToOwned = (comic) => {
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/comicbooks/${comic.id}.json`,
        JSON.stringify({
          publisher: comic.publisher,
          title: comic.title,
          start_year: comic.start_year,
          image: comic.image,
          isOwned: comic.isOwned,
          rating: comic.rating,
          uid: comic.uid
        }))
      .then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let addComicToWishList = (comic) => {
    console.log("inside comicFactory addtowish", comic);
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/comicbooks/${comic.id}.json`,
        JSON.stringify({
          publisher: comic.publisher,
          title: comic.title,
          start_year: comic.start_year,
          image: comic.image,
          isOwned: comic.isOwned,
          rating: comic.rating,
          uid: comic.uid
        }))
      .then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return {findAllComics:findAllComics, getComicList:getComicList, postNewComic:postNewComic, deleted:deleted, editRating:editRating, addWantComicToOwned:addWantComicToOwned, addComicToWishList:addComicToWishList};

});