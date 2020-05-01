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
    this.db.run("INSERT INTO movements(description, amount, date) VALUES (?,?,?)",  [description, amount, date]);
  }

  selectAll() {
    return new Promise( (resolve,reject) => {
      const sql = "SELECT id, description, amount, date FROM movements";
      let result = [];
      this.db.all(sql,[], (err, rows) => {
        if (err) {
          reject(err) ;
        }
        console.log('rows: ',rows)
        resolve(rows)
      })
    })
  }
  
}

module.exports = Database;
