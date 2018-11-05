const {turnOn} = require('../../common/scripts/turn_on');

const init = function(){
  siteName = 'tatacliq';
  let quickActionOptions = {};
  let graphOptions = {
    isAvailable: false, 
    site: siteName
  }
  let bannerOptions = {
    $$title: 'h1.product-name',
    $$price: '#spPriceId',
    $$imageUrl: 'img',
    siteName: 'tatacliq',
    length: 1
  };
  let startConfig = {
    quickActionOptions,
    bannerOptions,
    graphOptions
  }
  turnOn(startConfig);

}();
