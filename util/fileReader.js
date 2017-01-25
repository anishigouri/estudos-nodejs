var fs = require('fs');

fs.readFile('telalogin.jpg', function(error, buffer) {
    console.log('arquivo lido');

    fs.writeFile('imagem2.jpg', buffer, function() {
        console.log('arquivo escrito');
    });

});
