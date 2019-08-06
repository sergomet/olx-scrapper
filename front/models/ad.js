const db = require('../util/database');

module.exports = class Ad {
  constructor(id, title, price) {
    this.id = id;
    this.title = title;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO ads (title, price) VALUES (?, ?)', [this.title, this.price]);
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM ads');
  }

  static findById(id) {
    return db.execute('SELECT * FROM ads WHERE ads.id = ?', [id]);
  }
};
