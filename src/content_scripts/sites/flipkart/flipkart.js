const {turnOn} = require('../../common/scripts/turn_on');

const init = function(){
  siteName = 'flipkart';
  let quickActionOptions = {};
  let graphOptions = {
    isAvailable: true, 
    site: siteName,
    selector: '._3e7xtJ div'
  }
  let bannerOptions = {
    $$title: '._35KyD6',
    $$price: '._1vC4OE._3qQ9m1',
    $$imageUrl: '._1Nyybr',
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
