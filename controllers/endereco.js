module.exports = function(app) {
  
      app.get('/enderecos', function(req, res) {
        var connection = app.persistencia.connectionFactory();
        var enderecoDAO = new app.persistencia.EnderecoDAO(connection);
  
        enderecoDAO.list(function(err, result) {
            if(err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }
  
            res.send(result);
        });
      });
  
    app.get('/enderecos/:id', function(req, res) {
      var id = req.params.id;
      var connection = app.persistencia.connectionFactory();
      var enderecoDAO = new app.persistencia.EnderecoDAO(connection);
  
      enderecoDAO.getById(id, function(err, result) {
        if(err) {
          res.status(500).send(err);
          return;
        }
        res.send(result);
      });
    });
  
    app.post('/enderecos', function(req, res) {
  
        var connection = app.persistencia.connectionFactory();
        var enderecoDAO = new app.persistencia.EnderecoDAO(connection);
  
        var endereco = req.body['endereco'];
  
        console.log('endereco', endereco);
  
        enderecoDAO.save(endereco, function(err, result) {
            if(err) {
                console.log('Erro ao inserir no banco de dados');
                res.status(500).send(err);
            } else {
                console.log('resultado', result);
                res.status(201).json(result);
            }
        });
    });
  
    app.put('/enderecos', function(req, res) {
      
      var endereco = req.body['endereco'];
  
      var connection = app.persistencia.connectionFactory();
      var enderecoDAO = new app.persistencia.EnderecoDAO(connection);
  
      enderecoDAO.update(endereco, function(erro) {
        if(erro) {
          res.status(500).send(erro);
          return;
        }
        res.send(endereco);
      });
  
    });
    
  }
    