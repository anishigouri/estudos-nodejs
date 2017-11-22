module.exports = function(app) {
  
      app.get('/pilotos', function(req, res) {
        var connection = app.persistencia.connectionFactory();
        var pilotoDAO = new app.persistencia.PilotoDAO(connection);
  
        pilotoDAO.list(function(err, result) {
            if(err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }
  
            res.send(result);
        });
      });
  
    app.get('/pilotos/:id', function(req, res) {
      var id = req.params.id;
      var connection = app.persistencia.connectionFactory();
      var pilotoDAO = new app.persistencia.PilotoDAO(connection);
  
      pilotoDAO.getById(id, function(err, result) {
        if(err) {
          res.status(500).send(err);
          return;
        }
        res.send(result);
      });
    });
  
    app.post('/pilotos', function(req, res) {
  
        var connection = app.persistencia.connectionFactory();
        var pilotoDAO = new app.persistencia.PilotoDAO(connection);
        var contatoDAO = new app.persistencia.ContatoDAO(connection);
  
        var piloto = req.body['piloto'];
        var contato = req.body.piloto['contato'];
  
        console.log('piloto', piloto);
        console.log('contato', contato);
  
        contatoDAO.save(contato, function(err, resultContato) {
          if(err) {
              console.log('Erro ao inserir no banco de dados (Contato)');
              res.status(500).send(err);
          } else {
              console.log('id do contato', resultContato.insertId);
              piloto.contato_id = resultContato.insertId;
              delete piloto.contato;
              pilotoDAO.save(piloto, function(err, result) {
                if(err) {
                    console.log('Erro ao inserir no banco de dados', err);
                    res.status(500).send(err);
                } else {
                    console.log('resultado', result);
                    res.status(201).json(result);
                }
            });
          }
        });
    });
  
    app.put('/pilotos', function(req, res) {
      
      var piloto = req.body['piloto'];
  
      var connection = app.persistencia.connectionFactory();
      var pilotoDAO = new app.persistencia.PilotoDAO(connection);
  
      pilotoDAO.update(piloto, function(erro) {
        if(erro) {
          res.status(500).send(erro);
          return;
        }
        res.send(piloto);
      });
  
    });
    
  }
    