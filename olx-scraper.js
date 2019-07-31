const axios = require('axios');
const cheerio = require('cheerio');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '192.168.10.2',
  user: 'free',
  password: '',
  database: 'olx'
});

connection.connect();

// connection.query(`SELECT * FROM ads WHERE olx_id = "185023396"`, function(error, results, fields) {
//   results = JSON.parse(JSON.stringify(results));
//   console.dir(results[0].id);
// });

// connection.end();

// return;

const url = 'https://www.olx.ro/imobiliare/apartamente-garsoniere-de-vanzare/baia-mare/?page=1';

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const adsTable = $('table.offers tr.wrap');
    const ads = [];

    adsTable.each(function() {
      const promoted = $(this).find('td.promoted').length == 1;

      const olx_id = $(this)
        .find('.offer-wrapper table.breakword')
        .attr('data-id');

      const title = $(this)
        .find('.title-cell h3 a strong')
        .text();

      const olx_link = $(this)
        .find('.title-cell .detailsLink')
        .attr('href');

      const olx_img_link = $(this)
        .find('.detailsLink img')
        .attr('src');

      const price = $(this)
        .find('.price strong')
        .text();

      const category = $(this)
        .find('.title-cell small.breadcrumb')
        .text();

      const olx_created_at = $(this)
        .find('.bottom-cell small.breadcrumb span:nth-child(1)')
        .text();

      const ad = {
        title,
        promoted,
        olx_id,
        olx_link,
        olx_img_link,
        price,
        category,
        olx_created_at
      };

      connection.query(`SELECT * FROM ads WHERE olx_id = "${ad.olx_id}"`, function(error, results, fields) {
        // if (!results) {
        connection.query('INSERT INTO ads SET ?', ad, function(error, results, fields) {
          if (error) throw error;
          console.log(results.insertId);
        });
        // }

        // } else {
        //   results = JSON.parse(JSON.stringify(results));

        // console.log('foundAd: ', results[0].id);

        // const foundAd = results[0];
        // console.log('foundAd: ', foundAd);

        // if (foundAd.price !== ad.price) {
        //   connection.query('INSERT INTO ads_price_change SET ?', { ad_id: ad.id, price: ad.price }, function(error, results, fields) {
        //     if (error) throw error;
        //     console.log(results.insertId);
        //   });
        // }
        // }cl
      });
    });

    // connection.end();
  })
  .catch(console.error);
