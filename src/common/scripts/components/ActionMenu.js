let ActionMenuComponent = {}

ActionMenuComponent.coupons = (coupon) => (`
  <div class='coupon' id=${coupon.coupon_code}> 
    <div class="header">
      <div class='code'> ${coupon.coupon_code}</div>
    </div>
    <div class='detail'>
      <div class='title'>${coupon.title}</div>
    </div>
  </div>
`);

ActionMenuComponent.offers = (offer) => (`
  <div class="deal"> 
    <div class='header'>
      DEAL
    </div>
    <div class='detail'>
      <div class='offer'>${offer.title}</div>
    </div>
  </div>
`);

module.exports = ActionMenuComponent;