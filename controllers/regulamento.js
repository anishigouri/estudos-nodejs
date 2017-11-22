module.exports = function(app) {

    app.get('/regulamentos', function(req, res) {
      var connection = app.persistencia.connectionFactory();
      var regulamentoDAO = new app.persistencia.RegulamentoDAO(connection);

      regulamentoDAO.list(function(err, result) {
          if(err) {
              console.log(err);
              res.status(500).send(err);
              return;
          }

          res.send(result);
      });
    });

  app.get('/regulamentos/:id', function(req, res) {
    var id = req.params.id;
    var connection = app.persistencia.connectionFactory();
    var regulamentoDAO = new app.persistencia.RegulamentoDAO(connection);

    regulamentoDAO.getById(id, function(err, result) {
      if(err) {
        res.status(500).send(err);
        return;
      }
      res.send(result);
    });
  });

  app.post('/regulamentos', function(req, res) {

      var connection = app.persistencia.connectionFactory();
      var regulamentoDAO = new app.persistencia.RegulamentoDAO(connection);

      var regulamento = req.body['regulamento'];

      console.log('regulamento', regulamento);

      regulamentoDAO.save(regulamento, function(err, result) {
          if(err) {
              console.log('Erro ao inserir no banco de dados');
              res.status(500).send(err);
          } else {
              console.log('resultado', result);
              res.status(201).json(result);
          }
      });
  });

  app.put('/regulamentos', function(req, res) {
    
    var regulamento = req.body['regulamento'];

    var connection = app.persistencia.connectionFactory();
    var regulamentoDAO = new app.persistencia.RegulamentoDAO(connection);

    regulamentoDAO.update(regulamento, function(erro) {
      if(erro) {
        res.status(500).send(erro);
        return;
      }
      res.send(regulamento);
    });

  });
  
}
  