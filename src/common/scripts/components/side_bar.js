let SidebarComponent = {};

SidebarComponent.init = () => (`
  <div class="side-bar-child"> 
    <div class="side-bar">
      <div class="history icon">
        <svg class="material-icon" viewBox="0 0 24 24">
          <path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"/>
        </svg>
      </div>

      <div class="alert icon">
      <svg class="material-icon" viewBox="0 0 24 24">
        <path d="M10.01 21.01c0 1.1.89 1.99 1.99 1.99s1.99-.89 1.99-1.99h-3.98zm8.87-4.19V11c0-3.25-2.25-5.97-5.29-6.69v-.72C13.59 2.71 12.88 2 12 2s-1.59.71-1.59 1.59v.72C7.37 5.03 5.12 7.75 5.12 11v5.82L3 18.94V20h18v-1.06l-2.12-2.12zM16 13.01h-3v3h-2v-3H8V11h3V8h2v3h3v2.01z"/>
      </svg>
      </div>
      
      <div class="deals icon">
      <svg class="material-icon" viewBox="0 0 24 24"> 
        <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7zm11.77 8.27L13 19.54l-4.27-4.27C8.28 14.81 8 14.19 8 13.5c0-1.38 1.12-2.5 2.5-2.5.69 0 1.32.28 1.77.74l.73.72.73-.73c.45-.45 1.08-.73 1.77-.73 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.77z"/>
      </svg>
      </div>
      
      <div class="coupons icon">
        <svg class="material-icon" viewBox="0 0 24 24">
          <path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"/>
        </svg>
      </div>
    </div>
  </div>
`)

SidebarComponent.modal__init = () => (`
  <div class="side-bar-modal">
    <div class="sba-coupons"></div>
  </div>
`);


module.exports = SidebarComponent;
