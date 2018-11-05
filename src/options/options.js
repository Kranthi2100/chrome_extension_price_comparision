const { SITES } = require('../common/scripts/misc/config');

const populateSites = () => {  
  let __optionsInnerHTML = '';
  SITES.forEach(site => {
    __optionsInnerHTML += `
    <div class="option teal lighten-4 col m6 s12 z-depth-1">
      <p>${site}</p>
      <div class="switch">
      <label>
        <input type="checkbox" value=${site}>
        <span class="lever teal lighten-3"></span>
      </label>
      </div>
    </div>
    `;
  });
  $options = document.querySelector('.sites + .options')
  $options.innerHTML = __optionsInnerHTML;
}


(() => {

  $(document).ready(function () { //material css collapsible div init
    $('.collapsible').collapsible();
  });
  populateSites();
  chrome.storage.sync.get('sites', function (result) {
    result.sites.forEach(site => {
      (!$(`input[type=checkbox][value=${site}]`).is('checked'))
        && $(`input[type=checkbox][value=${site}]`).prop('checked', true);
    })
  })
  $('input[type=checkbox]').change(function () { 
    let _site = $(this).val();
    if ($(this).is(':checked')) {
      chrome.storage.sync.get(['sites'], function (result) {
        let _sites = result.sites;
        (!_sites.includes(_site)) && _sites.push(_site);
        chrome.storage.sync.set({ 'sites': _sites }, () => { });
      })
    }
    else {
      chrome.storage.sync.get(['sites'], function (result) {
        let _sites = result.sites;
        (_sites.includes(_site)) && _sites.splice(_sites.indexOf(_site), 1);
        chrome.storage.sync.set({ 'sites': _sites }, () => { });
      })
    }
  });

})();
