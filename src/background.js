const SITES = [
  'myntra',
  'flipkart',
  'shopclues',
  'paytm',
  'jabong',
  'tatacliq',
  'croma',
  'infibeam',
  'ajio',
  'pepperfry',
  'abof',
  'amazon'
];


/**
 * set storage
 * update sites on which price comparision should work
 * @param details 
 */
const chromeOnInstalled = function(details){
    chrome.storage.sync.set({sites: [
      'flipkart',
      'amazon',
      // 'croma',
      // 'tatacliq',
      // 'shopclues'
    ]}, () => {
    })
  }
  
/**
 * function called every time url changes
 * and then sends a messages
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if(changeInfo.url){
      SITES.forEach(site => {
        _site = `https://www.${site}.com`;
        if(changeInfo.url.indexOf(site) >= 0){
          /** check if url changes belongs to price comparision web-sites 
           *  and send URL-CHANGED message
           */
          chrome.tabs.sendMessage(tabId, {"msg":"URL-CHANGED"}, function(response){
            console.log(response);
          });
        }
      })
    }
})
  
  chrome.runtime.onInstalled.addListener(chromeOnInstalled);
