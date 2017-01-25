var fs = require('fs');

/**
    Stream - Trabalha com a leitura de arquivos de forma assíncrona,
    por isso não possui função de callback

    A função de callback abaixo é chamada quando a funcção é terminada
    através do alarme de finish

    O Node trabalha melhor com IO e não com memória, por isso é melhor
    utilizar o Stream em vez do buffer

    A V8 não suporta arquivos em memórias muito grande
*/

fs.createReadStream('telalogin.jpg')
    .pipe(fs.createWriteStream('imagem-com-stream.jpg'))
    .on('finish', function() {
        console.log('arquivo escrito com stream');
    });
