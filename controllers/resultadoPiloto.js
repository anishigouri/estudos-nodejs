module.exports = function(app) {

    app.get('/resultadoPilotos', function(req, res) {
      var connection = app.persistencia.connectionFactory();
      var resultadoPilotoDAO = new app.persistencia.ResultadoPilotoDAO(connection);

      resultadoPilotoDAO.list(function(err, result) {
          if(err) {
              console.log(err);
              res.status(500).send(err);
              return;
          }

          res.send(result);
      });
    });

  app.get('/resultadoPilotos/:id', function(req, res) {
    var id = req.params.id;
    var connection = app.persistencia.connectionFactory();
    var resultadoPilotoDAO = new app.persistencia.ResultadoPilotoDAO(connection);

    resultadoPilotoDAO.getById(id, function(err, result) {
      if(err) {
        res.status(500).send(err);
        return;
      }
      res.send(result);
    });
  });

  app.post('/resultadoPilotos', function(req, res) {

      var connection = app.persistencia.connectionFactory();
      var resultadoPilotoDAO = new app.persistencia.ResultadoPilotoDAO(connection);

      var resultado = req.body['resultado'];

      console.log('resultado', resultado);

      resultadoPilotoDAO.save(resultado, function(err, result) {
          if(err) {
              console.log('Erro ao inserir no banco de dados');
              res.status(500).send(err);
          } else {
              console.log('resultado', result);
              res.status(201).json(result);
          }
      });
  });

  app.put('/resultadoPilotos', function(req, res) {
    
    var resultado = req.body['resultado'];

    var connection = app.persistencia.connectionFactory();
    var resultadoPilotoDAO = new app.persistencia.ResultadoPilotoDAO(connection);

    resultadoPilotoDAO.update(resultado, function(erro) {
      if(erro) {
        res.status(500).send(erro);
        return;
      }
      res.send(resultado);
    });

  });
  
}
  