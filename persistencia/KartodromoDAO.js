function KartodromoDAO(connection) {
    this._connection = connection;
}

KartodromoDAO.prototype.list = function(callback) {
    this._connection.query('SELECT * FROM kartodromo', callback);
}

KartodromoDAO.prototype.save = function(kartodromo, callback) {
    this._connection.query('INSERT INTO kartodromo SET ?', kartodromo, callback);
}

KartodromoDAO.prototype.update = function(kartodromo, callback) {
    this._connection.query('UPDATE kartodromo SET ? where id = ? ', [kartodromo, kartodromo.id], callback);
}

KartodromoDAO.prototype.getById = function(id, callback) {
    this._connection.query('SELECT * FROM kartodromo k INNER JOIN contato c ON k.contato_id = c.id INNER JOIN endereco e on e.id = k.endereco_id WHERE k.id = ? ', [id], callback);
}

module.exports = function() {
    return KartodromoDAO;
}
