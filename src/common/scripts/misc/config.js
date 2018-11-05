let CONFIG = {};

// CONFIG.HOST = 'http://localhost:3000/';
CONFIG.HOST = 'https://comparision2100.herokuapp.com/';

CONFIG.RUPEE_SYMBOL = '₹';

CONFIG.SITES = [
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

CONFIG.ACCEPTED_DELTA = 0.85;
CONFIG.ACCEPTED_DELTA_GRACE = 0.1;

module.exports = { ...CONFIG }
