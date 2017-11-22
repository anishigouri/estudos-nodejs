module.exports = function(app) {
  
      app.get('/videos', function(req, res) {
        var connection = app.persistencia.connectionFactory();
        var videoDAO = new app.persistencia.VideoDAO(connection);
  
        videoDAO.list(function(err, result) {
            if(err) {
                console.log(err);
                res.status(500).send(err);
                return;
            }
  
            res.send(result);
        });
      });
  
    app.get('/videos/:id', function(req, res) {
      var id = req.params.id;
      var connection = app.persistencia.connectionFactory();
      var videoDAO = new app.persistencia.VideoDAO(connection);
  
      videoDAO.getById(id, function(err, result) {
        if(err) {
          res.status(500).send(err);
          return;
        }
        res.send(result);
      });
    });
  
    app.post('/videos', function(req, res) {
  
        var connection = app.persistencia.connectionFactory();
        var videoDAO = new app.persistencia.VideoDAO(connection);
  
        var video = req.body['video'];
  
        console.log('video', video);
  
        videoDAO.save(video, function(err, result) {
            if(err) {
                console.log('Erro ao inserir no banco de dados');
                res.status(500).send(err);
            } else {
                console.log('resultado', result);
                res.status(201).json(result);
            }
        });
    });
  
    app.put('/videos', function(req, res) {
      
      var video = req.body['video'];
  
      var connection = app.persistencia.connectionFactory();
      var videoDAO = new app.persistencia.VideoDAO(connection);
  
      videoDAO.update(video, function(erro) {
        if(erro) {
          res.status(500).send(erro);
          return;
        }
        res.send(video);
      });
  
    });
    
  }
    