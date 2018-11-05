CouponComponent = {}

CouponComponent.coupon = (coupon) => {
  return (`
      <div class="detail">
        <div class="campaign">
          <p> ${coupon.campaign}</p>
        </div>
        <div class="description">
          <p>${coupon.description}</p>
        </div>
      </div>
      <div class="action">
        <button> get deal </button>
        <button class="copy"> 
        <div class="page-fold"></div>
        copy coupon </button>
      </div>
  `);
}

CouponComponent.deal = (deal) => {
  return (`
    <div class="detail">
      <div class="campaign">
        <p> ${deal.campaign}</p>
      </div>
      <div class="description">
        <p>${deal.description}</p>
      </div>
    </div>
  `);
}

module.exports = CouponComponent;
