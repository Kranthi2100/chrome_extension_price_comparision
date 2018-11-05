const {turnOn} = require('../../common/scripts/turn_on');

const init = function(){
  siteName = 'amazon';
  let quickActionOptions = {};
  let graphOptions = {
    isAvailable: false, 
    site: siteName
  }
  let bannerOptions = {
    $$title: '#productTitle',
    $$price: '.a-size-medium.a-color-price',
    $$imageUrl: '#imgTagWrapperId img',
    siteName,
    length: 1
  };
  let startConfig = {
    quickActionOptions,
    bannerOptions,
    graphOptions
  }
  turnOn(startConfig);

}();


