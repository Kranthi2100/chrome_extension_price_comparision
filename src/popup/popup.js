const coupons_init = require('./common/scripts/coupons');
const Alerts = require('./common/scripts/alerts');
require('./common/scripts/alerts');
const {
  HOST,
  RUPEE_SYMBOL,
  SITES
} = require('../common/scripts/misc/config');

let [col_count, size] = [0, 2];
let __item_count = 0;

const getColId = () => {
  col_count = (col_count === size) ? 0 : col_count;
  return `col-${col_count++}`;
}  

var __key;
const createQuery = (site, productTitle, length = 1, showResults) => {
  fetch(`${HOST}api/compare/${site}?q=${productTitle}&l=${length}`)
    .then(response => response.json())
    .then(data => {
      if (data.result.length !== 0 && __key === productTitle)  data.result.forEach(showResults)
    })
    .catch(console.log);
}

const displayProductData = (productTitle, length = 1) => {
  SITES.forEach(site => {
    
    const showResults = (data) => {
      const $search_tab = document.getElementById('search_tab');
      const col_id = getColId();
      const getCol = () => {
        if (document.getElementsByClassName(col_id).length)
          return document.getElementsByClassName(col_id)[0];
        let $col = document.createElement('div');
        $col.setAttribute('class', `${col_id} ${site}`);
        $search_tab.appendChild($col);
        return $col;
      }
      const $col = getCol();
      
      const $item = document.createElement('div');
      $item.setAttribute('class', 'item');
      $item.innerHTML = `
        <p>${site}</p>
        <img src=${data.imageUrl} />
        <p>${data.name}</p>
        <p>${RUPEE_SYMBOL} ${data.minPrice}</p>
        <a href=${data.productUrl}> click here </a>
      `;
      $col.appendChild($item);
      $item.addEventListener('click', function(){
          chrome.tabs.create({
            url: data.productUrl
          })
      });
      __item_count+=1;
    };

    createQuery(site, productTitle, length, showResults);
  })
}

const search = (key, length = 1) => {
  console.log('popup::search')
  const $search_tab = document.getElementById('search_tab');
  $search_tab.innerHTML = '';
  __key = key;
  displayProductData(key, length);
}

const init_tabs = () => {
  $(document).ready(function(){
    $('.tabs').tabs();
  });
}

const init_search = () => {
  const $search_tag = document.getElementById('search');
  const $search_button = document.getElementById('search-button');
  const SEARCH_LENGTH = 6;
  $search_button.addEventListener('click', () => {
    key = $search_tag.value;
    search(key, SEARCH_LENGTH);
  })
  $search_tag.addEventListener('keyup', e => (e.keyCode === 13) && search(e.target.value, SEARCH_LENGTH));
}

const init_alerts = () => {
  Alerts.init();
}

(() => {
  init_tabs();
  coupons_init()
  init_search();
  init_alerts();
})();
