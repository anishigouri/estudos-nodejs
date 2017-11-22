module.exports = function(app) {

    app.get('/resultados', function(req, res) {
      var connection = app.persistencia.connectionFactory();
      var resultadoDAO = new app.persistencia.ResultadoDAO(connection);

      resultadoDAO.list(function(err, result) {
          if(err) {
              console.log(err);
              res.status(500).send(err);
              return;
          }

          res.send(result);
      });
    });

  app.get('/resultados/:id', function(req, res) {
    var id = req.params.id;
    var connection = app.persistencia.connectionFactory();
    var resultadoDAO = new app.persistencia.ResultadoDAO(connection);

    resultadoDAO.getById(id, function(err, result) {
      if(err) {
        res.status(500).send(err);
        return;
      }
      res.send(result);
    });
  });

  app.post('/resultados', function(req, res) {

      var connection = app.persistencia.connectionFactory();
      var resultadoDAO = new app.persistencia.ResultadoDAO(connection);

      var resultado = req.body['resultado'];

      console.log('resultado', resultado);

      resultadoDAO.save(resultado, function(err, result) {
          if(err) {
              console.log('Erro ao inserir no banco de dados');
              res.status(500).send(err);
          } else {
              console.log('resultado', result);
              res.status(201).json(result);
          }
      });
  });

  app.put('/resultados', function(req, res) {
    
    var resultado = req.body['resultado'];

    var connection = app.persistencia.connectionFactory();
    var resultadoDAO = new app.persistencia.ResultadoDAO(connection);

    resultadoDAO.update(resultado, function(erro) {
      if(erro) {
        res.status(500).send(erro);
        return;
      }
      res.send(resultado);
    });

  });
  
}
  