const { HOST } = require('../../../common/scripts/misc/config');
const CouponComponent = require('../../../common/scripts/components/coupon');

Bake = {}

Bake.getParentNode = id => document.getElementById(id);

Bake.createNewDataNode = (parentId, className) => {
  $offers = Bake.getParentNode(parentId);
  $offer = document.createElement('div');
  $offer.setAttribute('class', `card ${className}`);
  $offers.appendChild($offer);
  return $offer;
}

Bake.addNewCoupon = (coupon) => {
  $coupon = Bake.createNewDataNode('option4', 'coupon');
  $coupon.innerHTML = CouponComponent.coupon(coupon);
  $btn = $coupon.getElementsByTagName('button')[0];
  $btn.addEventListener('click', function(){
    chrome.tabs.create({
      url: coupon.url
    });
  })
  Bake.createCopyFunction($coupon, coupon.coupon_code);
}

Bake.addNewDeal = (deal) => {
  $deal = Bake.createNewDataNode('option3', 'offer');
  $deal.innerHTML = CouponComponent.deal(deal);
  $deal.addEventListener('click', function(){
    chrome.tabs.create({
      url: deal.url
    })
  })
}

Bake.createCopyFunction = ($elem, code) => {
  $elem = $($elem).find(".copy")[0];
  $text = document.createElement('textarea');
  $text.value = code;
  $elem.addEventListener('click', function () {
    $elem.appendChild($text);
    $text.select();
    document.execCommand('copy');
    $elem.removeChild($text);
    $elem.innerHTML = "copied"
    $($elem).removeClass('copied').addClass('copied');
  })

}

const get_coupons = () => {
  fetch(`${HOST}api/sale/cuelinks/coupons`)
    .then(res => res.json())
    .then(function ({ result }) {
      result.offers.forEach(offer => {
        if (offer.coupon_code)
          Bake.addNewCoupon(offer);
        else{
          Bake.addNewDeal(offer);
        }
        // testing code only
        Bake.addNewDeal(offer);
      })
    })
    .catch(err => {
      console.log(err);
    });
}

const coupons_init = () => {
  get_coupons();
}

module.exports = coupons_init;
