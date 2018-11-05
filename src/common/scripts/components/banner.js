let BannerComponent = {};

BannerComponent.init = (product) => {
  let template;
  with (product) {
    template = (
      `
      <div class="cp-block">
        <div class="cp-main cp--lighter-background">
          <div> 
            <p>Buy on ${site} at just &#8377 ${minPrice}</p>
            <a href="${productUrl}" class="cp-best-option-toggle">
              <p>click here.</p>
              <div id="cp-best-option-menu" class="cp-menu cp-ml-4">
                <div class="triangle-base">
                  <div class="triangle"></div>
                </div>
                <div class="cp-best-option cp--option cp--lighter-background"></div>
              </div>
            </a>
            <div class="cp-more-option-toggle mx-1"> 
              <p>   more &#8681;</p>
              <div id="cp-more-option-menu" class="cp-menu cp-ml-8">
                <div class="triangle-base">
                  <div class="triangle"></div>
                </div>
                <div class='cp-more-option cp--option cp--lighter-background'></div>
              </div>
            </div>
          </div>
          <div class="cp-close-banner">
            &times;
          </div>
        </div>
      </div>
      `);
  }
  return template;
}

BannerComponent.optionModal = (product) => {
  let template;
  with (product) {
    if (!site) site = '';
    template = (`
    <a href=${productUrl}>
      <div class="cp-modal cp--darker-background">
        <div class="image-base">
         <img src=${imageUrl} />
        </div>
        <div class='cp-detail'>
          <p>${name}</p>
          <div class='cp-meta'>
            <p>&#8377 ${minPrice}</p>
            <p class="cp-mx-4"> at ${site} </p>
          </div>
        </div>
      </div>
    </a>
    `);
  }
  return template;
}

module.exports = BannerComponent;
