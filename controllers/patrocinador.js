module.exports = function(app) {
  
      app.get('/patrocinadores', function(req, res) {
        var connection = app.persistencia.connectionFactory();
        var patrocinadorDAO = new app.persistencia.PatrocinadorDAO(connection);
  
        patrocinadorDAO.list(function(err, result) {
            if(err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }
  
            res.send(result);
        });
      });
  
    app.get('/patrocinadores/:id', function(req, res) {
      var id = req.params.id;
      var connection = app.persistencia.connectionFactory();
      var patrocinadorDAO = new app.persistencia.PatrocinadorDAO(connection);
  
      patrocinadorDAO.getById(id, function(err, result) {
        if(err) {
          res.status(500).send(err);
          return;
        }
        res.send(result);
      });
    });
  
    app.post('/patrocinadores', function(req, res) {
  
        var connection = app.persistencia.connectionFactory();
        var patrocinadorDAO = new app.persistencia.PatrocinadorDAO(connection);
        var contatoDAO = new app.persistencia.ContatoDAO(connection);
  
        var patrocinador = req.body['patrocinador'];
        var contato = req.body.patrocinador['contato'];
  
        console.log('patrocinador', patrocinador);
        console.log('contato', contato);
  
        contatoDAO.save(contato, function(err, resultContato) {
          if(err) {
              console.log('Erro ao inserir no banco de dados (Contato)');
              res.status(500).send(err);
          } else {
              console.log('id do contato', resultContato.insertId);
              patrocinador.contato_id = resultContato.insertId;
              delete patrocinador.contato;
              patrocinadorDAO.save(patrocinador, function(err, result) {
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
  
    app.put('/patrocinadores', function(req, res) {
      
      var patrocinador = req.body['patrocinador'];
  
      var connection = app.persistencia.connectionFactory();
      var patrocinadorDAO = new app.persistencia.PatrocinadorDAO(connection);
  
      patrocinadorDAO.update(patrocinador, function(erro) {
        if(erro) {
          res.status(500).send(erro);
          return;
        }
        res.send(patrocinador);
      });
  
    });
    
  }
    