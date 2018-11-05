const {graphQuery} = require('../../../common/scripts/misc/query');

let Graph = {}

Graph.create = ({site, selector}) => {
  setTimeout(() => {
    let $elem = document.querySelectorAll(selector)[0];
    let $graph_container = document.createElement('div');
    $graph_container.setAttribute('class', 'cp-graph _1HmYoV');
    $graph_container.style.display = 'block';
    $graph_container.innerHTML = `<canvas id="graph"></div>`;
    $elem.appendChild($graph_container);
    Graph.fn(site);
  }, 2000);
}

//code to create graph goes here
Graph.fn = (async (site) => {
  var ctx = document.getElementById("graph");
  ctx.parentNode.style.height = '400px';
  const data = await graphQuery(site);
  const dates = [], prices = []; 
  data.forEach(([date, price]) => {
    dates.push(date);
    prices.push(price);
  });
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [{
            label: 'price history',
            data: prices,
            backgroundColor: 'rgba(30, 99, 255, 0.2)',
            borderColor: 'rgba(30,99,255,1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
  });
})



module.exports = Graph;