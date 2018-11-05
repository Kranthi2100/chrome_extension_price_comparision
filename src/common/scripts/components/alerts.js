let AlertsComponent = {}

AlertsComponent.init = () => (`
  <div class="alerts"></div>
`)

AlertsComponent.addAlerts = (alert) => {
  console.dir(alert);
  with(alert){
    return `
    <div class="open-tab">
      <div class="site-name">
      <p>${site}</p>
      </div>
      <div class="alert-card">
        <div class="image">
          <img src=${imageUrl} />
        </div>
        <div class="detail">
          <div class="alert-title">${title}</div>
          <div class="new-price">₹​ ${newPrice}</div>
          <div class="old-price">₹​ ${oldPrice}</div>
        </div>
      </div>
    </div>
    `
  }
}


module.exports = AlertsComponent;
