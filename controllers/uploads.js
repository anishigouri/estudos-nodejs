var fs = require('fs');


module.exports = function(app) {
    app.post('/upload/imagem', function(req, res) {

        console.log('recebendo imagem');

        var filename = req.headers.filename;

        req.pipe(fs.createWriteStream('util/' + filename))
        .on('finish', function() {
            console.log('escrito com sucesso');
            res.status(201).send('ok');
        });


    });
}
