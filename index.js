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

const downpipeUrl =
  'https://www.amsperformance.com/product/infiniti-q60-q50-vr30ddtt-red-alpha-lower-downpipes/';

const wingUrl =
  'https://jaliscoscarbonfiber.com/products/infiniti-q50-q60-m-style-carbon-fiber-spoiler?variant=41071722823880';

const handle = setInterval(function () {
  downpipeScrape();
  wingScrape();
}, 1000 * 60);

async function downpipeScrape() {
  const { data } = await axios.get(downpipeUrl);

  const $ = cheerio.load(data);

  const container = $('.elementor-element-08e529f');

  const newPrice = parseFloat(
    $(container).find('.price bdi').text().substring(1)
  );

  if (newPrice < downpipePrice) {
    await transporter.sendMail({
      from: `Downpipe Bot" <${process.env.EMAIL}>`,
      to: '7087013449@vtext.com',
      text: `Downpipe was $${downpipePrice}, now $${newPrice}!`,
    });
    downpipePrice = newPrice;
  }
}

async function wingScrape() {
  const { data } = await axios.get(wingUrl);

  const $ = cheerio.load(data);

  const container = $('#ProductPrice');

  const newPrice = parseFloat($(container).find('.money').text().substring(1));

  if (newPrice < wingPrice) {
    await transporter.sendMail({
      from: `Wing Bot" <${process.env.EMAIL}>`,
      to: '7087013449@vtext.com',
      text: `Wing was $${wingPrice}, now $${newPrice}!`,
    });
    wingPrice = newPrice;
  }
}

downpipeScrape();
wingScrape();
