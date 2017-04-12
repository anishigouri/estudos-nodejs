function KartodromoDAO(connection) {
    this._connection = connection;
}

KartodromoDAO.prototype.list = function(callback) {
    this._connection.query('SELECT * FROM kartodromo', callback);
}

module.exports = function() {
    return KartodromoDAO;
}
