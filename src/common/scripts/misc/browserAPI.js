const storage_sync_get = function(key){
  if(chrome){
    return new Promise(function(resolve, reject){
      chrome.storage.sync.get([key], function(result){
        resolve(result.sites);
      });
    });
  }else if(browser){
  //   return new Promise(function(resolve, reject){
  //     browser.storage.sync.get([key])
  //       .then( function(result){
  //         resolve(result.sites)
  //       }, function(error){
  //         console.log(error);
  //         reject(error);
  //       })
  //   })
  // }
  }
}

module.exports = {
  storage_sync_get,
}
