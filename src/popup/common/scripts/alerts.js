const {alertQuery} = require('../../../common/scripts/misc/query');
const AlertsComponent = require('../../../common/scripts/components/alerts');

let Bake = {}

Bake.addAlerts = (alert) => {
  $alerts = document.getElementsByClassName('alerts')[0];
  $alert = document.createElement('div');
  $alert.setAttribute('class', 'alert');
  $alert.innerHTML = AlertsComponent.addAlerts(alert);
  $alert.addEventListener('click', function(){
    chrome.tabs.create({
      url: alert.url
    });
  })
  $alerts.appendChild($alert)
};


Bake.init = async function(){
  const alerts = await alertQuery();
  $options= document.getElementById("option2");
  $options.innerHTML = AlertsComponent.init();
  alerts.forEach(alert => {
    Bake.addAlerts(alert);
    Bake.addAlerts(alert);
    Bake.addAlerts(alert);
    Bake.addAlerts(alert);
  });
};

module.exports = Bake;
