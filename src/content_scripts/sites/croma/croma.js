const {turnOn} = require('../../common/scripts/turn_on');

const init = function(){
  siteName = 'croma';
  let quickActionOptions = {};
  let graphOptions = {
    isAvailable: false, 
    site: siteName
  }
  let bannerOptions = {
    $$title: '.productDescriptionCss h1',
    $$price: '.cta h2',
    $$imageUrl: '.productImagePrimaryLink img',
    siteName: 'croma',
    length: 1
  };
  let startConfig = {
    quickActionOptions,
    bannerOptions,
    graphOptions
  }
  turnOn(startConfig);

}();
