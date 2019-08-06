const Ad = require('../models/ad');

exports.getAds = (req, res, next) => {
  Ad.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('ads/ad', {
        prods: rows,
        pageTitle: 'All Ads',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Ad.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('ads/index', {
        prods: rows,
        hasProducts: true,
        pageTitle: 'Ads',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};
