const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

let downpipePrice = 1000;
let wingPrice = 1000;
let oilCatchCanPrice = 1000;

const downpipeURL =
  'https://www.amsperformance.com/product/infiniti-q60-q50-vr30ddtt-red-alpha-lower-downpipes/';

const wingURL =
  'https://jaliscoscarbonfiber.com/products/infiniti-q50-q60-m-style-carbon-fiber-spoiler?variant=41071722823880';

const oilCatchCanURL =
  'https://www.z1motorsports.com/z1-products/z1-motorsports/z1-q50-q60-30t-baffled-oil-catch-can-kit-p-23546.html';

const handle = setInterval(function () {
  downpipeScrape();
  wingScrape();
  oilCatchCanScrape();
}, 1000 * 60);

async function downpipeScrape(isFirst = false) {
  const { data } = await axios.get(downpipeURL);

  const $ = cheerio.load(data);

  const container = $('.elementor-element-08e529f');

  const newPrice = parseFloat(
    $(container).find('.price bdi').text().substring(1)
  );

  if (newPrice < downpipePrice) {
    if (!isFirst) {
      await transporter.sendMail({
        from: `Downpipe Bot" <${process.env.EMAIL}>`,
        to: '7087013449@vtext.com',
        text: `Downpipe was $${downpipePrice}, now $${newPrice}!`,
      });
    }
    downpipePrice = newPrice;
  }
}

async function wingScrape(isFirst = false) {
  const { data } = await axios.get(wingURL);

  const $ = cheerio.load(data);

  const container = $('#ProductPrice');

  const newPrice = parseFloat($(container).find('.money').text().substring(1));

  if (newPrice < wingPrice) {
    if (!isFirst) {
      await transporter.sendMail({
        from: `Wing Bot" <${process.env.EMAIL}>`,
        to: '7087013449@vtext.com',
        text: `Wing was $${wingPrice}, now $${newPrice}!`,
      });
    }
    wingPrice = newPrice;
  }
}

async function oilCatchCanScrape(isFirst = false) {
  const { data } = await axios.get(oilCatchCanURL);

  const $ = cheerio.load(data);

  const container = $('#display_price_bottom');

  const newPrice = parseFloat($(container).find('.sp-newPrice').text().substring(1));

  if (newPrice < oilCatchCanPrice) {
    if (!isFirst) {
      await transporter.sendMail({
        from: `Oil Catch Can Bot" <${process.env.EMAIL}>`,
        to: '7087013449@vtext.com',
        text: `Oil Catch Can was $${oilCatchCanPrice}, now $${newPrice}!`,
      });
    }
    oilCatchCanPrice = newPrice;
  }
}

downpipeScrape(true);
wingScrape(true);
oilCatchCanScrape(true);
