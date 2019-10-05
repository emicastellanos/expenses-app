const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor(){
    this.db = new sqlite3.Database('db/database.db', (err) => {
      if (err) { return console.error(err.message) };
      console.log('Connected to the in-memory sqlite database');
    });

  }

  close() {
    db.close((err) => {
      if (err) { return console.error(err.message) };
      console.log('Closed the database connection');
    });

  }

  insert({description, amount, date}) {
    console.log('mono: ',description, amount, date)
    this.db.run("INSERT INTO gasto(description, amount, date) VALUES (?,?,?)",  [description, amount, date]);
  }

  

}

module.exports = Database;
