const { HOST } = require('./config');

const productDataQuery = (site, productTitle, length = 1) => {
  return fetch(`${HOST}api/compare/${site}?q=${productTitle}`)
    .then(response => response.json())
    .then(data => data.result);
};

const alertQuery = (site) => {
  return fetch(`${HOST}api/alerts/all`)
    .then(response => response.json())
    .then(data => data.result)
    .catch(err => {});
}

const graphQuery = (site) => {
  return fetch(`${HOST}api/graph/${site}`)
    .then(response => response.json())
    .then(data => data.result)
    .catch(err => {})
}

const get_coupons = () => {
  const [coupons, offers] = [[], []];
  return fetch(`${HOST}api/sale/cuelinks/coupons`)
    .then(res => res.json())
    .then(function ({ result }) {
      result.offers.forEach(offer => {
        if (offer.coupon_code){
          coupons.push(offer);
        }else{
          offers.push(offer);
        }
        //testing only delete this and next line
        offers.push(offer);
      })
      return {coupons, offers};
    })
    .catch(err => {
      console.log(err);
      return {};
    });
}


module.exports = {
  productDataQuery,
  alertQuery,
  graphQuery,
  get_coupons
};
