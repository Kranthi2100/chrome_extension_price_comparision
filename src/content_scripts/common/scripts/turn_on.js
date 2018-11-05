const {
  storage_sync_get,
} = require('../../../common/scripts/misc/browserAPI');
const {
  getProductTitle,
  getPrice,
  getImage__Src,
  isProductPage
} = require('./parse');
const Banner = require('./banner');
const SideBar = require('./side_bar');
const Graph = require('./graph');

const showGraph = (options) => {
  Graph.create(options);
}

const showSideBar = (options) => {
  SideBar.create();
}

const showTopBanner = function({$$title, $$price, $$imageUrl, siteName, length}){
  //replace setTimeout 
  setTimeout(function(){

    //banner init code
    title = getProductTitle($$title);
    price = getPrice($$price);
    imageUrl = getImage__Src($$imageUrl);

    if(siteName === "amazon"){
      price /= 100;
    }
    Banner.create({
      'name' : title,
      'minPrice': price,
      'imageUrl': imageUrl,
      'site': siteName,
      'productUrl': ''
    });
    storage_sync_get('sites').then(sites => {
      Banner.init(sites, { title, price }, length);
    })
    //end banner init code 

  }, 1000);
  
}

let _options = {};
//banner resets when page url is changed
//this function is needed in order to do that
const turnOnCached = function(){ 
  if (!isProductPage(_options.bannerOptions.$$title)) return;
  showSideBar(_options.quickActionOptions);
  showTopBanner(_options.bannerOptions);
  if (_options.graphOptions.isAvailable)  
    showGraph(_options.graphOptions);
}

const turnOn = function(options = {}){
  _options = options; 
  turnOnCached();
}

// listens for url changes 
// if(chrome){
  chrome.runtime.onMessage.addListener(
    function(message, sender, response){
      if(message.msg === "URL-CHANGED"){
        Banner.remove();
        setTimeout(turnOnCached, 2000);
      }
      response({"res": "message_received"});
    }
  )
// }else if(browser){
  // browser.runtime.onMessage.addListener(request => {
  //   if(request.msg === "URL-CHANGED"){
  //     Banner.remove();
  //     setTimeout(turnOnCached, 2000);
  //   }
  //   return new Promise.resolve({"res": "message_received"})
  // })
// }

module.exports = {turnOn};
