class Api {
  constructor(app, db) {
    app.get('/api/greeting', (req, res) => {
      const name = req.query.name || 'World';
      res.json({ greeting: `Hello ${name}!` });
    });

    app.post('/api/insert', (req,res) => {
      const name = req.body.description;
      db.insert(req.body)
      res.json({
        greeting: `hola ${name}`
      });
      
    })

  }
  
}

module.exports = Api;
