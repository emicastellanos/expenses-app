class Api {
  constructor(app, db) {
    app.get('/api/greeting', (req, res) => {
      const name = req.query.name || 'World';
      res.json({ greeting: `Hello ${name}!` });
    });

    app.post('/api/insert', (req,res) => {
      console.log('entra /api/insert')
      db.insert(req.body)
      res.json('OK')
    })

    app.post('/api/deleteAll', (req,res) => {
      console.log('entra /api/deleteAll')
      db.deleteAll(req.body)
      res.json('OK')
    })

    app.get('/api/getAllMovements', (req, res) => {
      console.log('entra /api/getAllMovements')
      db.selectAll()
      .then((data)=>{
        console.log('data', data)
        res.json({
          movs: data
        })
      })
      console.log('sale /api/getAllMovements')
    })


  }
  
}

module.exports = Api;
