const axios = require('axios');
const cheerio = require('cheerio');

let exhaustPrice = Infinity;

const url =
  'https://www.amsperformance.com/product/infiniti-q60-q50-vr30ddtt-red-alpha-lower-downpipes/';

const handle = setInterval(scrape, 1000 * 60 * 12);

async function scrape() {
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);

  const container = $('.elementor-element-08e529f');

  const newPrice = parseFloat(
    $(container).find('.price bdi').text().substring(1)
  );

  if (newPrice < exhaustPrice) {
  }
}

scrape();
