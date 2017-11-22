module.exports = function(app) {
  
      app.get('/pontuacoes', function(req, res) {
        var connection = app.persistencia.connectionFactory();
        var pontuacaoDAO = new app.persistencia.PontuacaoDAO(connection);
  
        pontuacaoDAO.list(function(err, result) {
            if(err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }
  
            res.send(result);
        });
      });
  
    app.get('/pontuacoes/:id', function(req, res) {
      var id = req.params.id;
      var connection = app.persistencia.connectionFactory();
      var pontuacaoDAO = new app.persistencia.PontuacaoDAO(connection);
  
      pontuacaoDAO.getById(id, function(err, result) {
        if(err) {
          res.status(500).send(err);
          return;
        }
        res.send(result);
      });
    });
  
    app.post('/pontuacoes', function(req, res) {
  
        var connection = app.persistencia.connectionFactory();
        var pontuacaoDAO = new app.persistencia.PontuacaoDAO(connection);
  
        var pontuacao = req.body['pontuacao'];
  
        console.log('pontuacao', pontuacao);
  
        pontuacaoDAO.save(pontuacao, function(err, result) {
            if(err) {
                console.log('Erro ao inserir no banco de dados');
                res.status(500).send(err);
            } else {
                console.log('resultado', result);
                res.status(201).json(result);
            }
        });
    });
  
    app.put('/pontuacoes', function(req, res) {
      
      var pontuacao = req.body['pontuacao'];
  
      var connection = app.persistencia.connectionFactory();
      var pontuacaoDAO = new app.persistencia.PontuacaoDAO(connection);
  
      pontuacaoDAO.update(pontuacao, function(erro) {
        if(erro) {
          res.status(500).send(erro);
          return;
        }
        res.send(pontuacao);
      });
  
    });
    
  }
    