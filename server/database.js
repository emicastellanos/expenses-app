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

  deleteAll (listToDelete) {
    let listStringToDelete ='';
    console.log("mambo",listToDelete[0], listToDelete)
    console.log('size', listToDelete.length)
    for (var i=0; i < listToDelete.length-1 ; i++){
      console.log('i', i)
      listStringToDelete = listStringToDelete.concat(listToDelete[i].id).concat(',');
    }
    if(listToDelete.length > 0){
      console.log('i2')
      listStringToDelete = listStringToDelete.concat(listToDelete[listToDelete.length-1].id)
    }
    
    console.log('lista',listStringToDelete);
    this.db.run("DELETE FROM movements where id IN (?)", listStringToDelete, function(err) {
      console.log(err);
    });
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
