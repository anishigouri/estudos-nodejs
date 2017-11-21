module.exports = function(app) {

    app.get('/contatos', function(req, res) {
      var connection = app.persistencia.connectionFactory();
      var contatoDAO = new app.persistencia.ContatoDAO(connection);

      contatoDAO.list(function(err, result) {
          if(err) {
              console.log(err);
              res.status(500).send(err);
              return;
          }

          res.send(result);
      });
    });

  app.get('/contatos/:id', function(req, res) {
    var id = req.params.id;
    var connection = app.persistencia.connectionFactory();
    var contatoDAO = new app.persistencia.ContatoDAO(connection);

    contatoDAO.getById(id, function(err, result) {
      if(err) {
        res.status(500).send(err);
        return;
      }
      res.send(result);
    });
  });

  app.post('/contatos', function(req, res) {

      var connection = app.persistencia.connectionFactory();
      var contatoDAO = new app.persistencia.ContatoDAO(connection);

      var contato = req.body['contato'];

      console.log('contato', contato);

      contatoDAO.save(contato, function(err, result) {
          if(err) {
              console.log('Erro ao inserir no banco de dados');
              res.status(500).send(err);
          } else {
              console.log('resultado', result);
              res.status(201).json(result);
          }
      });
  });

  app.put('/contatos', function(req, res) {
    
    var contato = req.body['contato'];

    var connection = app.persistencia.connectionFactory();
    var contatoDAO = new app.persistencia.ContatoDAO(connection);

    contatoDAO.update(contato, function(erro) {
      if(erro) {
        res.status(500).send(erro);
        return;
      }
      res.send(contato);
    });

  });
  
}
  