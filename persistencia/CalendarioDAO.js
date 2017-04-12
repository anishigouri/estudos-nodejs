function CalendarioDAO(connection) {
    this._connection = connection;
}

//Prototype garante que cada vez que criamos uma nova instancia, de fato consiga metodos exclusivo de cada instancia
//Evita que diferentes threads compartilhem do mesmo DAO
CalendarioDAO.prototype.lista = function(callback) {
    this._connection.query('SELECT * FROM calendario', callback);
}

module.exports = function() {
    return CalendarioDAO;
}
