
const {
  ACCEPTED_DELTA,
  ACCEPTED_DELTA_GRACE,
  HOST
} = require('../../../common/scripts/misc/config');
const BannerComponent = require('../../../common/scripts/components/banner');
const {productDataQuery} = require('../../../common/scripts/misc/query');

let isBannerEnabled = false;
let MoreOptionProductCache = [];

Banner = {}
Banner.create = (product) => {
  let $banner;
  if (document.getElementById('cp-comparision-banner')) {
    $banner = document.getElementById('cp-comparision-banner');
  }
  else {
    $banner = document.createElement('div');
    $banner.setAttribute('id', 'cp-comparision-banner');
    document.getElementsByTagName('html')[0].insertBefore($banner, document.body);
  }
  $banner.innerHTML = BannerComponent.init(product);
  $closeBanner = document.getElementsByClassName('cp-close-banner')[0];
  $closeBanner.addEventListener('click', function () {
    // const $header = document.getElementById('header')
    document.getElementById('cp-comparision-banner').style.display = 'none';
  })
  isBannerEnabled = true;

  ['cp-best-option', 'cp-more-option'].forEach(Banner.OptionModal__CreateToggle);
  Banner.OptionModal__AddProduct('cp-best-option', product);
}

Banner.OptionModal__CreateToggle = (modalName) => {
  $modalToggle = document.getElementsByClassName(`${modalName}-toggle`)[0];
  const $option = document.getElementById(`${modalName}-menu`);

  $modalToggle.addEventListener('mouseenter', () => {
    $option.style.display = 'block';
  });

  $modalToggle.addEventListener('mouseleave', () => {
    $option.style.display = 'none';
  });
}

Banner.OptionModal__AddProduct = (ModalName, product, moreThenOneItem = false) => {
  if (ModalName === 'cp-more-option') {
    MoreOptionProductCache.push(product);
  }
  if (!isBannerEnabled) return;
  $option = document.getElementsByClassName(ModalName)[0];

  if (moreThenOneItem) {
    $option.innerHTML = '';
    MoreOptionProductCache.sort((a, b) => a.minPrice > b.minPrice);
    MoreOptionProductCache.forEach(product => {
      $option.innerHTML += BannerComponent.optionModal(product);
    })
  }
  else
    $option.innerHTML = BannerComponent.optionModal(product);
}

Banner.init = (sites, current_site, length = 1) => {
  let best_price = current_site.price;
  sites.forEach(async (site) => {
    const data = await productDataQuery(site, current_site.title, length);
    if (data.length === 0)
    return;
    firstItem = data[0]; 
    if (site !== current_site && best_price >= firstItem.minPrice && firstItem.delta > ACCEPTED_DELTA) {
      best_price = firstItem.minPrice;
      Banner.create({
        ...firstItem,
        site
      });
    }
    data.forEach(product => { //add item to more option modal
      if (product.delta > ACCEPTED_DELTA_GRACE) {
        Banner.OptionModal__AddProduct('cp-more-option', { ...product, site }, true)
      }
    })
  });
}

Banner.remove = function(){
  let $banner = document.getElementById('cp-comparision-banner');
  let $html = document.getElementsByTagName('html')[0];
  if($html && $banner)
    $html.removeChild($banner);
  isBannerEnabled = false;
  MoreOptionProductCache = [];
} 

module.exports = Banner;
