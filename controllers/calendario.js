module.exports = function(app) {
    
        app.get('/calendarios', function(req, res) {
          var connection = app.persistencia.connectionFactory();
          var calendarioDAO = new app.persistencia.CalendarioDAO(connection);
    
          calendarioDAO.list(function(err, result) {
              if(err) {
                  console.log(err);
                  res.status(500).send(err);
                  return;
              }
    
              res.send(result);
          });
        });
    
      app.get('/calendarios/:id', function(req, res) {
        var id = req.params.id;
        var connection = app.persistencia.connectionFactory();
        var calendarioDAO = new app.persistencia.CalendarioDAO(connection);
    
        calendarioDAO.getById(id, function(err, result) {
          if(err) {
            res.status(500).send(err);
            return;
          }
          res.send(result);
        });
      });
    
      app.post('/calendarios', function(req, res) {
    
        var connection = app.persistencia.connectionFactory();
        var calendarioDAO = new app.persistencia.CalendarioDAO(connection);
        var calendario = req.body['calendario'];
    
        calendarioDAO.save(calendario, function(err, result) {
            if(err) {
                console.log('Erro ao inserir no banco de dados', err);
                res.status(500).send(err);
            } else {
                console.log('resultado', result);
                res.status(201).json(result);
            }
        });

      });
    
      app.put('/calendarios', function(req, res) {
        
        var calendario = req.body['calendario'];
    
        var connection = app.persistencia.connectionFactory();
        var calendarioDAO = new app.persistencia.CalendarioDAO(connection);
    
        calendarioDAO.update(calendario, function(erro) {
          if(erro) {
            res.status(500).send(erro);
            return;
          }
          res.send(calendario);
        });
    
      });
      
    }
      