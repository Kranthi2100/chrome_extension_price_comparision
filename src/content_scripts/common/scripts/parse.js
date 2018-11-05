const getProductTitle = (selector) => {
  const $productTitle = document.querySelectorAll(selector)[0];
  productTitle = $productTitle.textContent.trim();
  return productTitle;
}

const getPrice = (selector) => {
  const $productPrice = document.querySelectorAll(selector)[0];
  if (!$productPrice) {
    return Infinity;
  }
  raw_price = $productPrice.textContent.trim();
  price = raw_price.replace(new RegExp('[ ₹,.]+', 'g'), '');
  return (!isNaN(price)) ? parseInt(price) : 0;
}


const getImage__Src = (selector) => {
  const $imageUrl = document.querySelectorAll(selector)[0];
  return $imageUrl.getAttribute('src');
}

const isProductPage = (selector) => !!document.querySelectorAll(selector)[0];

module.exports = {
  getProductTitle,
  getPrice,
  getImage__Src,
  isProductPage
}

