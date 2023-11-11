const Scraper = require('./Scraper.js');

const rafat = '7087013449@vtext.com';
const ashraf = '7085514450@tmomail.net';

const scrapers = [
  new Scraper(
    'Downpipe',
    'https://www.amsperformance.com/product/infiniti-q60-q50-vr30ddtt-red-alpha-lower-downpipes/',
    rafat,
    '.elementor-element-08e529f',
    '.price bdi'
  ),
  new Scraper(
    'Wing',
    'https://jaliscoscarbonfiber.com/products/infiniti-q50-q60-m-style-carbon-fiber-spoiler?variant=41071722823880',
    rafat,
    '#ProductPrice',
    '.money'
  ),
  new Scraper(
    'Oil Catch Can',
    'https://www.z1motorsports.com/z1-products/z1-motorsports/z1-q50-q60-30t-baffled-oil-catch-can-kit-p-23546.html',
    rafat,
    '#display_price_bottom',
    '.sp-newPrice'
  ),
  new Scraper(
    'Coilovers',
    'https://zzperformance.com/products/zzp-cadillac-ats-coilovers',
    ashraf,
    '.product__price',
    '.visually-hidden'
  ),
];

const handle = setInterval(async () => {
  scrapers.forEach(async (scraper) => {
    await scraper.scrape();
  });
}, 1000 * 60 * 60);
